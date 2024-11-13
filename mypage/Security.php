<?php
// Configuración de seguridad básica
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1);

// Iniciar sesión segura
session_start();

// Configurar headers de seguridad
header("X-Frame-Options: DENY");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("Strict-Transport-Security: max-age=31536000; includeSubDomains");
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://github-readme-stats.vercel.app https://github-profile-summary-cards.vercel.app https://github-readme-streak-stats.herokuapp.com https://komarev.com; img-src 'self' https: data:; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.github.com;");
header("Referrer-Policy: strict-origin-when-cross-origin");

// Función para limpiar inputs
function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Función para verificar token CSRF
function verifyCSRFToken() {
    if (!isset($_POST['csrf_token']) || !isset($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $_POST['csrf_token']);
}

// Generar token CSRF
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Función para verificar si la solicitud es AJAX
function isAjaxRequest() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

// Función para registro de actividad
function logActivity($action, $ip) {
    $date = date('Y-m-d H:i:s');
    $logEntry = "$date | $action | IP: $ip\n";
    error_log($logEntry, 3, "security.log");
}

// Función para bloquear IPs sospechosas
function checkIPBlacklist($ip) {
    $blacklist = file_get_contents('ip_blacklist.txt');
    if (strpos($blacklist, $ip) !== false) {
        return true;
    }
    return false;
}

// Forzar HTTPS
function enforceHTTPS() {
    if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
        $redirectURL = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        header("Location: " . $redirectURL);
        exit();
    }
}
