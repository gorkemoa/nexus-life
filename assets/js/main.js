document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Yükleme göstergesi ekle
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = `
            <div class="loading-spinner"></div>
            <p class="loading-text">Yükleniyor...</p>
        `;
        document.body.appendChild(loadingIndicator);

        // Tüm bileşenleri paralel olarak yükle
        const components = [
            { id: 'header-container', path: '/components/header.html' },
            { id: 'featured-products-container', path: '/components/featured-products.html' },
            { id: 'about-container', path: '/components/about.html' },
            { id: 'gallery-container', path: '/components/gallery.html' },
            { id: 'contact-container', path: '/components/contact.html' },
            { id: 'footer-container', path: '/components/footer.html' }
        ];

        await Promise.all(components.map(async (component) => {
            await loadComponent(component.id, component.path);
            console.log(`${component.id} yüklendi`);
        }));

        // Tüm bileşenler yüklendikten sonra başlatmaları yap
        initializeAllSections();

        // Yükleme göstergesini kaldır
        loadingIndicator.style.opacity = '0';
        setTimeout(() => loadingIndicator.remove(), 500);

    } catch (error) {
        console.error('Bileşenler yüklenirken hata oluştu:', error);
        alert('Sayfa yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
    }
});

// Tüm bölümleri başlatma fonksiyonu
function initializeAllSections() {
    // AOS'u başlat
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });

    // Smooth scroll için event listener
    initializeSmoothScroll();
}

// Smooth scroll başlatma
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// About bölümü başlatma fonksiyonu
function initializeAboutSection() {
    // AOS'u başlat
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            once: true,
            offset: 150,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            disable: 'mobile'
        });
    }

    // Particles.js'i başlat
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        try {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#f6ecd8' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.1, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#f6ecd8',
                        opacity: 0.1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { 
                            distance: 140,
                            line_linked: { opacity: 0.3 }
                        }
                    }
                },
                retina_detect: true
            });
            console.log('Particles.js başarıyla başlatıldı');
        } catch (error) {
            console.error('Particles.js başlatılırken hata oluştu:', error);
        }
    } else {
        console.log('Particles.js veya particles-js elementi bulunamadı');
    }

    // Sayaçları başlat
    initializeCounters();
}

// Sayaçları başlatma fonksiyonu
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const speed = 300;
                    const increment = target / speed;

                    function updateCount() {
                        if (count < target) {
                            count += increment;
                            counter.textContent = Math.ceil(count).toLocaleString('tr-TR');
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.textContent = target.toLocaleString('tr-TR');
                        }
                    }

                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });

        counters.forEach(counter => observer.observe(counter));
    }
}

// Scroll olaylarını başlatma
function initializeScrollEvents() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        if (header) {
            const currentScroll = window.scrollY;
            
            // Header'ı güncelle
            if (currentScroll > 100) {
                header.style.backgroundColor = 'rgba(60, 59, 57, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = 'rgba(60, 59, 57, 1)';
                header.style.backdropFilter = 'none';
            }

            // Header'ı gizle/göster
            if (currentScroll > lastScroll && currentScroll > 500) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }
    });
}

// Galeri başlatma fonksiyonu
let galleryInitAttempts = 0;
const MAX_GALLERY_INIT_ATTEMPTS = 10;

function initGallery() {
    if (window.galleryInitialized) {
        console.log('Gallery already initialized');
        return;
    }

    if (typeof window.initializeGallery === 'function') {
        window.initializeGallery();
    } else {
        galleryInitAttempts++;
        if (galleryInitAttempts < MAX_GALLERY_INIT_ATTEMPTS) {
            console.log(`Gallery initialization attempt ${galleryInitAttempts} of ${MAX_GALLERY_INIT_ATTEMPTS}`);
            setTimeout(initGallery, 200);
        } else {
            console.error('Gallery initialization failed after maximum attempts');
        }
    }
}

// Bileşenleri yüklemek için yardımcı fonksiyon
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            if (containerId === 'gallery-container' && !window.galleryInitialized) {
                // Galeri bileşeni yüklendikten sonra script'i manuel olarak yükle
                if (!document.querySelector('script[src="assets/js/gallery.js"]')) {
                    const script = document.createElement('script');
                    script.src = 'assets/js/gallery.js';
                    script.onload = () => {
                        console.log('Gallery script loaded');
                        // DOM elementlerinin yüklenmesi için biraz bekle
                        setTimeout(() => {
                            if (!window.galleryInitialized && typeof window.initializeGallery === 'function') {
                                window.initializeGallery();
                            }
                        }, 300);
                    };
                    document.body.appendChild(script);
                }
            }
            if (containerId === 'about-container' && document.getElementById('particles-js')) {
                initializeAboutSection();
            }
        } else {
            console.error(`Container ${containerId} bulunamadı`);
        }
    } catch (error) {
        console.error(`${componentPath} yüklenirken hata oluştu:`, error);
        throw error;
    }
}

// Modal oluşturma fonksiyonu artık kullanılmıyor çünkü gallery.js'de tanımlandı
// function createModal() {
//     // Eski modal kodu kaldırıldı
// } 