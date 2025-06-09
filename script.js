document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');
    const nameInput = document.getElementById('name');
    const cardInput = document.getElementById('card');
    const addressInput = document.getElementById('address');
    const saveBtn = document.getElementById('save-profile');
    const loginError = document.getElementById('login-error');
    const notification = document.getElementById('notification');

    // Toggle profile info visibility
    function toggleProfileInfo(event) {
        event.preventDefault();
        profileInfo.classList.toggle('active');
    }

    profileBtn.addEventListener('click', toggleProfileInfo);

    // Close form if clicked outside
    document.addEventListener('click', (event) => {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    });

    // Handle save profile (login and store data)
    saveBtn.addEventListener('click', async () => {
        const name = nameInput.value.trim();
        const card = cardInput.value.trim();
        const address = addressInput.value.trim();
        const profile = {
            name: name,
            card: card,
            address: address,
            timestamp: new Date().toLocaleString('en-US')
        };

        if (name && card && address) {
            try {
                // Send login request
                const loginResponse = await fetch('backend/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: name, password: card })
                });
                const loginData = await loginResponse.json();

                if (loginResponse.ok && loginData.success) {
                    // Save profile if login succeeds
                    const profileResponse = await fetch('backend/profiles.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(profile)
                    });

                    if (profileResponse.ok) {
                        notification.classList.add('active');
                        setTimeout(() => notification.classList.remove('active'), 3000);
                        profileInfo.classList.remove('active');
                        nameInput.value = '';
                        cardInput.value = '';
                        addressInput.value = '';
                    } else {
                        throw new Error('Failed to save profile');
                    }
                } else {
                    loginError.style.display = 'block';
                    loginError.textContent = loginData.message || 'Invalid login credentials!';
                }
            } catch (error) {
                console.error('Error:', error);
                loginError.style.display = 'block';
                loginError.textContent = 'System error. Please try again!';
            }
        } else {
            loginError.style.display = 'block';
            loginError.textContent = 'Please fill in all fields!';
        }
    });

    // Menu Logic
    const menuBtn = document.querySelector('.menu');
    const menuDropdown = document.getElementById('menu-dropdown');

    menuBtn.addEventListener('click', () => {
        menuDropdown.classList.toggle('show');
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const link = item.dataset.link;
            if (link) window.location.href = link;
            menuDropdown.classList.remove('show');
        });
    });

    document.addEventListener('click', (event) => {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove('show');
        }
    });

    // Slideshow Logic
    let slideIndex = 0;
    let autoSlideTimeout;

    function showSlides() {
        let slides = document.querySelectorAll(".slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        slides[slideIndex].classList.add("active");
        slideIndex++;
        clearTimeout(autoSlideTimeout);
        autoSlideTimeout = setTimeout(showSlides, 3000);
    }

    window.changeSlide = function(n) {
        slideIndex += n;
        showSlides();
    };

    showSlides();
});