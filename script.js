    document.addEventListener('DOMContentLoaded', function () {
        const profileBtn = document.querySelector('.profile-btn');
        const profileInfo = document.querySelector('.profile-info');
        const nameInput = document.getElementById('name');
        const cardInput = document.getElementById('card');
        const addressInput = document.getElementById('address');
        const saveBtn = document.getElementById('saveProfile');

        // Load dữ liệu từ localStorage
        const savedProfile = JSON.parse(localStorage.getItem('profileInfo'));
        if (savedProfile) {
            nameInput.value = savedProfile.name || '';
            cardInput.value = savedProfile.card || '';
            addressInput.value = savedProfile.address || '';
        }

        // Toggle profile-info
        function toggleProfileInfo(event) {
            event.preventDefault();
            event.stopPropagation();
            profileInfo.classList.toggle('active');
        }

        profileBtn.addEventListener('click', toggleProfileInfo);
        profileBtn.addEventListener('touchstart', toggleProfileInfo, { passive: false });

        // Đóng profile-info nếu click hoặc touch ra ngoài
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

        // Lưu vào localStorage mà không hiển thị alert
        saveBtn.addEventListener('click', function () {
            const profile = {
                name: nameInput.value,
                card: cardInput.value,
                address: addressInput.value
            };
            localStorage.setItem('profileInfo', JSON.stringify(profile));
            profileInfo.classList.remove('active'); // Ẩn sau khi lưu
        });

        // Xử lý menu xổ
        const menuBtn = document.querySelector('.menu');
        const menuDropdown = document.getElementById('menuDropdown');

        menuBtn.addEventListener('click', function () {
            menuDropdown.classList.toggle('show');
        });

        // Xử lý click vào các menu-item
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function () {
                const link = this.dataset.link;
                // Thực hiện điều hướng thật (tùy chọn)
                // window.location.href = link;
                menuDropdown.classList.remove('show'); // Ẩn menu sau khi chọn
            });
        });

        // Đóng menu-dropdown nếu click bên ngoài
        document.addEventListener('click', function (event) {
            if (!menuBtn.contains(event.target) && !menuDropdown.contains(event.target)) {
                menuDropdown.classList.remove('show');
            }
        });
    });
