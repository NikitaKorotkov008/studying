<?php
/**
 * API endpoint: POST /api/push/subscribe
 *
 * Manages Web Push subscriptions (subscribe / unsubscribe).
 * Stores endpoint, p256dh and auth keys in push_subscriptions table.
 */

require __DIR__ . '/bootstrap.php';

$payload = app_endpoint(['rate_limit' => 10]);
$action = trim((string)($payload['action'] ?? 'subscribe'));
$endpoint = trim((string)($payload['endpoint'] ?? ''));
$p256dh = trim((string)($payload['keys']['p256dh'] ?? ''));
$auth = trim((string)($payload['keys']['auth'] ?? ''));
$role = trim((string)($payload['role'] ?? 'executor'));
$userId = trim((string)($payload['user_id'] ?? ''));
$prefs = is_array($payload['prefs'] ?? null) ? $payload['prefs'] : null;

if ($action === 'unsubscribe') {
    if ($endpoint === '') {
        app_send_json(400, ['error' => 'Missing endpoint']);
    }

    $deleteUrl = app_supabase_base_url() . '/rest/v1/push_subscriptions?endpoint=eq.' . urlencode($endpoint);
    $response = app_http_request_json('DELETE', $deleteUrl, app_supabase_headers());

    app_send_json(200, ['ok' => true, 'action' => 'unsubscribed']);
}

if ($endpoint === '' || $p256dh === '' || $auth === '') {
    app_send_json(400, ['error' => 'Missing required subscription fields: endpoint, keys.p256dh, keys.auth']);
}

if (!in_array($role, ['executor', 'customer', 'both'], true)) {
    $role = 'executor';
}

$upsertUrl = app_supabase_base_url() . '/rest/v1/push_subscriptions?on_conflict=endpoint';
$row = [
    'endpoint' => $endpoint,
    'p256dh' => $p256dh,
    'auth' => $auth,
    'role' => $role,
];

if ($userId !== '' && app_is_valid_uuid($userId)) {
    $row['user_id'] = $userId;
}

if ($prefs !== null) {
    $row['prefs'] = $prefs;
}

$response = app_http_request_json(
    'POST',
    $upsertUrl,
    app_supabase_headers('resolution=merge-duplicates'),
    json_encode($row, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
);

if (!app_is_http_success($response['status'])) {
    error_log('push_subscribe upsert failed: HTTP ' . ($response['status'] ?? 'unknown'));
    app_send_json(500, ['error' => 'Failed to save subscription']);
}

app_send_json(200, ['ok' => true, 'action' => 'subscribed']);
