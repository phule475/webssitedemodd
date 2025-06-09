<?php
/*
Template Name: Bia Plus Menu
*/
get_header(); ?>

<div class="menu-container">
    <div class="grid-menu">
        <div class="grid-container">
            <?php
            $args = array(
                'post_type' => 'bia_menu',
                'posts_per_page' => -1
            );
            $query = new WP_Query($args);
            if ($query->have_posts()) :
                while ($query->have_posts()) : $query->the_post();
                    $image = get_the_post_thumbnail_url() ?: get_template_directory_uri() . '/images/com-chien.jpg';
                    $price = get_post_meta(get_the_ID(), 'price', true) ?: '750.000đ';
                    $details = get_post_meta(get_the_ID(), 'details', true) ?: 'Đồ gỗ 40 x 25';
            ?>
                <div class="grid-item">
                    <div class="grid-content">
                        <img src="<?php echo esc_url($image); ?>" alt="<?php the_title(); ?>">
                        <h3><?php the_title(); ?></h3>
                        <p class="price"><?php echo esc_html($price); ?></p>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                    <div class="item-footer">
                        <div class="details-info"><?php echo esc_html($details); ?></div>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
            ?>
                <p>Không có món ăn nào.</p>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>