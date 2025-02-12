document.addEventListener('DOMContentLoaded', function() {
    // Slider elemanları
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Slider fonksiyonları
    function showSlide(index) {
        // Aktif slaytı kaldır
        document.querySelector('.slide.active').classList.remove('active');
        document.querySelector('.dot.active').classList.remove('active');
        
        // Yeni slayt indeksini ayarla
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        // Yeni slaytı aktif yap
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // Otomatik geçiş
    function startAutoSlide() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoSlide();
        });
    });

    // Mouse hover olayları
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);

    // Başlangıçta otomatik geçişi başlat
    startAutoSlide();

    // Hero içeriği animasyonu
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);

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
}); 