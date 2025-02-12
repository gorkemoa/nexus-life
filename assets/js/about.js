// AOS başlatma
AOS.init({
    duration: 1200,
    once: true,
    offset: 100,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
});

document.addEventListener('DOMContentLoaded', function() {
    // Particles.js başlatma
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 20, density: { enable: true, value_area: 1000 } },
                color: { value: '#d4af37' },
                shape: { type: 'circle' },
                opacity: { 
                    value: 0.05,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.02, sync: false }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: { enable: true, speed: 1, size_min: 0.5, sync: false }
                },
                line_linked: {
                    enable: true,
                    distance: 200,
                    color: '#d4af37',
                    opacity: 0.05,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: true, rotateX: 600, rotateY: 1200 }
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
                        distance: 250,
                        line_linked: { opacity: 0.2 }
                    },
                    push: { particles_nb: 2 }
                }
            },
            retina_detect: true
        });
    }

    // Lüks sayaç animasyonu
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 3000;
        const startTime = performance.now();
        
        // Özel easing fonksiyonu
        const easeOutExpo = t => (t === 1) ? 1 : 1 - Math.pow(2, -10 * t);
        
        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.ceil(target * easeOutExpo(progress));
            counter.textContent = currentValue.toLocaleString('tr-TR');
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target.toLocaleString('tr-TR');
                
                // Sayı tamamlandığında altın parıltı efekti
                const wrapper = counter.closest('.counter-wrapper');
                wrapper.style.transition = 'all 0.5s ease';
                wrapper.style.textShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
                
                setTimeout(() => {
                    wrapper.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.2)';
                }, 500);
            }
        };
        
        requestAnimationFrame(updateCount);
    };

    // Intersection Observer ile sayaçları başlatma
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateCounter(entry.target);
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px'
    });

    counters.forEach(counter => observer.observe(counter));

    // Lüks kart efektleri
    const cards = document.querySelectorAll('.luxury-stat-card, .luxury-feature');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
            
            // Parıltı efekti
            const content = card.querySelector('.stat-content, .feature-content');
            const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0) 50%)`;
            content.style.backgroundImage = `${shine}, linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.2))`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
            
            const content = card.querySelector('.stat-content, .feature-content');
            content.style.backgroundImage = 'linear-gradient(to bottom right, rgba(0,0,0,0.4), rgba(0,0,0,0.2))';
        });
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}); 