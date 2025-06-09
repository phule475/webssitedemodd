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
    $result = $conn->query("SELECT id, name, card, address, timestamp FROM profiles ORDER BY timestamp DESC");
    $profiles = [];
    while ($row = $result->fetch_assoc()) {
        $profiles[] = $row;
    }
    echo json_encode($profiles);
} elseif ($method === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $card = $data['card'] ?? '';
    $address = $data['address'] ?? '';
    $timestamp = $data['timestamp'] ?? date('Y-m-d H:i:s');

    if ($name && $card && $address) {
        $stmt = $conn->prepare("INSERT INTO profiles (name, card, address, timestamp) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $card, $address, $timestamp);
        $stmt->execute();
        $stmt->close();
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} elseif ($method === 'DELETE') {
    $id = $_GET['id'] ?? '';
    if ($id) {
        $stmt = $conn->prepare("DELETE FROM profiles WHERE id = ?");
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