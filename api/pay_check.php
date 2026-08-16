<?php
/**
 * API endpoint: POST /api/pay/check
 * Фронт вызывает после возврата с оплаты (на случай задержки вебхука).
 * Тело: { payment_id }. Ответ: { ok, paid }.
 */

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/pay_lib.php';

$payload = app_endpoint(['rate_limit' => 30]);
$paymentId = trim((string)($payload['payment_id'] ?? ''));
if ($paymentId === '') {
    app_send_json(400, ['error' => 'Missing payment_id']);
}

$paid = false;
try { $paid = yk_confirm_payment($paymentId); }
catch (Throwable $e) { error_log('pay_check error: ' . $e->getMessage()); }

app_send_json(200, ['ok' => true, 'paid' => $paid]);
