<?php

require_once __DIR__ . '/rate_limit.php';

// ============================================================
// Точка входа для всех эндпоинтов.
//
//   app_endpoint(['rate_limit' => 5])          — POST-only + rate limit
//   app_endpoint(['auth' => 'bearer'])          — + проверка PUSH_API_SECRET
//   app_endpoint(['auth' => 'webhook_secret'])  — + проверка YOOKASSA_WEBHOOK_SECRET
//   app_endpoint()                              — просто POST-only
// ============================================================
function app_endpoint(array $options = [])
{
    // Handle CORS preflight (OPTIONS)
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        _app_send_cors_preflight();
    }

    if (!isset($_SERVER['REQUEST_METHOD']) || $_SERVER['REQUEST_METHOD'] !== 'POST') {
        app_send_json(450, ['error' => 'Method not allowed']);
    }

    if (isset($options['rate_limit'])) {
        $name = $options['rate_limit_name'] ?? $_SERVER['REQUEST_URI'] ?? 'default';
        $max = (int)$options['rate_limit'];
        $window = (int)($options['rate_limit_window'] ?? 60);
        app_rate_limit($name, $max, $window);
    }

    if (isset($options['auth'])) {
        if ($options['auth'] === 'bearer') {
            _app_check_bearer_auth();
        } elseif ($options['auth'] === 'webhook_secret') {
            _app_check_webhook_secret();
        }
    }

    return app_read_json_body();
}

function _app_check_bearer_auth()
{
    $secret = trim((string)app_get_env('PUSH_API_SECRET', ''));
    if ($secret === '') return;

    $header = trim((string)($_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? ''));
    $token = (strpos($header, 'Bearer ') === 0) ? trim(substr($header, 7)) : '';

    if ($token === '' || !hash_equals($secret, $token)) {
        app_send_json(401, ['error' => 'Unauthorized']);
    }
}

function _app_check_webhook_secret()
{
    $expected = trim((string)app_get_env('YOOKASSA_WEBHOOK_SECRET', ''));
    if ($expected === '') {
        error_log('CRITICAL: YOOKASSA_WEBHOOK_SECRET is not configured');
        app_send_json(500, ['status' => 'webhook_secret_not_configured']);
    }

    $received = trim((string)($_SERVER['HTTP_X_ALMANIRENT_WEBHOOK_SECRET'] ?? ''));
    if ($received === '' || !hash_equals($expected, $received)) {
        app_send_json(401, ['status' => 'unauthorized']);
    }
}

// --- CORS preflight ---

function _app_send_cors_preflight()
{
    $allowed = ['https://almanirent.ru', 'https://www.almanirent.ru'];
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

// --- Ответы ---

function app_send_json($statusCode, array $payload)
{
    if (!headers_sent()) {
        header('Content-Type: application/json; charset=utf-8');

        $allowed = ['https://almanirent.ru', 'https://www.almanirent.ru'];
        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
        if (in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
        }
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header('Access-Control-Allow-Methods: POST, OPTIONS');

        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }

    http_response_code((int)$statusCode);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    app_send_json(200, ['ok' => true]);
}

function app_load_env_values()
{
    static $envValues = null;

    if ($envValues !== null) {
        return $envValues;
    }

    $envValues = [];
    $envPath = dirname(__DIR__) . DIRECTORY_SEPARATOR . '.env';

    if (!is_file($envPath)) {
        return $envValues;
    }

    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines)) {
        return $envValues;
    }

    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || strpos($trimmed, '#') === 0) {
            continue;
        }

        $delimiterPos = strpos($trimmed, '=');
        if ($delimiterPos === false) {
            continue;
        }

        $key = trim(substr($trimmed, 0, $delimiterPos));
        $value = trim(substr($trimmed, $delimiterPos + 1));

        if ($key === '') {
            continue;
        }

        if (strlen($value) >= 2) {
            $quote = $value[0];
            if (($quote === '"' || $quote === "'") && substr($value, -1) === $quote) {
                $value = substr($value, 1, -1);
            }
        }

        $envValues[$key] = $value;
    }

    return $envValues;
}

function app_get_env($key, $defaultValue = null)
{
    $envValues = app_load_env_values();

    if (array_key_exists($key, $envValues)) {
        return $envValues[$key];
    }

    $serverValue = isset($_SERVER[$key]) ? $_SERVER[$key] : null;
    if ($serverValue !== null && $serverValue !== '') {
        return $serverValue;
    }

    $systemValue = getenv($key);
    if ($systemValue !== false && $systemValue !== '') {
        return $systemValue;
    }

    return $defaultValue;
}

function app_require_env(array $keys)
{
    $resolved = [];
    $missing = [];

    foreach ($keys as $key) {
        $value = app_get_env($key, '');
        if ($value === '') {
            $missing[] = $key;
            continue;
        }
        $resolved[$key] = $value;
    }

    if (!empty($missing)) {
        app_send_json(500, [
            'error' => 'Не заданы переменные окружения: ' . implode(', ', $missing)
        ]);
    }

    return $resolved;
}

function app_read_json_body()
{
    $rawBody = file_get_contents('php://input');
    if (!is_string($rawBody) || trim($rawBody) === '') {
        return [];
    }

    $decoded = json_decode($rawBody, true);
    if (!is_array($decoded)) {
        app_send_json(400, ['error' => 'Некорректный JSON']);
    }

    return $decoded;
}

function app_http_request_json($method, $url, array $headers, $body = null)
{
    if (!function_exists('curl_init')) {
        throw new RuntimeException('Расширение cURL недоступно на сервере');
    }

    $curl = curl_init($url);
    if ($curl === false) {
        throw new RuntimeException('Не удалось инициализировать cURL');
    }

    $headerLines = [];
    foreach ($headers as $name => $value) {
        $headerLines[] = $name . ': ' . $value;
    }

    $options = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => strtoupper((string)$method),
        CURLOPT_HTTPHEADER => $headerLines,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => false,
    ];

    if ($body !== null) {
        if (is_array($body)) {
            $body = json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        }
        $options[CURLOPT_POSTFIELDS] = $body;
    }

    curl_setopt_array($curl, $options);

    $rawResponse = curl_exec($curl);
    if ($rawResponse === false) {
        $errorMessage = curl_error($curl);
        curl_close($curl);
        throw new RuntimeException('HTTP request failed: ' . $errorMessage);
    }

    $statusCode = (int)curl_getinfo($curl, CURLINFO_RESPONSE_CODE);
    $contentType = (string)curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
    curl_close($curl);

    $decoded = null;
    $trimmed = ltrim((string)$rawResponse);
    if ($trimmed !== '' && (
        stripos($contentType, 'application/json') !== false ||
        $trimmed[0] === '{' ||
        $trimmed[0] === '['
    )) {
        $parsed = json_decode($rawResponse, true);
        if (is_array($parsed)) {
            $decoded = $parsed;
        }
    }

    return [
        'status' => $statusCode,
        'content_type' => $contentType,
        'raw' => (string)$rawResponse,
        'data' => $decoded,
    ];
}

function app_is_http_success($status)
{
    return $status >= 200 && $status < 300;
}

function app_supabase_headers($prefer = null)
{
    $config = app_require_env(['SUPABASE_SERVICE_ROLE_KEY']);
    $headers = [
        'Content-Type' => 'application/json',
        'apikey' => $config['SUPABASE_SERVICE_ROLE_KEY'],
        'Authorization' => 'Bearer ' . $config['SUPABASE_SERVICE_ROLE_KEY'],
    ];

    if ($prefer) {
        $headers['Prefer'] = $prefer;
    }

    return $headers;
}

function app_supabase_base_url()
{
    $config = app_require_env(['SUPABASE_URL']);
    return rtrim($config['SUPABASE_URL'], '/');
}

function app_supabase_rpc($functionName, array $params)
{
    $url = app_supabase_base_url() . '/rest/v1/rpc/' . rawurlencode($functionName);
    return app_http_request_json('POST', $url, app_supabase_headers('return=representation'), $params);
}

function app_supabase_patch($table, array $filters, array $updates)
{
    $query = [];
    foreach ($filters as $column => $value) {
        $query[$column] = 'eq.' . $value;
    }

    $url = app_supabase_base_url() . '/rest/v1/' . rawurlencode($table);
    if (!empty($query)) {
        $url .= '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986);
    }

    return app_http_request_json('PATCH', $url, app_supabase_headers('return=minimal'), $updates);
}

function app_supabase_select($table, array $query)
{
    $url = app_supabase_base_url() . '/rest/v1/' . rawurlencode($table);
    if (!empty($query)) {
        $url .= '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986);
    }

    return app_http_request_json('GET', $url, app_supabase_headers());
}

function app_supabase_upsert($table, array $rows, $onConflictColumn = null)
{
    $url = app_supabase_base_url() . '/rest/v1/' . rawurlencode($table);
    if ($onConflictColumn) {
        $url .= '?on_conflict=' . rawurlencode((string)$onConflictColumn);
    }

    return app_http_request_json(
        'POST',
        $url,
        app_supabase_headers('resolution=merge-duplicates,return=representation'),
        $rows
    );
}

function app_parse_datetime_utc($value)
{
    if (!is_string($value) || trim($value) === '') {
        return null;
    }

    try {
        $date = new DateTimeImmutable($value);
        return $date->setTimezone(new DateTimeZone('UTC'));
    } catch (Throwable $error) {
        return null;
    }
}

function app_format_datetime_utc(DateTimeImmutable $date)
{
    return $date->setTimezone(new DateTimeZone('UTC'))->format(DateTime::ATOM);
}

function app_is_valid_uuid($value)
{
    if (!is_string($value)) {
        return false;
    }

    return (bool)preg_match(
        '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i',
        trim($value)
    );
}

function app_get_app_setting_value($key)
{
    static $cache = [];

    $settingKey = trim((string)$key);
    if ($settingKey === '') {
        return null;
    }

    if (array_key_exists($settingKey, $cache)) {
        return $cache[$settingKey];
    }

    try {
        $response = app_supabase_select('app_settings', [
            'select' => 'value',
            'key' => 'eq.' . $settingKey,
            'limit' => 1,
        ]);

        if (
            app_is_http_success($response['status']) &&
            is_array($response['data']) &&
            !empty($response['data']) &&
            array_key_exists('value', $response['data'][0])
        ) {
            $cache[$settingKey] = $response['data'][0]['value'];
            return $cache[$settingKey];
        }
    } catch (Throwable $error) {
        // Keep silent and fallback to env/default values.
    }

    $cache[$settingKey] = null;
    return null;
}
