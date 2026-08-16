<?php
/**
 * Общая логика подтверждения платежа ЮKassa.
 * Безопасность: статус платежа НЕ берём из тела запроса, а перепроверяем
 * напрямую у ЮKassa по API (защита от подделки вебхука).
 */

// Запросить платёж у ЮKassa по id. Возвращает массив платежа или null.
function yk_fetch_payment($paymentId)
{
    $shopId = trim((string)app_get_env('YOOKASSA_SHOP_ID', ''));
    $secret = trim((string)app_get_env('YOOKASSA_SECRET_KEY', ''));
    if ($shopId === '' || $secret === '' || $paymentId === '') return null;

    $resp = app_http_request_json(
        'GET',
        'https://api.yookassa.ru/v3/payments/' . rawurlencode($paymentId),
        ['Authorization' => 'Basic ' . base64_encode($shopId . ':' . $secret)]
    );
    return (app_is_http_success($resp['status']) && !empty($resp['data']['id'])) ? $resp['data'] : null;
}

// Подтвердить платёж: проверяем у ЮKassa и, если оплачен, продлеваем технику на 30 дней.
// Возвращает true, если техника оплачена (сейчас или ранее по этому платежу).
function yk_confirm_payment($paymentId)
{
    $payment = yk_fetch_payment($paymentId);
    if (!$payment) return false;

    $status = $payment['status'] ?? '';
    $vehicleId = $payment['metadata']['vehicle_id'] ?? '';

    if ($status !== 'succeeded') {
        if ($status === 'canceled') {
            app_supabase_patch('payments', ['yk_payment_id' => $paymentId], ['status' => 'canceled']);
        }
        return false;
    }

    // идемпотентность: если платёж уже отмечен succeeded — техника уже продлена
    $existing = app_supabase_select('payments', [
        'select' => 'status', 'yk_payment_id' => 'eq.' . $paymentId, 'limit' => '1',
    ]);
    $already = (app_is_http_success($existing['status']) && !empty($existing['data'][0]))
        ? ($existing['data'][0]['status'] ?? '') : '';

    // отметить платёж оплаченным
    app_supabase_patch('payments', ['yk_payment_id' => $paymentId], [
        'status'  => 'succeeded',
        'paid_at' => gmdate('Y-m-d\TH:i:s\Z'),
    ]);

    if ($already === 'succeeded') return true; // уже продлевали — не дублируем

    // продлить технику на 30 дней (от большего из now / текущего paid_until)
    if ($vehicleId !== '' && app_is_valid_uuid($vehicleId)) {
        $veh = app_supabase_select('partner_vehicles', [
            'select' => 'paid_until', 'id' => 'eq.' . $vehicleId, 'limit' => '1',
        ]);
        $paidUntil = (app_is_http_success($veh['status']) && !empty($veh['data'][0]))
            ? ($veh['data'][0]['paid_until'] ?? null) : null;
        $base = ($paidUntil && strtotime($paidUntil) > time()) ? strtotime($paidUntil) : time();
        $newUntil = gmdate('Y-m-d\TH:i:s\Z', $base + 30 * 24 * 3600);
        app_supabase_patch('partner_vehicles', ['id' => $vehicleId], [
            'paid_until' => $newUntil,
            'updated_at' => gmdate('Y-m-d\TH:i:s\Z'),
        ]);
    }
    return true;
}
