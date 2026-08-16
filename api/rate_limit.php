<?php
/**
 * Simple file-based rate limiter.
 * Stores counters in /tmp/almanirent_ratelimit/
 *
 * Usage:
 *   require __DIR__ . '/rate_limit.php';
 *   app_rate_limit('create_payment', 5, 60); // 5 requests per 60 seconds per IP
 */

function app_rate_limit($action, $maxRequests, $windowSeconds)
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $key = md5($action . ':' . $ip);

    $dir = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'almanirent_ratelimit';
    if (!is_dir($dir)) {
        @mkdir($dir, 0700, true);
    }

    $file = $dir . DIRECTORY_SEPARATOR . $key . '.json';
    $now = time();
    $data = ['timestamps' => []];

    if (is_file($file)) {
        $raw = @file_get_contents($file);
        if ($raw !== false) {
            $parsed = json_decode($raw, true);
            if (is_array($parsed) && isset($parsed['timestamps'])) {
                $data = $parsed;
            }
        }
    }

    // Remove expired timestamps
    $data['timestamps'] = array_values(array_filter(
        $data['timestamps'],
        function ($ts) use ($now, $windowSeconds) {
            return ($now - $ts) < $windowSeconds;
        }
    ));

    if (count($data['timestamps']) >= $maxRequests) {
        if (function_exists('app_send_json')) {
            app_send_json(429, ['error' => 'Too many requests. Try again later.']);
        } else {
            http_response_code(429);
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(['error' => 'Too many requests']);
            exit;
        }
    }

    $data['timestamps'][] = $now;
    @file_put_contents($file, json_encode($data), LOCK_EX);

    // Cleanup old files occasionally (1% chance per request)
    if (mt_rand(1, 100) === 1) {
        app_rate_limit_cleanup($dir, $windowSeconds * 2);
    }
}

function app_rate_limit_cleanup($dir, $maxAge)
{
    $now = time();
    $files = @scandir($dir);
    if (!is_array($files)) {
        return;
    }

    foreach ($files as $f) {
        if ($f === '.' || $f === '..') {
            continue;
        }
        $path = $dir . DIRECTORY_SEPARATOR . $f;
        if (is_file($path) && ($now - filemtime($path)) > $maxAge) {
            @unlink($path);
        }
    }
}
