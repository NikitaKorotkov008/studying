<?php
/**
 * API endpoint: POST /api/pay/reconcile
 * Сверяет «зависшие» (pending) платежи пользователя со статусом в ЮKassa
 * и активирует технику по оплаченным. Самовосстановление — работает даже
 * если вебхук не настроен/не дошёл, а проверка при возврате не сработала.
 * Тело: { user_id }. Ответ: { ok, activated }.
 */

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/pay_lib.php';

$payload = app_endpoint(['rate_limit' => 30]);
$userId = trim((string)($payload['user_id'] ?? ''));
if ($userId === '' || !app_is_valid_uuid($userId)) {
    app_send_json(400, ['error' => 'Missing user_id']);
}

// последние pending-платежи этого пользователя
$resp = app_supabase_select('payments', [
    'select'  => 'yk_payment_id',
    'user_id' => 'eq.' . $userId,
    'status'  => 'eq.pending',
    'order'   => 'created_at.desc',
    'limit'   => '20',
]);

$activated = 0;
if (app_is_http_success($resp['status']) && is_array($resp['data'])) {
    foreach ($resp['data'] as $row) {
        $pid = trim((string)($row['yk_payment_id'] ?? ''));
        if ($pid === '') continue;
        try { if (yk_confirm_payment($pid)) $activated++; }
        catch (Throwable $e) { error_log('pay_reconcile error: ' . $e->getMessage()); }
    }
}

app_send_json(200, ['ok' => true, 'activated' => $activated]);
