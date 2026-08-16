<?php
/**
 * API endpoint: GET /api/push/pubkey
 * Отдаёт публичный VAPID-ключ для подписки на web-push с фронта.
 * Публичный ключ не секретный — его безопасно отдавать клиенту.
 */
require __DIR__ . '/bootstrap.php';

$pub = trim((string) app_get_env('VAPID_PUBLIC_KEY', ''));
if ($pub === '') {
    app_send_json(500, ['error' => 'VAPID public key not configured']);
}
app_send_json(200, ['publicKey' => $pub]);
