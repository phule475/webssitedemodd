<?php
/**
 * Bia Plus Theme Functions
 */

// Theme setup
function bia_plus_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'bia-plus-theme'),
    ));
}
add_action('after_setup_theme', 'bia_plus_theme_setup');

// Enqueue scripts and styles
function bia_plus_theme_scripts() {
    wp_enqueue_style('bia-plus-main-style', get_template_directory_uri() . '/css/styles.css', array(), '1.0');
    wp_enqueue_style('bia-plus-menu-style', get_template_directory_uri() . '/css/bia-plus-menu-styles.css', array(), '1.0');
    wp_enqueue_style('bia-plus-admin-style', get_template_directory_uri() . '/css/admin-styles.css', array(), '1.0');
    wp_enqueue_script('bia-plus-main-script', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0', true);
    wp_enqueue_script('bia-plus-menu-script', get_template_directory_uri() . '/js/bia-plus-menu-js.js', array('jquery'), '1.0', true);
    wp_enqueue_script('bia-plus-admin-script', get_template_directory_uri() . '/js/admin-js.js', array('jquery'), '1.0', true);
    wp_localize_script('bia-plus-main-script', 'biaPlusAjax', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('bia_plus_nonce'),
        'rest_url' => rest_url('bia-plus/v1/')
    ));
}
add_action('wp_enqueue_scripts', 'bia_plus_theme_scripts');

// Register Custom Post Type for Menu Items
function bia_plus_register_menu_cpt() {
    register_post_type('bia_menu', array(
        'labels' => array(
            'name' => __('Menu Items', 'bia-plus-theme'),
            'singular_name' => __('Menu Item', 'bia-plus-theme')
        ),
        'public' => true,
        'supports' => array('title', 'thumbnail', 'custom-fields'),
        'show_in_rest' => true
    ));
}
add_action('init', 'bia_plus_register_menu_cpt');
?>