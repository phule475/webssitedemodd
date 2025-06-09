<?php
/*
Template Name: Bia Plus Admin
*/
if (!current_user_can('manage_options')) {
    wp_die('Bạn không có quyền truy cập trang này.');
}
get_header(); ?>

<div class="container">
    <h2>Customer Profiles</h2>
    <div id="auth-form">
        <input type="text" id="admin-username" placeholder="Username">
        <input type="password" id="admin-password" placeholder="Password">
        <button id="auth-btn">Xác thực</button>
        <p id="auth-error" style="display: none;">Thông tin không đúng!</p>
    </div>
    <table id="profile-table" style="display: none;">
        <thead>
            <tr>
                <th>Name</th>
                <th>Card Number</th>
                <th>Address</th>
                <th>Submission Time</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody id="profile-body"></tbody>
    </table>
</div>
<a href="<?php echo home_url(); ?>" class="back-link">Quay lại Trang chính</a>

<?php get_footer(); ?>