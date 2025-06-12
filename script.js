document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');
    const nameInput = document.getElementById('name');
    const cardInput = document.getElementById('card');
    const addressInput = document.getElementById('address');
    const saveBtn = document.getElementById('save-profile');
    const loginError = document.getElementById('login-error');
    const notification = document.getElementById('notification');
    const menuIcons = document.querySelectorAll('.menu-icon');

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
            timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
        };

        if (name && card && address) {
            try {
                const loginResponse = await fetch('backend/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: name, password: card })
                });
                const loginData = await loginResponse.json();

                if (loginResponse.ok && loginData.success) {
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

    // New Menu Logic with active state
    function updateMenuState() {
        const scrollPosition = window.scrollY;
        const topBar = document.getElementById('top-bar').offsetTop;
        const slideshow = document.getElementById('slideshow-container').offsetTop;
        const menuSection = document.getElementById('menu-section').offsetTop;

        menuIcons.forEach(icon => {
            icon.classList.remove('active');
            icon.style.filter = 'brightness(0.5) invert(1)';
            icon.style.border = 'none';
        });

        if (scrollPosition < slideshow) {
            menuIcons[0].classList.add('active');
            menuIcons[0].style.filter = 'none';
            menuIcons[0].style.border = '2px solid #ffd700';
        } else if (scrollPosition < menuSection) {
            menuIcons[1].classList.add('active');
            menuIcons[1].style.filter = 'none';
            menuIcons[1].style.border = '2px solid #ffd700';
        } else {
            menuIcons[2].classList.add('active');
            menuIcons[2].style.filter = 'none';
            menuIcons[2].style.border = '2px solid #ffd700';
        }
    }

    menuIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            if (!icon.disabled) {
                const targetId = icon.getAttribute('data-target');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                setTimeout(updateMenuState, 500); // Update after scroll
            }
        });
    });

    window.addEventListener('scroll', updateMenuState);
    updateMenuState(); // Initial call

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