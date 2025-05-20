document.addEventListener('DOMContentLoaded', function () {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');

    // Hàm toggle hiển thị thông tin cá nhân
    function toggleProfileInfo(event) {
        event.preventDefault();
        event.stopPropagation();
        profileInfo.classList.toggle('active');
    }

    // Hàm đóng khi click/touch ra ngoài
    function closeProfileInfo(event) {
        if (
            profileInfo.classList.contains('active') &&
            !profileBtn.contains(event.target) &&
            !profileInfo.contains(event.target)
        ) {
            profileInfo.classList.remove('active');
        }
    }

    // Sự kiện click và touchstart trên nút avatar
    profileBtn.addEventListener('click', toggleProfileInfo);
    profileBtn.addEventListener('touchstart', toggleProfileInfo, { passive: false });

    // Sự kiện click và touchstart bên ngoài
    document.addEventListener('click', closeProfileInfo);
    document.addEventListener('touchstart', closeProfileInfo, { passive: false });

    // Load dữ liệu từ localStorage
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        const userData = JSON.parse(saved);
        document.getElementById('nameInput').value = userData.name || '';
        document.getElementById('cardInput').value = userData.card || '';
        document.getElementById('addressInput').value = userData.address || '';
    }

    // Lưu thông tin vào localStorage
    document.getElementById('saveProfileBtn').addEventListener('click', function () {
        const name = document.getElementById('nameInput').value.trim();
        const card = document.getElementById('cardInput').value.trim();
        const address = document.getElementById('addressInput').value.trim();

        const userData = { name, card, address };
        localStorage.setItem('userProfile', JSON.stringify(userData));
        alert('Thông tin đã được lưu!');
    });
});
