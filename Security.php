<?php
class Security {
    // Configuración de políticas de seguridad
    private static $securityPolicies = [
        'Content-Security-Policy' => [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://github-readme-stats.vercel.app https://github-profile-summary-cards.vercel.app https://github-readme-streak-stats.herokuapp.com https://komarev.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' https: data:",
            "font-src 'self'",
            "connect-src 'self' https://api.github.com",
            "media-src 'none'",
            "object-src 'none'",
            "frame-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            "frame-ancestors 'none'",
            "upgrade-insecure-requests"
        ],
        'X-Frame-Options' => 'DENY',
        'X-Content-Type-Options' => 'nosniff',
        'Referrer-Policy' => 'strict-origin-when-cross-origin'
    ];

    public static function init() {
        // Forzar HTTPS
        self::enforceHTTPS();

        // Configurar sesión segura
        self::configureSecureSession();

        // Aplicar headers de seguridad
        self::applySecurityHeaders();
    }

    private static function enforceHTTPS() {
        if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
            $redirectURL = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            header("Location: " . $redirectURL);
            exit();
        }
    }

    private static function configureSecureSession() {
        ini_set('session.cookie_httponly', 1);
        ini_set('session.use_only_cookies', 1);
        ini_set('session.cookie_secure', 1);
        ini_set('session.cookie_samesite', 'Strict');
        
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    private static function applySecurityHeaders() {
        // Content Security Policy
        $cspValue = implode('; ', self::$securityPolicies['Content-Security-Policy']);
        header("Content-Security-Policy: " . $cspValue);

        // X-Frame-Options
        header("X-Frame-Options: " . self::$securityPolicies['X-Frame-Options']);

        // X-Content-Type-Options
        header("X-Content-Type-Options: " . self::$securityPolicies['X-Content-Type-Options']);

        // Referrer-Policy
        header("Referrer-Policy: " . self::$securityPolicies['Referrer-Policy']);

        // Headers adicionales de seguridad
        header("Strict-Transport-Security: max-age=31536000; includeSubDomains; preload");
        header("X-XSS-Protection: 1; mode=block");
        header("Permissions-Policy: geolocation=(), microphone=(), camera=()");
    }

    // Método para actualizar políticas dinámicamente
    public static function updateSecurityPolicy($policy, $value) {
        if (isset(self::$securityPolicies[$policy])) {
            self::$securityPolicies[$policy] = $value;
            self::applySecurityHeaders();
        }
    }

    // Método para verificar headers de seguridad
    public static function verifySecurityHeaders() {
        $headers = headers_list();
        $required_headers = [
            'Content-Security-Policy',
            'X-Frame-Options',
            'X-Content-Type-Options',
            'Referrer-Policy'
        ];

        foreach ($required_headers as $header) {
            if (!self::hasHeader($headers, $header)) {
                error_log("Header de seguridad faltante: " . $header);
                return false;
            }
        }
        return true;
    }

    private static function hasHeader($headers, $headerName) {
        foreach ($headers as $header) {
            if (stripos($header, $headerName) !== false) {
                return true;
            }
        }
        return false;
    }
}

// Inicializar seguridad
Security::init();

// Verificar que los headers estén configurados correctamente
if (!Security::verifySecurityHeaders()) {
    error_log("Advertencia: No todos los headers de seguridad están configurados correctamente");
}
