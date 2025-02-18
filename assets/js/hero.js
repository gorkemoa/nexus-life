document.addEventListener('DOMContentLoaded', function() {
    // Temel değişkenler
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    const SLIDE_INTERVAL_TIME = 5000;
    let isTransitioning = false;

    // Slayt gösterme fonksiyonu
    function showSlide(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        const activeSlide = document.querySelector('.slide.active');
        const activeDot = document.querySelector('.dot.active');
        
        activeSlide.classList.remove('active');
        activeDot.classList.remove('active');
        
        currentSlide = index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index;
        
        // Bir sonraki slaytı hazırla
        const nextSlide = slides[currentSlide];
        const nextDot = dots[currentSlide];

        // Görüntü önbelleğe alma
        const img = nextSlide.querySelector('img');
        if (img && !img.complete) {
            img.loading = 'eager';
        }

        // Geçiş efekti
        requestAnimationFrame(() => {
            nextSlide.classList.add('active');
            nextDot.classList.add('active');
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600); // CSS transition süresiyle eşleşmeli
        });
    }

    // Otomatik geçiş yönetimi
    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            if (!isTransitioning) {
                showSlide(currentSlide + 1);
            }
        }, SLIDE_INTERVAL_TIME);
    }

    // Olay dinleyicileri
    prevBtn?.addEventListener('click', () => {
        if (!isTransitioning) {
            showSlide(currentSlide - 1);
            startAutoSlide();
        }
    });

    nextBtn?.addEventListener('click', () => {
        if (!isTransitioning) {
            showSlide(currentSlide + 1);
            startAutoSlide();
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isTransitioning && currentSlide !== index) {
                showSlide(index);
                startAutoSlide();
            }
        });
    });

    // Slider hover kontrolü
    const slider = document.querySelector('.slider');
    slider?.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider?.addEventListener('mouseleave', startAutoSlide);

    // Hero içeriği için basit fade-in animasyonu
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }

    // Başlangıç
    startAutoSlide();

    // Paralaks scroll efekti
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled > 0) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        } else {
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.opacity = 1;
        }
    });

    // Hover efektleri için yardımcı fonksiyonlar
    const lerp = (start, end, factor) => {
        return start + (end - start) * factor;
    };

    // Mouse takibi efekti
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    function animate() {
        currentX = lerp(currentX, mouseX, 0.1);
        currentY = lerp(currentY, mouseY, 0.1);

        const tiltAmount = 5;
        const images = document.querySelectorAll('.image-container');
        
        images.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = (e.clientX - centerX) / rect.width;
            const distanceY = (e.clientY - centerY) / rect.height;
            
            img.style.transform = `
                perspective(1000px)
                rotateX(${distanceY * tiltAmount}deg)
                rotateY(${-distanceX * tiltAmount}deg)
                translateZ(10px)
            `;
        });

        requestAnimationFrame(animate);
    }

    animate();

    // Intersection Observer ile görünürlük kontrolü
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.image-container').forEach(container => {
        observer.observe(container);
    });

    // Dinamik gradient animasyonu
    let hue = 0;
    function updateGradient() {
        hue = (hue + 0.03) % 360;
        const color1 = `hsl(${hue}, 5%, 8%)`;
        const color2 = `hsl(${hue + 30}, 5%, 12%)`;
        const color3 = `hsl(${hue + 60}, 5%, 15%)`;
        
        const hero = document.querySelector('.hero');
        hero.style.background = `
            linear-gradient(135deg, 
                ${color1} 0%, 
                ${color2} 50%, 
                ${color3} 100%)
        `;
        
        requestAnimationFrame(updateGradient);
    }

    updateGradient();

    // Gelişmiş parıltı efekti
    const createGlowEffect = () => {
        const glow = document.createElement('div');
        glow.className = 'glow-effect';
        glow.style.cssText = `
            position: absolute;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, 
                rgba(201, 169, 89, 0.12) 0%, 
                rgba(201, 169, 89, 0.08) 30%,
                rgba(201, 169, 89, 0.02) 60%,
                transparent 80%);
            filter: blur(40px);
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            mix-blend-mode: screen;
        `;
        
        const hero = document.querySelector('.hero-section');
        hero.appendChild(glow);

        let glowX = 0, glowY = 0;
        let currentGlowX = 0, currentGlowY = 0;

        window.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            glowX = e.clientX - rect.left - 200;
            glowY = e.clientY - rect.top - 200;
            glow.style.opacity = '1';
        });

        function animateGlow() {
            currentGlowX += (glowX - currentGlowX) * 0.06;
            currentGlowY += (glowY - currentGlowY) * 0.06;
            glow.style.transform = `translate3d(${currentGlowX}px, ${currentGlowY}px, 0)`;
            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    };

    createGlowEffect();

    // Görüntüleri önceden yükle
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            const imageLoader = new Image();
            imageLoader.src = img.src;
        }
    });
}); 