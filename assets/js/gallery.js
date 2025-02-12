document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery-container');
    const images = gallery.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    document.body.appendChild(modal);

    // Lightbox özelliği
    const createLightbox = (image) => {
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${image.getAttribute('data-full')}" alt="${image.alt}">
                <button class="modal-close">&times;</button>
            </div>
        `;
        modal.classList.add('active');

        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    };

    // Görsel tıklama olayları
    images.forEach(image => {
        image.addEventListener('click', () => {
            createLightbox(image);
        });

        // Lazy loading
        if ('loading' in HTMLImageElement.prototype) {
            image.loading = 'lazy';
        }
    });

    // Masonry layout
    const masonryLayout = () => {
        const columns = 3;
        const gap = 20;
        const containerWidth = gallery.offsetWidth;
        const itemWidth = (containerWidth - (gap * (columns - 1))) / columns;

        images.forEach((image, index) => {
            image.style.width = `${itemWidth}px`;
            image.style.left = `${(index % columns) * (itemWidth + gap)}px`;
            image.style.top = `${Math.floor(index / columns) * (itemWidth + gap)}px`;
        });

        const lastRow = Math.floor((images.length - 1) / columns);
        gallery.style.height = `${(lastRow + 1) * (itemWidth + gap)}px`;
    };

    // Sayfa yüklendiğinde ve yeniden boyutlandırıldığında layout'u güncelle
    window.addEventListener('load', masonryLayout);
    window.addEventListener('resize', masonryLayout);

    // Görsel yükleme animasyonu
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    }, observerOptions);

    images.forEach(image => {
        imageObserver.observe(image);
    });
}); 