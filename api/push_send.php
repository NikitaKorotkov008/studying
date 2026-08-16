<?php
/**
 * API endpoint: POST /api/push/send
 *
 * Sends Web Push notifications to relevant subscribers.
 *
 * Supported events:
 *   order_created, order_taken, order_released,
 *   order_awaiting_confirmation, order_completed,
 *   user_verified, user_rejected, new_message,
 *   user_registered, admin_broadcast, support_message.
 */

require __DIR__ . '/bootstrap.php';
require __DIR__ . '/webpush.php';

$payload = app_endpoint(['rate_limit' => 30, 'auth' => 'bearer']);
$event = trim((string)($payload['event'] ?? ''));
$order = is_array($payload['order'] ?? null) ? $payload['order'] : [];

if ($event === '') {
    app_send_json(400, ['error' => 'Missing event']);
}

// Для событий верификации и чата order.id не нужен
$skipOrderId = in_array($event, ['user_verified', 'user_rejected', 'new_message', 'user_registered', 'admin_broadcast', 'support_message'], true);

if (!$skipOrderId && empty($order['id'])) {
    app_send_json(400, ['error' => 'Missing order.id']);
}

// Load VAPID keys
$vapidPub = app_get_env('VAPID_PUBLIC_KEY', '');
$vapidPriv = app_get_env('VAPID_PRIVATE_KEY', '');
$vapidEmail = app_get_env('VAPID_EMAIL', 'mailto:admin@almanirent.ru');

if ($vapidPub === '' || $vapidPriv === '') {
    error_log('push_send: VAPID keys not configured');
    app_send_json(500, ['error' => 'Push notifications not configured']);
}

// ================================================================
// Determine notification content and recipients
// ================================================================

$title = '';
$body = '';
$tag = 'almanirent-' . $event . '-' . ($order['id'] ?? ($order['user_id'] ?? uniqid()));
$url = '/';
$recipients = [];
$requireInteraction = false;
$actions = [];
$image = null;

switch ($event) {
    case 'order_created':
        $title = 'Новый заказ';
        $body = push_build_new_order_body($order);
        $tag = 'order-' . $order['id'];
        $url = '/?open_order=' . urlencode($order['id']);
        $requireInteraction = true;
        $image = '/og-image.png';
        $actions = [
            ['action' => 'open', 'title' => 'Открыть'],
            ['action' => 'close', 'title' => 'Скрыть'],
        ];
        // Только партнёрам с оплаченной техникой нужного типа.
        // Материалы возит «Самосвал», иначе тип = название товара.
        $isMaterial = strtolower(trim($order['category'] ?? '')) === 'material';
        $requiredType = $isMaterial ? 'Самосвал' : trim((string)($order['product'] ?? ''));
        $recipients = push_fetch_partner_subs_by_vehicle_type($requiredType);
        break;

    case 'order_taken':
        $title = 'Заказ взят в работу';
        $label = push_category_label($order);
        $body = $label . ': ' . ($order['product'] ?? 'Заказ');
        if (!empty($order['address'])) {
            $body .= ' · ' . $order['address'];
        }
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Подробнее'],
        ];
        $recipients = push_fetch_subscriptions_by_user($order['customer_id'] ?? '');
        break;

    case 'order_released':
        $title = 'Заказ снова свободен';
        $label = push_category_label($order);
        $body = $label . ': ' . ($order['product'] ?? 'Заказ');
        if (!empty($order['address'])) {
            $body .= ' · ' . $order['address'];
        }
        $body .= "\nИсполнитель отказался, заказ доступен другим.";
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Открыть'],
        ];
        $recipients = push_fetch_subscriptions_by_user($order['customer_id'] ?? '');
        break;

    case 'order_awaiting_confirmation':
        $title = 'Подтвердите выполнение';
        $label = push_category_label($order);
        $body = $label . ': ' . ($order['product'] ?? 'Заказ');
        $body .= "\nИсполнитель завершил работу.";
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Подтвердить'],
        ];
        $recipients = push_fetch_subscriptions_by_user($order['customer_id'] ?? '');
        break;

    case 'order_completed':
        $title = 'Заказ подтверждён';
        $label = push_category_label($order);
        $body = $label . ': ' . ($order['product'] ?? 'Заказ');
        $body .= "\nЗаказчик подтвердил выполнение. Отличная работа!";
        $actions = [
            ['action' => 'open', 'title' => 'Открыть'],
        ];
        $recipients = push_fetch_subscriptions_by_user($order['executor_id'] ?? '');
        break;

    case 'user_verified':
        $title = 'Аккаунт подтверждён';
        $body = "Проверка пройдена, добро пожаловать!";
        $tag = 'almanirent-verification-' . ($order['user_id'] ?? '');
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Открыть'],
        ];
        $recipients = push_fetch_subscriptions_by_user($order['user_id'] ?? '');
        break;

    case 'user_rejected':
        $title = 'Аккаунт отклонён';
        $body = "Проверьте данные профиля и попробуйте снова.";
        $tag = 'almanirent-verification-' . ($order['user_id'] ?? '');
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Открыть'],
        ];
        $recipients = push_fetch_subscriptions_by_user($order['user_id'] ?? '');
        break;

    case 'new_message':
        $senderName = trim((string)($order['sender_name'] ?? ''));
        $msgText    = trim((string)($order['message'] ?? ''));
        $chatId     = trim((string)($order['chat_id'] ?? ''));

        $title = $senderName !== '' ? $senderName : 'Сообщение';
        $body  = $msgText !== '' ? (mb_strlen($msgText) > 120 ? mb_substr($msgText, 0, 120) . '…' : $msgText) : 'Новое сообщение';
        $tag = 'almanirent-chat-' . $chatId;
        $url = $chatId !== '' ? '/?open_chat=' . urlencode($chatId) : '/';
        $actions = [
            ['action' => 'open', 'title' => 'Ответить'],
        ];
        $recipientId = trim((string)($order['recipient_id'] ?? ''));
        $recipients = push_fetch_subscriptions_by_user($recipientId);
        break;

    case 'support_message':
        $senderName  = trim((string)($order['sender_name'] ?? ''));
        $senderPhone = trim((string)($order['sender_phone'] ?? ''));
        $msgText     = trim((string)($order['message'] ?? ''));
        $chatId      = trim((string)($order['chat_id'] ?? ''));

        $who = $senderName !== '' ? $senderName : 'Пользователь';
        if ($senderPhone !== '') {
            $who .= ' · ' . $senderPhone;
        }

        $title = 'Новое обращение в поддержку';
        $body  = $who . "\n"
               . ($msgText !== ''
                    ? (mb_strlen($msgText) > 120 ? mb_substr($msgText, 0, 120) . '…' : $msgText)
                    : 'Новое сообщение');
        $tag = 'almanirent-support-' . ($chatId !== '' ? $chatId : uniqid());
        $url = $chatId !== '' ? '/?open_admin_support=' . urlencode($chatId) : '/';
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Ответить'],
        ];
        $recipients = push_fetch_admin_subscriptions();
        break;

    case 'user_registered':
        $userName  = trim((string)($order['user_name'] ?? ''));
        $userPhone = trim((string)($order['user_phone'] ?? ''));

        $title = 'Новый пользователь';
        $body  = ($userName !== '' ? $userName : 'Без имени')
               . ' · ' . ($userPhone !== '' ? $userPhone : 'телефон не указан');
        $tag   = 'almanirent-user-registered-' . ($order['user_id'] ?? uniqid());
        $url   = '/';
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Посмотреть'],
        ];
        $recipients = push_fetch_admin_subscriptions();
        break;

    case 'admin_broadcast':
        $broadcastTitle = trim((string)($order['title'] ?? ''));
        $broadcastBody  = trim((string)($order['body'] ?? ''));
        $targetRole     = trim((string)($order['target_role'] ?? 'all'));
        $adminPhone     = trim((string)($order['admin_phone'] ?? ''));

        if ($broadcastTitle === '' || $broadcastBody === '' || $adminPhone === '') {
            app_send_json(400, ['error' => 'Missing title, body, or admin_phone']);
        }

        $rpcResult = app_supabase_rpc('admin_send_broadcast', [
            'admin_phone'   => $adminPhone,
            'p_title'       => $broadcastTitle,
            'p_body'        => $broadcastBody,
            'p_target_role' => $targetRole,
        ]);

        if (!app_is_http_success($rpcResult['status']) || empty($rpcResult['data'])) {
            $errorMsg = 'Не удалось создать рассылку';
            if (is_array($rpcResult['data']) && isset($rpcResult['data']['message'])) {
                $errorMsg = $rpcResult['data']['message'];
            }
            app_send_json(403, ['error' => $errorMsg]);
        }

        $broadcastId = $rpcResult['data'][0]['broadcast_id'] ?? '';

        if ($targetRole === 'partner' || $targetRole === 'executor') {
            $recipients = push_fetch_subscriptions_by_role(['partner', 'executor', 'both']);
        } elseif ($targetRole === 'customer') {
            $recipients = push_fetch_subscriptions_by_role(['customer', 'both']);
        } else {
            $recipients = push_fetch_all_subscriptions();
        }

        $title = $broadcastTitle;
        $body  = $broadcastBody;
        $tag   = 'almanirent-broadcast-' . $broadcastId;
        $url   = '/';
        $requireInteraction = true;
        $actions = [
            ['action' => 'open', 'title' => 'Открыть'],
            ['action' => 'close', 'title' => 'Скрыть'],
        ];
        break;

    default:
        app_send_json(400, ['error' => 'Unknown event']);
}

// Фильтр по настройкам уведомлений получателя (prefs). Ключ по типу события.
// Поддержка/рассылки/верификация шлются всегда (важные/админские).
$prefKey = '';
if ($event === 'order_created') $prefKey = 'new_orders';
elseif (in_array($event, ['order_taken', 'order_released', 'order_awaiting_confirmation', 'order_completed'], true)) $prefKey = 'order_status';
elseif ($event === 'new_message') $prefKey = 'messages';

if ($prefKey !== '') {
    $recipients = array_values(array_filter($recipients, function ($sub) use ($prefKey) {
        $prefs = $sub['prefs'] ?? null;
        if (!is_array($prefs)) return true;            // нет настроек → шлём
        return ($prefs[$prefKey] ?? true) !== false;   // выключено только если явно false
    }));
}

if (empty($recipients)) {
    app_send_json(200, ['ok' => true, 'sent' => 0, 'reason' => 'no_subscribers']);
}

// ================================================================
// Send push notifications
// ================================================================

$pushData = [
    'title'              => $title,
    'body'               => $body,
    'tag'                => $tag,
    'url'                => $url,
    'requireInteraction' => $requireInteraction,
    'actions'            => $actions,
];

if ($image !== null) {
    $pushData['image'] = $image;
}

$pushPayload = json_encode($pushData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$result = webpush_send_to_all($recipients, $pushPayload, $vapidPub, $vapidPriv, $vapidEmail);

// Clean up expired subscriptions
if (!empty($result['expired_endpoints'])) {
    push_remove_expired_subscriptions($result['expired_endpoints']);
}

// Update broadcast stats
if ($event === 'admin_broadcast' && !empty($broadcastId)) {
    try {
        app_supabase_patch('admin_broadcasts', ['id' => $broadcastId], [
            'sent_count'   => $result['sent'],
            'failed_count' => $result['failed'],
        ]);
    } catch (Throwable $e) {
        error_log('Failed to update broadcast stats: ' . $e->getMessage());
    }
}

app_send_json(200, [
    'ok'      => true,
    'sent'    => $result['sent'],
    'failed'  => $result['failed'],
    'expired' => count($result['expired_endpoints']),
]);

// ================================================================
// Helper functions
// ================================================================

function push_category_label(array $order)
{
    $cat = strtolower(trim($order['category'] ?? ''));
    return $cat === 'material' ? 'Материал' : 'Техника';
}

function push_format_date($value)
{
    if (!$value) return 'не указана';
    $text = trim((string) $value);
    if ($text === '') return 'не указана';
    try {
        $dt = new DateTimeImmutable($text);
        return $dt->format('d.m.Y');
    } catch (Throwable $e) {
        return $text;
    }
}

function push_format_time($value)
{
    if (!$value) return 'не указано';
    $text = trim((string) $value);
    return strlen($text) >= 5 ? substr($text, 0, 5) : $text;
}

function push_build_new_order_body(array $order)
{
    $label = push_category_label($order);
    $parts = [$label . ': ' . ($order['product'] ?? 'Заказ')];

    $isMaterial = strtolower(trim($order['category'] ?? '')) === 'material';

    if ($isMaterial) {
        $qty = $order['quantity'] ?? 'не указан';
        if (!empty($order['fraction'])) {
            $parts[] = 'Объём: ' . $qty . ' (' . $order['fraction'] . ')';
        } else {
            $parts[] = 'Объём: ' . $qty;
        }
    } elseif (isset($order['rental_hours']) && $order['rental_hours'] !== null) {
        $parts[] = 'Время: ' . $order['rental_hours'] . ' ч';
    }

    if (!empty($order['address'])) {
        $parts[] = 'Адрес: ' . $order['address'];
    }

    $parts[] = 'Дата: ' . push_format_date($order['delivery_date'] ?? null)
             . ', ' . push_format_time($order['delivery_time'] ?? null);

    if (!empty($order['comments'])) {
        $parts[] = 'Комментарий: ' . $order['comments'];
    }

    return implode("\n", $parts);
}

function push_fetch_subscriptions_by_role(array $roles)
{
    $roleFilter = 'in.(' . implode(',', $roles) . ')';

    $response = app_supabase_select('push_subscriptions', [
        'select' => 'endpoint,p256dh,auth,prefs',
        'role'   => $roleFilter,
    ]);

    if (!app_is_http_success($response['status']) || !is_array($response['data'])) {
        error_log('push_fetch_subscriptions_by_role failed: HTTP ' . ($response['status'] ?? 'unknown'));
        return [];
    }

    return $response['data'];
}

// Партнёры с ОПЛАЧЕННОЙ подтверждённой техникой нужного типа (они могут взять заказ).
function push_fetch_partner_subs_by_vehicle_type($type)
{
    $t = trim((string) $type);
    if ($t === '') {
        return push_fetch_subscriptions_by_role(['partner', 'executor', 'both']);
    }

    // approved + оплата ещё действует (paid_until > now)
    $response = app_supabase_select('partner_vehicles', [
        'select'     => 'user_id',
        'type_name'  => 'eq.' . $t,
        'status'     => 'eq.approved',
        'paid_until' => 'gt.' . gmdate('Y-m-d\TH:i:s\Z'),
    ]);

    if (!app_is_http_success($response['status']) || !is_array($response['data'])) {
        error_log('push_fetch_partner_subs_by_vehicle_type failed: HTTP ' . ($response['status'] ?? 'unknown'));
        return [];
    }

    $all = [];
    $seen = [];
    foreach ($response['data'] as $v) {
        $uid = $v['user_id'] ?? '';
        if ($uid === '') continue;
        foreach (push_fetch_subscriptions_by_user($uid) as $sub) {
            $ep = $sub['endpoint'] ?? '';
            if ($ep !== '' && !isset($seen[$ep])) { $seen[$ep] = true; $all[] = $sub; }
        }
    }
    return $all;
}

function push_fetch_subscriptions_by_user($userId)
{
    if (!is_string($userId) || trim($userId) === '') {
        return [];
    }

    $response = app_supabase_select('push_subscriptions', [
        'select'  => 'endpoint,p256dh,auth,prefs',
        'user_id' => 'eq.' . trim($userId),
    ]);

    if (!app_is_http_success($response['status']) || !is_array($response['data'])) {
        error_log('push_fetch_subscriptions_by_user failed: HTTP ' . ($response['status'] ?? 'unknown'));
        return [];
    }

    return $response['data'];
}

function push_fetch_admin_subscriptions()
{
    $response = app_supabase_select('users', [
        'select'   => 'id',
        'is_admin' => 'eq.true',
    ]);

    if (!app_is_http_success($response['status']) || !is_array($response['data'])) {
        error_log('push_fetch_admin_subscriptions: failed to fetch admins: HTTP ' . ($response['status'] ?? 'unknown'));
        return [];
    }

    $all  = [];
    $seen = [];

    foreach ($response['data'] as $admin) {
        $id = $admin['id'] ?? '';
        if ($id === '') continue;

        foreach (push_fetch_subscriptions_by_user($id) as $sub) {
            $ep = $sub['endpoint'] ?? '';
            if ($ep !== '' && !isset($seen[$ep])) {
                $seen[$ep] = true;
                $all[]     = $sub;
            }
        }
    }

    return $all;
}

function push_fetch_all_subscriptions()
{
    $response = app_supabase_select('push_subscriptions', [
        'select' => 'endpoint,p256dh,auth,prefs',
    ]);

    if (!app_is_http_success($response['status']) || !is_array($response['data'])) {
        error_log('push_fetch_all_subscriptions failed: HTTP ' . ($response['status'] ?? 'unknown'));
        return [];
    }

    return $response['data'];
}

function push_remove_expired_subscriptions(array $endpoints)
{
    foreach ($endpoints as $ep) {
        try {
            $deleteUrl = app_supabase_base_url() . '/rest/v1/push_subscriptions?endpoint=eq.' . urlencode($ep);
            app_http_request_json('DELETE', $deleteUrl, app_supabase_headers());
        } catch (Throwable $e) {
            error_log('push_remove_expired failed for ' . substr($ep, 0, 60) . ': ' . $e->getMessage());
        }
    }
}
