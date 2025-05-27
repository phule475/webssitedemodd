document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.grid-item').forEach(item => {
        const img = item.querySelector('img');
        const detailsInfo = item.querySelector('.details-info');

        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn chặn sự kiện lan ra document
            if (!item.classList.contains('active')) {
                // Đóng tất cả các item khác trước khi mở item mới
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
        });

        // Thoát chế độ phóng to khi nhấp ra ngoài
        document.addEventListener('click', (e) => {
            const activeItem = document.querySelector('.grid-item.active');
            const enlargedImg = document.querySelector('img.enlarged');

            if (activeItem) {
                const isClickOutside = !activeItem.contains(e.target) && (!enlargedImg || !enlargedImg.contains(e.target));
                if (isClickOutside) {
                    document.querySelectorAll('.grid-item').forEach(item => {
                        item.classList.remove('active');
                        const img = item.querySelector('img');
                        img.classList.remove('enlarged');
                        item.querySelector('.details-info').style.display = 'none';
                    });
                }
            }
        });

        // Thoát chế độ phóng to trên mobile khi nhấp ra ngoài
        document.addEventListener('touchstart', (e) => {
            const activeItem = document.querySelector('.grid-item.active');
            const enlargedImg = document.querySelector('img.enlarged');

            if (activeItem) {
                const isClickOutside = !activeItem.contains(e.target) && (!enlargedImg || !enlargedImg.contains(e.target));
                if (isClickOutside) {
                    document.querySelectorAll('.grid-item').forEach(item => {
                        item.classList.remove('active');
                        const img = item.querySelector('img');
                        img.classList.remove('enlarged');
                        item.querySelector('.details-info').style.display = 'none';
                    });
                }
            }
        });
    });
});