document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');
    const nameInput = document.getElementById('name');
    const cardInput = document.getElementById('card');
    const addressInput = document.getElementById('address');
    const saveBtn = document.getElementById('save-profile');
    const notification = document.getElementById('notification');

    // Initialize Broadcast Channel
    const profileChannel = new BroadcastChannel('profile_channel');

    // Toggle profile info visibility
    function toggleProfileInfo(event) {
        event.preventDefault();
        event.stopPropagation();
        profileInfo.classList.toggle('active');
    }

    profileBtn.addEventListener('click', toggleProfileInfo);
    profileBtn.addEventListener('touchstart', toggleProfileInfo, { passive: true });

    // Close profile-info if clicked or touched outside
    document.addEventListener('click', (event) => {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    });

    document.addEventListener('touchstart', (event) => {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    }, { passive: true });

    // Send profile to admin page via Broadcast Channel
    saveBtn.addEventListener('click', () => {
        const profile = {
            name: nameInput.value.trim(),
            card: cardInput.value.trim(),
            address: addressInput.value.trim(),
            timestamp: new Date().toLocaleString('vi-VN')
        };

        if (profile.name && profile.card && profile.address) {
            // Send profile data via Broadcast Channel
            profileChannel.postMessage(profile);

            // Clear input fields
            nameInput.value = '';
            cardInput.value = '';
            addressInput.value = '';

            // Show notification
            notification.classList.add('active');
            notification.textContent = 'Thông tin của bạn đã được gửi!';
            setTimeout(() => {
                notification.classList.remove('active');
            }, 3000);

            profileInfo.classList.remove('active');
        } else {
            alert('Vui lòng điền đầy đủ các trường!');
        }
    });

    // Menu Logic
    const menuBtn = document.querySelector('.menu');
    const menuDropdown = document.getElementById('menu-dropdown');

    menuBtn.addEventListener('click', () => {
        menuDropdown.classList.toggle('show');
    });

    // Handle clicks on menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const link = item.dataset.link;
            // Perform navigation (optional)
            // window.location.href = link;
            menuDropdown.classList.remove('show');
        });
    });

    // Close menu-dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove('show');
        }
    });

    // Slideshow Logic
    let slideIndex = 0;
    let autoSlideTimeout;

    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        
        // Remove 'active' class from all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        
        // Handle slide index bounds
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        
        // Add 'active' class to the current slide
        slides[slideIndex].classList.add("active");
        
        slideIndex++; // Move to the next slide
        clearTimeout(autoSlideTimeout);
        autoSlideTimeout = setTimeout(showSlides, 3000); // Auto-advance every 3 seconds
    }

    // Manual navigation with arrow buttons
    window.changeSlide = function(n) {
        slideIndex += n;
        showSlides();
    };

    // Start the slideshow
    showSlides();
});