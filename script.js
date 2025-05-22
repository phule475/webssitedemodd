// Wait for the document to load
document.addEventListener('DOMContentLoaded', function () {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');
    const nameInput = document.getElementById('name');
    const cardInput = document.getElementById('card');
    const addressInput = document.getElementById('address');
    const saveBtn = document.getElementById('save-profile');
    const notification = document.getElementById('notification');

    // Load data from localStorage
    const savedProfile = JSON.parse(localStorage.getItem('profileInfo'));
    if (savedProfile) {
        nameInput.value = savedProfile.name || '';
        cardInput.value = savedProfile.card || '';
        addressInput.value = savedProfile.address || '';
    }

    // Toggle profile-info visibility
    function toggleProfileInfo(event) {
        event.preventDefault();
        event.stopPropagation();
        profileInfo.classList.toggle('active');
    }

    profileBtn.addEventListener('click', toggleProfileInfo);
    profileBtn.addEventListener('touchstart', toggleProfileInfo, { passive: false });

    // Close profile-info if clicked or touched outside
    document.addEventListener('click', function (event) {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    });

    document.addEventListener('touchstart', function (event) {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    }, { passive: false });

    // Save to localStorage and show notification
    saveBtn.addEventListener('click', function () {
        const profile = {
            name: nameInput.value,
            card: cardInput.value,
            address: addressInput.value
        };
        localStorage.setItem('profileInfo', JSON.stringify(profile));
        profileInfo.classList.remove('active');

        // Show notification
        notification.classList.add('active');
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000); // Hide notification after 3 seconds
    });

    // Handle menu dropdown
    const menuBtn = document.querySelector('.menu');
    const menuDropdown = document.getElementById('menu-dropdown');

    menuBtn.addEventListener('click', function () {
        menuDropdown.classList.toggle('show');
    });

    // Handle clicks on menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function () {
            const link = this.dataset.link;
            // Perform navigation (optional)
            // window.location.href = link;
            menuDropdown.classList.remove('show');
        });
    });

    // Close menu-dropdown if clicked outside
    document.addEventListener('click', function (event) {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove('show');
        }
    });

    // Slideshow logic
    let slideIndex = 0;
    let autoSlideTimeout;
    showSlides();

    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1; }
        if (slideIndex < 1) { slideIndex = slides.length; }
        slides[slideIndex - 1].style.display = "block";
        autoSlideTimeout = setTimeout(showSlides, 10000); // Change image every 10 seconds
    }

    // Manual navigation with arrow buttons
    window.changeSlide = function(n) {
        clearTimeout(autoSlideTimeout); // Stop auto slideshow
        slideIndex += n - 1; // Adjust slideIndex for the next showSlides call
        showSlides(); // Show the new slide and restart auto slideshow
    };
});