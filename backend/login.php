<?php
header('Content-Type: application/json');
require 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';
$isAdmin = $data['isAdmin'] ?? false;

$validUsers = [
    'admin' => 'admin123',
    'user1' => 'password1',
    'user2' => 'password2'
];

if (isset($validUsers[$username]) && $validUsers[$username] === $password) {
    $stmt = $conn->prepare("INSERT INTO login_logs (username, timestamp) VALUES (?, NOW())");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->close();

    $adminEmail = 'admin_email@example.com'; // Thay bằng email admin
    $subject = 'Thông báo đăng nhập';
    $body = "<h3>New Login Notification</h3><p>Username: $username</p><p>Time: " . date('Y-m-d H:i:s') . "</p>";
    sendEmail($adminEmail, $subject, $body);

    $token = bin2hex(random_bytes(16));
    echo json_encode(['success' => true, 'token' => $token]);
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid login credentials']);
}
$conn->close();
?>