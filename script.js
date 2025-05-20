document.addEventListener('DOMContentLoaded', function () {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');
    const nameInput = document.getElementById('name');
    const cardInput = document.getElementById('card');
    const addressInput = document.getElementById('address');
    const saveBtn = document.getElementById('saveProfile');

    // Load data từ localStorage nếu có
    const savedProfile = JSON.parse(localStorage.getItem('profileInfo'));
    if (savedProfile) {
        nameInput.value = savedProfile.name || '';
        cardInput.value = savedProfile.card || '';
        addressInput.value = savedProfile.address || '';
    }

    // Hiện/ẩn profile
    function toggleProfileInfo(event) {
        event.preventDefault();
        event.stopPropagation();
        profileInfo.classList.toggle('active');
    }

    profileBtn.addEventListener('click', toggleProfileInfo);
    profileBtn.addEventListener('touchstart', toggleProfileInfo, { passive: false });

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

    // Lưu profile vào localStorage
    saveBtn.addEventListener('click', function () {
        const profile = {
            name: nameInput.value,
            card: cardInput.value,
            address: addressInput.value
        };
        localStorage.setItem('profileInfo', JSON.stringify(profile));
        alert('Đã lưu thông tin!');
        profileInfo.classList.remove('active');
    });

    // Xử lý menu xổ mượt
    const menuBtn = document.querySelector('.menu');
    const menuDropdown = document.getElementById('menuDropdown');

    menuBtn.addEventListener('click', function () {
        menuDropdown.classList.toggle('show');
    });

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function () {
            const link = this.dataset.link;
            alert('Chuyển đến: ' + link);
            // window.location.href = link; // thay bằng điều hướng thực
            menuDropdown.classList.remove('show');
        });
    });

    document.addEventListener('click', function (event) {
        if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
            menuDropdown.classList.remove('show');
        }
    });
});
