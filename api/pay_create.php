<?php
/**
 * API endpoint: POST /api/pay/create
 * Создаёт платёж в ЮKassa за подключение техники (ежемесячная подписка).
 * Тело: { vehicle_id, user_id }
 * Ответ: { ok, confirmation_url } — фронт перенаправляет туда пользователя.
 */

require __DIR__ . '/bootstrap.php';

$payload = app_endpoint(['rate_limit' => 20]);
$vehicleId = trim((string)($payload['vehicle_id'] ?? ''));
$userId    = trim((string)($payload['user_id'] ?? ''));

if ($vehicleId === '' || !app_is_valid_uuid($vehicleId)) {
    app_send_json(400, ['error' => 'Missing vehicle_id']);
}

$shopId = trim((string)app_get_env('YOOKASSA_SHOP_ID', ''));
$secret = trim((string)app_get_env('YOOKASSA_SECRET_KEY', ''));
if ($shopId === '' || $secret === '') {
    app_send_json(500, ['error' => 'Оплата не настроена на сервере']);
}

// Техника + сумма тарифа (через service_role)
$vehResp = app_supabase_select('partner_vehicles', [
    'select'   => 'id,user_id,type_name,reg_number,status,tariff_id',
    'id'       => 'eq.' . $vehicleId,
    'limit'    => '1',
]);
$vehicle = (app_is_http_success($vehResp['status']) && !empty($vehResp['data'][0])) ? $vehResp['data'][0] : null;
if (!$vehicle) {
    app_send_json(404, ['error' => 'Транспорт не найден']);
}
if (($vehicle['status'] ?? '') !== 'approved') {
    app_send_json(400, ['error' => 'Транспорт ещё не подтверждён']);
}

$tariffResp = app_supabase_select('connection_tariffs', [
    'select' => 'monthly_fee',
    'id'     => 'eq.' . (int)($vehicle['tariff_id'] ?? 0),
    'limit'  => '1',
]);
$amount = (app_is_http_success($tariffResp['status']) && !empty($tariffResp['data'][0]))
    ? (float)$tariffResp['data'][0]['monthly_fee'] : 0;
if ($amount <= 0) {
    app_send_json(400, ['error' => 'Некорректная сумма тарифа']);
}

// URL возврата после оплаты (на тот же сайт)
$host = $_SERVER['HTTP_HOST'] ?? 'almanirent.ru';
$returnUrl = 'https://' . $host . '/?paid=1';

$descr = 'Подключение: ' . ($vehicle['type_name'] ?? 'техника')
    . (!empty($vehicle['reg_number']) ? ' · ' . $vehicle['reg_number'] : '');

// Контакт плательщика для чека (54-ФЗ): берём из аккаунта партнёра.
$payUserId = ($userId !== '' && app_is_valid_uuid($userId)) ? $userId : ($vehicle['user_id'] ?? '');
$custEmail = '';
$custPhone = '';
if ($payUserId !== '' && app_is_valid_uuid($payUserId)) {
    $uResp = app_supabase_select('users', [
        'select' => 'email,phone', 'id' => 'eq.' . $payUserId, 'limit' => '1',
    ]);
    if (app_is_http_success($uResp['status']) && !empty($uResp['data'][0])) {
        $custEmail = trim((string)($uResp['data'][0]['email'] ?? ''));
        $custPhone = preg_replace('/\D/', '', (string)($uResp['data'][0]['phone'] ?? ''));
    }
}

// Чек обязателен для онлайн-касс. Контакт: email (приоритет) или телефон.
$customer = [];
if ($custEmail !== '') $customer['email'] = $custEmail;
elseif ($custPhone !== '') $customer['phone'] = $custPhone; // E.164 без плюса, напр. 79001234567
if (empty($customer)) {
    app_send_json(400, ['error' => 'Укажите e-mail в профиле — он нужен для чека об оплате']);
}

$receipt = [
    'customer' => $customer,
    'items' => [[
        'description'     => mb_substr($descr, 0, 128),
        'quantity'        => '1.00',
        'amount'          => ['value' => number_format($amount, 2, '.', ''), 'currency' => 'RUB'],
        'vat_code'        => 1,              // без НДС (самозанятый / УСН)
        'payment_subject' => 'service',      // услуга
        'payment_mode'    => 'full_payment', // полная оплата
    ]],
];

// Создание платежа в ЮKassa
$body = [
    'amount'       => ['value' => number_format($amount, 2, '.', ''), 'currency' => 'RUB'],
    'capture'      => true,
    'confirmation' => ['type' => 'redirect', 'return_url' => $returnUrl],
    'description'  => mb_substr($descr, 0, 128),
    'metadata'     => ['vehicle_id' => $vehicleId, 'user_id' => $userId],
    'receipt'      => $receipt,
];

$ykResp = app_http_request_json(
    'POST',
    'https://api.yookassa.ru/v3/payments',
    [
        'Authorization'   => 'Basic ' . base64_encode($shopId . ':' . $secret),
        'Idempotence-Key' => bin2hex(random_bytes(16)),
        'Content-Type'    => 'application/json',
    ],
    $body
);

if (!app_is_http_success($ykResp['status']) || empty($ykResp['data']['id'])) {
    error_log('YooKassa create failed: HTTP ' . ($ykResp['status'] ?? '?') . ' ' . ($ykResp['raw'] ?? ''));
    app_send_json(502, ['error' => 'Не удалось создать платёж']);
}

$yk = $ykResp['data'];
$confirmationUrl = $yk['confirmation']['confirmation_url'] ?? '';

// Лог платежа (pending)
app_supabase_upsert('payments', [[
    'user_id'       => ($userId !== '' && app_is_valid_uuid($userId)) ? $userId : ($vehicle['user_id'] ?? null),
    'vehicle_id'    => $vehicleId,
    'amount'        => $amount,
    'yk_payment_id' => $yk['id'],
    'status'        => 'pending',
]], 'yk_payment_id');

app_send_json(200, ['ok' => true, 'confirmation_url' => $confirmationUrl, 'payment_id' => $yk['id']]);
