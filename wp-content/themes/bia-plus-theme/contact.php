<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - Bia +</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <?php include 'header.php'; ?>

    <div class="content">
        <h2>Liên hệ với chúng tôi</h2>
        <p>Email: contact@biaplus.com</p>
        <p>Điện thoại: 0123 456 789</p>
        <a href="index.php" class="back-btn">Quay lại Trang chủ</a>
    </div>

    <?php include 'footer.php'; ?>

    <div id="notification">Thông tin của bạn đã được gửi!</div>

    <script src="js/script.js"></script>
</body>
</html>