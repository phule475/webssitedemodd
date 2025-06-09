<?php
header('Content-Type: application/json');
require 'config.php';

$headers = getallheaders();
$token = $headers['Authorization'] ?? '';
if (strpos($token, 'Bearer ') !== 0 || strlen(str_replace('Bearer ', '', $token)) !== 32) {
    echo json_encode(['success' => false, 'message' => 'Invalid token']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method === 'GET') {
    $result = $conn->query("SELECT id, username, timestamp FROM login_logs ORDER BY timestamp DESC");
    $logs = [];
    while ($row = $result->fetch_assoc()) {
        $logs[] = $row;
    }
    echo json_encode($logs);
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? '';
    if ($id) {
        $stmt = $conn->prepare("DELETE FROM login_logs WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid ID']);
    }
}
$conn->close();
?>