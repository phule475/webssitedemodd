document.addEventListener('DOMContentLoaded', () => {
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

    let timeoutId = null;

    document.querySelectorAll('.grid-item img').forEach(img => {
        const item = img.closest('.grid-item');
        const detailsInfo = item.querySelector('.details-info');

        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
                return;
            }

            timeoutId = setTimeout(() => {
                toggleItem(item, img, detailsInfo, overlay, true);
                timeoutId = null;
            }, 1000);
        });

        img.addEventListener('touchstart', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
                return;
            }

            timeoutId = setTimeout(() => {
                toggleItem(item, img, detailsInfo, overlay, true);
                timeoutId = null;
            }, 1000);
        }, { passive: false });
    });

    function toggleItem(item, img, detailsInfo, overlay, isEnlarging) {
        if (item.classList.contains('active')) {
            img.classList.add('zoom-out'); // Bắt đầu animation thu nhỏ
            setTimeout(() => {
                item.classList.remove('active');
                img.classList.remove('enlarged', 'zoom-out');
                detailsInfo.style.display = 'none';
                overlay.style.display = 'none';
            }, 500); // Độ dài animation (0.5s)
        } else if (isEnlarging) {
            document.querySelectorAll('.grid-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherImg = otherItem.querySelector('img');
                const otherDetails = otherItem.querySelector('.details-info');
                otherImg.classList.remove('enlarged', 'zoom-out');
                otherDetails.style.display = 'none';
            });

            item.classList.add('active');
            img.classList.add('enlarged');
            detailsInfo.style.display = 'block';
            overlay.style.display = 'block';
        }
    }

    overlay.addEventListener('click', () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }

        document.querySelectorAll('.grid-item').forEach(item => {
            const img = item.querySelector('img');
            img.classList.add('zoom-out');
            setTimeout(() => {
                item.classList.remove('active');
                img.classList.remove('enlarged', 'zoom-out');
                item.querySelector('.details-info').style.display = 'none';
            }, 500);
        });
        overlay.style.display = 'none';
    });

    overlay.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }

        document.querySelectorAll('.grid-item').forEach(item => {
            const img = item.querySelector('img');
            img.classList.add('zoom-out');
            setTimeout(() => {
                item.classList.remove('active');
                img.classList.remove('enlarged', 'zoom-out');
                item.querySelector('.details-info').style.display = 'none';
            }, 500);
        });
        overlay.style.display = 'none';
    }, { passive: false });

    document.addEventListener('click', (e) => {
        if (timeoutId && !e.target.closest('.grid-item')) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    });

    document.addEventListener('touchend', (e) => {
        if (timeoutId && !e.target.closest('.grid-item')) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    }, { passive: false });
}); 