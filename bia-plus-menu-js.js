document.addEventListener('DOMContentLoaded', () => {
    // Tạo overlay động
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.style.display = 'none';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.zIndex = '999';
    document.body.appendChild(overlay);

    document.querySelectorAll('.grid-item img').forEach(img => {
        const item = img.closest('.grid-item');
        const detailsInfo = item.querySelector('.details-info');

        // Sự kiện click cho desktop
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleItem(item, img, detailsInfo, overlay);
        });

        // Sự kiện touchstart cho mobile
        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleItem(item, img, detailsInfo, overlay);
        }, { passive: false });
    });

    // Hàm toggle trạng thái grid-item
    function toggleItem(item, img, detailsInfo, overlay) {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            img.classList.remove('enlarged');
            detailsInfo.style.display = 'none';
            overlay.style.display = 'none';
        } else {
            document.querySelectorAll('.grid-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherImg = otherItem.querySelector('img');
                const otherDetails = otherItem.querySelector('.details-info');
                otherImg.classList.remove('enlarged');
                otherDetails.style.display = 'none';
            });

            item.classList.add('active');
            img.classList.add('enlarged');
            detailsInfo.style.display = 'block';
            overlay.style.display = 'block';
        }
    }

    // Sự kiện nhấp vào overlay để đóng
    overlay.addEventListener('click', () => {
        document.querySelectorAll('.grid-item').forEach(item => {
            item.classList.remove('active');
            const img = item.querySelector('img');
            img.classList.remove('enlarged');
            item.querySelector('.details-info').style.display = 'none';
        });
        overlay.style.display = 'none';
    });

    overlay.addEventListener('touchend', (e) => {
        e.preventDefault();
        document.querySelectorAll('.grid-item').forEach(item => {
            item.classList.remove('active');
            const img = item.querySelector('img');
            img.classList.remove('enlarged');
            item.querySelector('.details-info').style.display = 'none';
        });
        overlay.style.display = 'none';
    }, { passive: false });
});