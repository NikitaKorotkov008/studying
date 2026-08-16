<?php
/**
 * Web Push sending library for AlmaniRent.
 *
 * Implements RFC 8291 (Message Encryption for Web Push) and
 * RFC 8292 (VAPID) without any external dependencies.
 *
 * Requirements: PHP 7.3+, openssl extension, curl extension.
 */

if (PHP_VERSION_ID < 70300) {
    throw new RuntimeException('webpush.php requires PHP 7.3+ for openssl_pkey_derive()');
}

// ================================================================
// Base64url helpers
// ================================================================

function webpush_base64url_encode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function webpush_base64url_decode($data)
{
    return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', (4 - strlen($data) % 4) % 4), true);
}

// ================================================================
// EC key PEM builders
// ================================================================

/**
 * Build a PEM-encoded EC private key (SEC1 format) from raw VAPID keys.
 *
 * @param string $privateKeyB64url  Base64url-encoded 32-byte private key
 * @param string $publicKeyB64url   Base64url-encoded 65-byte uncompressed public key
 * @return string PEM string
 */
function webpush_build_ec_private_pem($privateKeyB64url, $publicKeyB64url)
{
    $privRaw = webpush_base64url_decode($privateKeyB64url);
    $pubRaw = webpush_base64url_decode($publicKeyB64url);

    if (strlen($privRaw) !== 32) {
        throw new RuntimeException('VAPID private key must be 32 bytes, got ' . strlen($privRaw));
    }
    if (strlen($pubRaw) !== 65) {
        throw new RuntimeException('VAPID public key must be 65 bytes (uncompressed), got ' . strlen($pubRaw));
    }

    // SEC1 ECPrivateKey ASN.1 DER structure for P-256:
    // SEQUENCE {
    //   INTEGER 1 (version)
    //   OCTET STRING (32 bytes private key)
    //   [0] OID 1.2.840.10045.3.1.7 (prime256v1)
    //   [1] BIT STRING (65 bytes public key)
    // }
    $der = "\x30\x77"                              // SEQUENCE (119 bytes)
         . "\x02\x01\x01"                          // INTEGER 1
         . "\x04\x20" . $privRaw                   // OCTET STRING (32 bytes)
         . "\xa0\x0a"                              // [0] CONSTRUCTED (10 bytes)
         . "\x06\x08\x2a\x86\x48\xce\x3d\x03\x01\x07" // OID prime256v1
         . "\xa1\x44"                              // [1] CONSTRUCTED (68 bytes)
         . "\x03\x42\x00" . $pubRaw;              // BIT STRING (65+1 bytes)

    return "-----BEGIN EC PRIVATE KEY-----\n"
         . chunk_split(base64_encode($der), 64, "\n")
         . "-----END EC PRIVATE KEY-----\n";
}

/**
 * Build a PEM-encoded SubjectPublicKeyInfo from a raw 65-byte uncompressed EC point.
 *
 * @param string $rawPubKey  65-byte uncompressed public key (04 || X || Y)
 * @return string PEM string
 */
function webpush_raw_pubkey_to_pem($rawPubKey)
{
    if (strlen($rawPubKey) !== 65) {
        throw new RuntimeException('EC public key must be 65 bytes, got ' . strlen($rawPubKey));
    }

    // SubjectPublicKeyInfo ASN.1 DER for P-256:
    // SEQUENCE {
    //   SEQUENCE { OID ecPublicKey, OID prime256v1 }
    //   BIT STRING (65 bytes)
    // }
    $der = "\x30\x59"                                   // SEQUENCE (89 bytes)
         . "\x30\x13"                                   // SEQUENCE (19 bytes)
         . "\x06\x07\x2a\x86\x48\xce\x3d\x02\x01"     // OID 1.2.840.10045.2.1
         . "\x06\x08\x2a\x86\x48\xce\x3d\x03\x01\x07" // OID 1.2.840.10045.3.1.7
         . "\x03\x42\x00" . $rawPubKey;                 // BIT STRING

    return "-----BEGIN PUBLIC KEY-----\n"
         . chunk_split(base64_encode($der), 64, "\n")
         . "-----END PUBLIC KEY-----\n";
}

// ================================================================
// VAPID JWT (ES256)
// ================================================================

/**
 * Convert a DER-encoded ECDSA signature to raw R||S (64 bytes).
 */
function webpush_der_sig_to_raw($derSig)
{
    // DER: 30 <len> 02 <rlen> <r> 02 <slen> <s>
    $pos = 0;

    if (ord($derSig[$pos]) !== 0x30) {
        throw new RuntimeException('Invalid DER signature: missing SEQUENCE tag');
    }
    $pos++; // skip SEQUENCE tag

    // skip length (may be 1 or 2 bytes)
    $seqLen = ord($derSig[$pos]);
    $pos++;
    if ($seqLen & 0x80) {
        $pos += ($seqLen & 0x7f);
    }

    // Parse R
    if (ord($derSig[$pos]) !== 0x02) {
        throw new RuntimeException('Invalid DER signature: missing INTEGER tag for R');
    }
    $pos++;
    $rLen = ord($derSig[$pos]);
    $pos++;
    $r = substr($derSig, $pos, $rLen);
    $pos += $rLen;

    // Parse S
    if (ord($derSig[$pos]) !== 0x02) {
        throw new RuntimeException('Invalid DER signature: missing INTEGER tag for S');
    }
    $pos++;
    $sLen = ord($derSig[$pos]);
    $pos++;
    $s = substr($derSig, $pos, $sLen);

    // Trim leading zeros and pad to 32 bytes each
    $r = ltrim($r, "\x00");
    $s = ltrim($s, "\x00");
    $r = str_pad($r, 32, "\x00", STR_PAD_LEFT);
    $s = str_pad($s, 32, "\x00", STR_PAD_LEFT);

    return $r . $s;
}

/**
 * Create a VAPID JWT signed with ES256.
 *
 * @param string $audience           Origin of the push endpoint (e.g. "https://fcm.googleapis.com")
 * @param string $subject            VAPID contact (e.g. "mailto:admin@almanirent.ru")
 * @param string $privateKeyB64url   VAPID private key (base64url, 32 bytes)
 * @param string $publicKeyB64url    VAPID public key (base64url, 65 bytes)
 * @param int    $ttl                JWT validity in seconds (default 12 hours)
 * @return string The signed JWT
 */
function webpush_create_vapid_jwt($audience, $subject, $privateKeyB64url, $publicKeyB64url, $ttl = 43200)
{
    $header = webpush_base64url_encode(json_encode(['typ' => 'JWT', 'alg' => 'ES256']));

    $payload = webpush_base64url_encode(json_encode([
        'aud' => $audience,
        'exp' => time() + $ttl,
        'sub' => $subject,
    ]));

    $signingInput = $header . '.' . $payload;

    // Build PEM from VAPID keys
    $pem = webpush_build_ec_private_pem($privateKeyB64url, $publicKeyB64url);
    $key = openssl_pkey_get_private($pem);
    if ($key === false) {
        throw new RuntimeException('Failed to load VAPID private key: ' . openssl_error_string());
    }

    $derSignature = '';
    $ok = openssl_sign($signingInput, $derSignature, $key, OPENSSL_ALGO_SHA256);
    if (!$ok) {
        throw new RuntimeException('Failed to sign VAPID JWT: ' . openssl_error_string());
    }

    $rawSignature = webpush_der_sig_to_raw($derSignature);

    return $signingInput . '.' . webpush_base64url_encode($rawSignature);
}

// ================================================================
// HKDF (RFC 5869) with SHA-256
// ================================================================

/**
 * HKDF extract-and-expand using SHA-256.
 *
 * @param string $salt   Salt for extraction
 * @param string $ikm    Input keying material
 * @param string $info   Context info for expansion
 * @param int    $length Desired output length
 * @return string Derived key material
 */
function webpush_hkdf($salt, $ikm, $info, $length)
{
    // PHP 7.1.2+ has hash_hkdf which does extract+expand
    return hash_hkdf('sha256', $ikm, $length, $info, $salt);
}

// ================================================================
// RFC 8291: Web Push payload encryption (aes128gcm)
// ================================================================

/**
 * Encrypt a push notification payload per RFC 8291.
 *
 * @param string $payload           The JSON payload string to encrypt
 * @param string $subscriberP256dh  Base64url-encoded 65-byte client public key
 * @param string $subscriberAuth    Base64url-encoded 16-byte auth secret
 * @return string The encrypted aes128gcm body ready to POST
 */
function webpush_encrypt_payload($payload, $subscriberP256dh, $subscriberAuth)
{
    // Decode subscriber keys
    $clientPubKey = webpush_base64url_decode($subscriberP256dh);
    $authSecret = webpush_base64url_decode($subscriberAuth);

    if (strlen($clientPubKey) !== 65) {
        throw new RuntimeException('Client p256dh must be 65 bytes, got ' . strlen($clientPubKey));
    }
    if (strlen($authSecret) !== 16) {
        throw new RuntimeException('Client auth must be 16 bytes, got ' . strlen($authSecret));
    }

    // 1. Generate ephemeral ECDH key pair (P-256)
    $ephemeralKey = openssl_pkey_new([
        'curve_name'       => 'prime256v1',
        'private_key_type' => OPENSSL_KEYTYPE_EC,
    ]);
    if ($ephemeralKey === false) {
        throw new RuntimeException('Failed to generate ephemeral EC key: ' . openssl_error_string());
    }

    $ephemeralDetails = openssl_pkey_get_details($ephemeralKey);
    if ($ephemeralDetails === false) {
        throw new RuntimeException('Failed to get ephemeral key details');
    }

    // Build uncompressed public key: 04 || X || Y
    $serverPubKey = "\x04"
        . str_pad($ephemeralDetails['ec']['x'], 32, "\x00", STR_PAD_LEFT)
        . str_pad($ephemeralDetails['ec']['y'], 32, "\x00", STR_PAD_LEFT);

    // 2. Load client public key as PEM resource for ECDH
    $clientPubPem = webpush_raw_pubkey_to_pem($clientPubKey);
    $clientPubResource = openssl_pkey_get_public($clientPubPem);
    if ($clientPubResource === false) {
        throw new RuntimeException('Failed to load client public key: ' . openssl_error_string());
    }

    // 3. ECDH shared secret
    $sharedSecret = openssl_pkey_derive($clientPubResource, $ephemeralKey);
    if ($sharedSecret === false) {
        throw new RuntimeException('ECDH key agreement failed: ' . openssl_error_string());
    }

    // 4. Derive IKM using HKDF
    // info = "WebPush: info\0" || client_public_key(65) || server_public_key(65)
    $authInfo = "WebPush: info\x00" . $clientPubKey . $serverPubKey;
    $ikm = webpush_hkdf($authSecret, $sharedSecret, $authInfo, 32);

    // 5. Generate random 16-byte salt
    $salt = random_bytes(16);

    // 6. Derive content encryption key and nonce
    $cek = webpush_hkdf($salt, $ikm, "Content-Encoding: aes128gcm\x00", 16);
    $nonce = webpush_hkdf($salt, $ikm, "Content-Encoding: nonce\x00", 12);

    // 7. Pad payload (add \x02 delimiter — marks final record)
    $paddedPayload = $payload . "\x02";

    // 8. Encrypt with AES-128-GCM
    $tag = '';
    $ciphertext = openssl_encrypt(
        $paddedPayload,
        'aes-128-gcm',
        $cek,
        OPENSSL_RAW_DATA,
        $nonce,
        $tag,
        '',  // no AAD
        16   // tag length
    );
    if ($ciphertext === false) {
        throw new RuntimeException('AES-128-GCM encryption failed: ' . openssl_error_string());
    }

    $encryptedRecord = $ciphertext . $tag;

    // 9. Build aes128gcm content-coding body
    // Format: salt(16) || rs(4, uint32 BE) || idlen(1) || keyid(65) || encrypted_record
    $rs = pack('N', 4096); // record size
    $idlen = chr(65);       // length of server public key

    return $salt . $rs . $idlen . $serverPubKey . $encryptedRecord;
}

// ================================================================
// High-level send functions
// ================================================================

/**
 * Send a Web Push notification to a single subscription.
 *
 * @param string $endpoint      The push endpoint URL
 * @param string $p256dh        Base64url subscriber public key
 * @param string $auth          Base64url subscriber auth secret
 * @param string $payloadJson   JSON string to send as notification data
 * @param string $vapidPub      VAPID public key (base64url)
 * @param string $vapidPriv     VAPID private key (base64url)
 * @param string $vapidEmail    VAPID contact email (mailto:...)
 * @return array ['status' => int, 'body' => string]
 */
function webpush_send($endpoint, $p256dh, $auth, $payloadJson, $vapidPub, $vapidPriv, $vapidEmail)
{
    // Encrypt payload
    $body = webpush_encrypt_payload($payloadJson, $p256dh, $auth);

    // Extract audience (origin) from endpoint
    $parsedUrl = parse_url($endpoint);
    $audience = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];
    if (isset($parsedUrl['port'])) {
        $audience .= ':' . $parsedUrl['port'];
    }

    // Create VAPID JWT
    $jwt = webpush_create_vapid_jwt($audience, $vapidEmail, $vapidPriv, $vapidPub);

    // Send via cURL
    $ch = curl_init($endpoint);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $body,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/octet-stream',
            'Content-Encoding: aes128gcm',
            'Content-Length: ' . strlen($body),
            'TTL: 86400',
            'Authorization: vapid t=' . $jwt . ', k=' . $vapidPub,
            'Urgency: high',
        ],
    ]);

    $responseBody = curl_exec($ch);
    $statusCode = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);

    if ($responseBody === false) {
        $error = curl_error($ch);
        curl_close($ch);
        return ['status' => 0, 'body' => 'cURL error: ' . $error];
    }

    curl_close($ch);

    return ['status' => $statusCode, 'body' => (string) $responseBody];
}

/**
 * Send a push notification to multiple subscriptions.
 *
 * @param array  $subscriptions  Array of ['endpoint', 'p256dh', 'auth']
 * @param string $payloadJson    JSON payload
 * @param string $vapidPub       VAPID public key (base64url)
 * @param string $vapidPriv      VAPID private key (base64url)
 * @param string $vapidEmail     VAPID contact email
 * @return array ['sent' => int, 'failed' => int, 'expired_endpoints' => string[]]
 */
function webpush_send_to_all(array $subscriptions, $payloadJson, $vapidPub, $vapidPriv, $vapidEmail)
{
    $sent = 0;
    $failed = 0;
    $expiredEndpoints = [];

    foreach ($subscriptions as $sub) {
        $ep = $sub['endpoint'] ?? '';
        $p256dh = $sub['p256dh'] ?? '';
        $authKey = $sub['auth'] ?? '';

        if ($ep === '' || $p256dh === '' || $authKey === '') {
            $failed++;
            continue;
        }

        try {
            $result = webpush_send($ep, $p256dh, $authKey, $payloadJson, $vapidPub, $vapidPriv, $vapidEmail);

            if ($result['status'] >= 200 && $result['status'] < 300) {
                $sent++;
            } elseif ($result['status'] === 404 || $result['status'] === 410) {
                // Subscription expired or unsubscribed
                $expiredEndpoints[] = $ep;
                $failed++;
            } else {
                $failed++;
                error_log('webpush_send failed [' . $result['status'] . '] for ' . substr($ep, 0, 60) . ': ' . $result['body']);
            }
        } catch (Throwable $ex) {
            $failed++;
            error_log('webpush_send exception for ' . substr($ep, 0, 60) . ': ' . $ex->getMessage());
        }
    }

    return [
        'sent'              => $sent,
        'failed'            => $failed,
        'expired_endpoints' => $expiredEndpoints,
    ];
}
