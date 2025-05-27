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
    console.log('Broadcast Channel initialized in main page');

    // Toggle profile info visibility
    function toggleProfileInfo(event) {
        event.preventDefault();
        profileInfo.classList.toggle('active');
        console.log('Profile form toggled:', profileInfo.classList.contains('active') ? 'open' : 'closed');
    }

    // Use only click event for toggling profile info
    profileBtn.addEventListener('click', toggleProfileInfo);

    // Close profile-info if clicked outside
    document.addEventListener('click', (event) => {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
            console.log('Profile form closed due to outside click');
        }
    });

    // Send profile to admin page via Broadcast Channel
    saveBtn.addEventListener('click', () => {
        const profile = {
            name: nameInput.value.trim(),
            card: cardInput.value.trim(),
            address: addressInput.value.trim(),
            timestamp: new Date().toLocaleString('en-US')
        };

        if (profile.name && profile.card && profile.address) {
            // Log to confirm data is sent
            console.log('Sending profile to admin:', profile);
            try {
                profileChannel.postMessage(profile);
                console.log('Profile sent successfully');
            } catch (error) {
                console.error('Error sending profile:', error);
            }

            // Clear input fields
            nameInput.value = '';
            cardInput.value = '';
            addressInput.value = '';

            // Show notification
            notification.classList.add('active');
            notification.textContent = 'Your information has been sent!';
            setTimeout(() => {
                notification.classList.remove('active');
            }, 3000);

            profileInfo.classList.remove('active');
        } else {
            console.error('Validation failed: please fill all fields');
            alert('Please fill in all fields!');
        }
    });

    // Menu Logic
    const menuBtn = document.querySelector('.menu');
    const menuDropdown = document.getElementById('menu-dropdown');

    menuBtn.addEventListener('click', () => {
        menuDropdown.classList.toggle('show');
        console.log('Menu toggled:', menuDropdown.classList.contains('show') ? 'open' : 'closed');
    });

    // Handle clicks on menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const link = item.dataset.link;
            console.log('Menu item clicked:', link);
            // Perform navigation (optional)
            // window.location.href = link;
            menuDropdown.classList.remove('show');
        });
    });

    // Close menu-dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove('show');
            console.log('Menu closed due to outside click');
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