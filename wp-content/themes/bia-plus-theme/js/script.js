document.addEventListener('DOMContentLoaded', () => {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');
    const nameInput = document.getElementById('name');
    const cardInput = document.getElementById('card');
    const addressInput = document.getElementById('address');
    const saveBtn = document.getElementById('save-profile');
    const notification = document.getElementById('notification');

    function toggleProfileInfo(event) {
        event.preventDefault();
        profileInfo.classList.toggle('active');
        console.log('Form hồ sơ:', profileInfo.classList.contains('active') ? 'mở' : 'đóng');
    }

    profileBtn.addEventListener('click', toggleProfileInfo);

    document.addEventListener('click', (event) => {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
            console.log('Form hồ sơ đóng do click bên ngoài');
        }
    });

    saveBtn.addEventListener('click', async () => {
        const profile = {
            name: nameInput.value.trim(),
            card: cardInput.value.trim(),
            address: addressInput.value.trim(),
            timestamp: new Date().toLocaleString('en-US')
        };

        if (profile.name && profile.card && profile.address) {
            try {
                const response = await fetch('index.php?action=save_profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(profile)
                });

                const result = await response.json();
                if (result.success) {
                    notification.classList.add('active');
                    notification.textContent = 'Thông tin của bạn đã được lưu!';
                    setTimeout(() => {
                        notification.classList.remove('active');
                    }, 3000);

                    profileInfo.classList.remove('active');
                    console.log('Lưu hồ sơ vào backend:', profile);
                } else {
                    throw new Error(result.message || 'Lưu thất bại');
                }
            } catch (error) {
                console.error('Lỗi khi lưu hồ sơ:', error);
                alert('Lưu hồ sơ thất bại. Vui lòng thử lại.');
            }
        } else {
            console.error('Xác thực thất bại: Vui lòng điền đầy đủ các trường');
            alert('Vui lòng điền đầy đủ các trường!');
        }
    });

    const menuBtn = document.querySelector('.menu');
    const menuDropdown = document.getElementById('menu-dropdown');

    menuBtn.addEventListener('click', () => {
        menuDropdown.classList.toggle('show');
        console.log('Menu:', menuDropdown.classList.contains('show') ? 'mở' : 'đóng');
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const link = item.dataset.link;
            console.log('Menu item clicked:', link);
            menuDropdown.classList.remove('show');
            window.location.href = link;
        });
    });

    document.addEventListener('click', (event) => {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove('show');
            console.log('Menu đóng do click bên ngoài');
        }
    });

    let slideIndex = 0;
    let autoSlideTimeout;

    function showSlides() {
        let slides = document.getElementsByClassName("slide");
        
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
        }
        
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        
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