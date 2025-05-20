document.addEventListener('DOMContentLoaded', function () {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');

    // Xử lý khi nhấp vào nút profile
    profileBtn.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
        profileInfo.classList.toggle('active'); // Chuyển đổi trạng thái hiển thị
    });

    // Xử lý khi nhấp ra ngoài để đóng profile-info
    document.addEventListener('click', function (event) {
        if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    });
});