<?php
// Cấu hình kết nối MySQL
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '123'); // Mật khẩu bạn đã đặt
define('DB_NAME', 'bia_plus');

$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Cấu hình PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Đường dẫn đến PHPMailer nếu dùng Composer

function sendEmail($to, $subject, $body) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'phules9103@gmail.com'; // Thay bằng email của bạn
        $mail->Password = 'your_app_password'; // Thay bằng App Password của Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('your_email@gmail.com', 'Bia + Admin');
        $mail->addAddress($to);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Lỗi gửi email: {$mail->ErrorInfo}");
        return false;
    }
}
?>