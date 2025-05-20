function toggleProfileInfo(event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    const profileBtn = event.target.closest('.profile-btn');
    const profileInfo = profileBtn.nextElementSibling;
    profileInfo.classList.toggle('active');
}

document.addEventListener('click', function(event) {
    const profileInfo = document.querySelector('.profile-info');
    const profileBtn = document.querySelector('.profile-btn');
    if (!profileBtn.contains(event.target) && !profileInfo.contains(event.target) && profileInfo.classList.contains('active')) {
        profileInfo.classList.remove('active');
    }
});