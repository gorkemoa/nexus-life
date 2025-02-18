// Performans için throttle fonksiyonu
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// DOM elementlerini önbelleğe alma
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('#lightbox-img');
const lightboxTitle = lightbox.querySelector('.lightbox-details h3');
const lightboxDesc = lightbox.querySelector('.lightbox-details p');
const closeBtn = document.querySelector('.close-btn');

// Intersection Observer için options
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

// Resimleri lazy load etmek için Intersection Observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target.querySelector('img');
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Gallery item'ları observe etme
galleryItems.forEach(item => {
    imageObserver.observe(item);
    
    // Click event listener'ı
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.item-title');
        const desc = item.querySelector('.item-description');

        requestAnimationFrame(() => {
            lightboxImg.src = img.src;
            lightboxTitle.textContent = title.textContent;
            lightboxDesc.textContent = desc.textContent;
            lightbox.style.display = 'block';
            setTimeout(() => lightbox.classList.add('show'), 50);
        });
    });
});

// Lightbox kapatma fonksiyonu
const closeLightbox = () => {
    lightbox.classList.remove('show');
    setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = '';
    }, 300);
};

// Event listener'lar
closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Escape tuşu ile kapatma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
    }
});

// Scroll performansı için throttle
const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    document.documentElement.style.setProperty('--scroll-y', `${scrolled}px`);
}, 100);

window.addEventListener('scroll', handleScroll);

// AOS (Animate on Scroll) ayarları
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        offset: 50,
        once: true,
        disable: 'mobile'
    });
} 