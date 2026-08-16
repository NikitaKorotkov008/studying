<?php
/**
 * API endpoint: POST /api/pay/webhook
 * Уведомление от ЮKassa (payment.succeeded / payment.canceled).
 * Статус перепроверяем напрямую у ЮKassa (тело не доверяем).
 */

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/pay_lib.php';

$payload = app_read_json_body();
$paymentId = trim((string)($payload['object']['id'] ?? ''));

if ($paymentId !== '') {
    try { yk_confirm_payment($paymentId); }
    catch (Throwable $e) { error_log('pay_webhook error: ' . $e->getMessage()); }
}

// ЮKassa ждёт 200, иначе будет повторять уведомление
app_send_json(200, ['ok' => true]);
