<?php
// Bắt đầu session (nếu cần)
session_start();

// Bao gồm file functions.php (nếu có logic bổ sung)
include_once 'functions.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bia +</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Bao gồm header -->
    <?php include 'header.php'; ?>

    <!-- Nội dung chính -->
    <div class="slideshow-container">
        <div class="slide active">
            <img src="images/image.jpg" alt="Slide 1">
        </div>
        <div class="slide">
            <img src="images/com-chien.jpg" alt="Slide 2">
        </div>
        <a class="prev" onclick="changeSlide(-1)">❮</a>
        <a class="next" onclick="changeSlide(1)">❯</a>
    </div>

    <!-- Menu -->
    <div class="menu">▲ MENU</div>
    <div id="menu-dropdown" class="menu-dropdown">
        <div class="menu-item" data-link="index.php">Home</div>
        <div class="menu-item" data-link="admin.php">Admin</div>
        <div class="menu-item" data-link="contact.php">Contact</div> <!-- Liên kết mới -->
    </div>

    <!-- Bao gồm footer -->
    <?php include 'footer.php'; ?>

    <!-- Thông báo -->
    <div id="notification">Thông tin của bạn đã được gửi!</div>

    <!-- Liên kết JavaScript -->
    <script src="js/script.js"></script>
</body>
</html>