document.addEventListener('DOMContentLoaded', function () {
    const profileBtn = document.querySelector('.profile-btn');
    const profileInfo = document.querySelector('.profile-info');

    // Hàm xử lý toggle profile-info
    function toggleProfileInfo(event) {
        event.stopPropagation(); // Ngăn sự kiện lan ra ngoài
        event.preventDefault(); // Ngăn hành vi mặc định (quan trọng trên mobile)
        profileInfo.classList.toggle('active');
    }

    // Gắn sự kiện click cho desktop
    profileBtn.addEventListener('click', toggleProfileInfo);

    // Gắn sự kiện touchstart cho mobile
    profileBtn.addEventListener('touchstart', toggleProfileInfo);

    // Đóng profile-info khi nhấp/touch ra ngoài
    document.addEventListener('click', function (event) {
        if (profileInfo.classList.contains('active') && 
            !profileBtn.contains(event.target) && 
            !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    });

    // Đóng profile-info khi touch ra ngoài (mobile)
    document.addEventListener('touchstart', function (event) {
        if (profileInfo.classList.contains('active') && 
            !profileBtn.contains(event.target) && 
            !profileInfo.contains(event.target)) {
            profileInfo.classList.remove('active');
        }
    });
});