document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.grid-item img').forEach(img => {
        const item = img.closest('.grid-item');
        const detailsInfo = item.querySelector('.details-info');

        // Sự kiện click cho desktop
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleItem(item, img, detailsInfo);
        });

        // Sự kiện touchstart cho mobile
        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(item, img, detailsInfo);
        }, { passive: false });
    });

    // Hàm toggle trạng thái grid-item
    function toggleItem(item, img, detailsInfo) {
        if (item.classList.contains('active')) {
            // Đóng item nếu đang active
            item.classList.remove('active');
            img.classList.remove('enlarged');
            detailsInfo.style.display = 'none';
        } else {
            // Đóng tất cả các item khác
            document.querySelectorAll('.grid-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherImg = otherItem.querySelector('img');
                const otherDetails = otherItem.querySelector('.details-info');
                otherImg.classList.remove('enlarged');
                otherDetails.style.display = 'none';
            });

            // Kích hoạt item hiện tại
            item.classList.add('active');
            img.classList.add('enlarged');
            detailsInfo.style.display = 'block';
        }
    }

    // Sự kiện click/touch ra ngoài để đóng
    document.addEventListener('click', handleOutsideInteraction);
    document.addEventListener('touchstart', handleOutsideInteraction, { passive: false });

    function handleOutsideInteraction(e) {
        const activeItem = document.querySelector('.grid-item.active');
        if (!activeItem) return;

        const isClickInside = activeItem.contains(e.target);
        const isClickOnEnlargedImg = e.target.classList.contains('enlarged');
        const isClickOnDetails = e.target.closest('.details-info');

        // Đóng nếu nhấp ra ngoài
        if (!isClickInside && !isClickOnEnlargedImg && !isClickOnDetails) {
            document.querySelectorAll('.grid-item').forEach(item => {
                item.classList.remove('active');
                const img = item.querySelector('img');
                img.classList.remove('enlarged');
                item.querySelector('.details-info').style.display = 'none';
            });
        }
    }
});