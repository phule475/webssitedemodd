<?php
/*
Plugin Name: Bia Plus API
Description: API tùy chỉnh cho Bia Plus Theme
Version: 1.0
Author: Your Name
*/

add_action('rest_api_init', function () {
    register_rest_route('bia-plus/v1', '/login', array(
        'methods' => 'POST',
        'callback' => 'bia_plus_login',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('bia-plus/v1', '/profiles', array(
        'methods' => 'GET',
        'callback' => 'bia_plus_get_profiles',
        'permission_callback' => 'bia_plus_check_auth'
    ));

    register_rest_route('bia-plus/v1', '/profiles/(?P<id>[0-9]+)', array(
        'methods' => 'DELETE',
        'callback' => 'bia_plus_delete_profile',
        'permission_callback' => 'bia_plus_check_auth'
    ));

    register_rest_route('bia-plus/v1', '/profiles', array(
        'methods' => 'POST',
        'callback' => 'bia_plus_save_profile',
        'permission_callback' => '__return_true'
    ));
});

function bia_plus_login($request) {
    $username = $request['username'];
    $password = $request['password'];
    if ($username === 'admin' && $password === 'password') {
        $token = wp_generate_uuid4();
        return new WP_REST_Response(array('token' => $token), 200);
    }
    return new WP_Error('invalid_credentials', 'Sai thông tin đăng nhập', array('status' => 401));
}

function bia_plus_check_auth($request) {
    $headers = $request->get_headers();
    $token = str_replace('Bearer ', '', $headers['authorization'][0] ?? '');
    return !empty($token);
}

function bia_plus_get_profiles($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bia_plus_profiles';
    $profiles = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);
    return new WP_REST_Response($profiles, 200);
}

function bia_plus_delete_profile($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bia_plus_profiles';
    $id = $request['id'];
    $result = $wpdb->delete($table_name, array('id' => $id));
    if ($result) {
        return new WP_REST_Response(array('message' => 'Xóa hồ sơ thành công'), 200);
    }
    return new WP_Error('delete_failed', 'Xóa hồ sơ thất bại', array('status' => 500));
}

function bia_plus_save_profile($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bia_plus_profiles';
    $profile = array(
        'name' => sanitize_text_field($request['name']),
        'card' => sanitize_text_field($request['card']),
        'address' => sanitize_text_field($request['address']),
        'timestamp' => sanitize_text_field($request['timestamp'])
    );
    $result = $wpdb->insert($table_name, $profile);
    if ($result) {
        return new WP_REST_Response(array('message' => 'Lưu hồ sơ thành công'), 200);
    }
    return new WP_Error('save_failed', 'Lưu hồ sơ thất bại', array('status' => 500));
}

register_activation_hook(__FILE__, function () {
    global $wpdb;
    $table_name = $wpdb->prefix . 'bia_plus_profiles';
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        name varchar(255) NOT NULL,
        card varchar(255) NOT NULL,
        address varchar(255) NOT NULL,
        timestamp varchar(255) NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
});
?>