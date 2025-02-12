// Footer sınıfını oluşturuyoruz
class Footer {
    constructor() {
        this.initialize();
    }

    initialize() {
        document.addEventListener('DOMContentLoaded', () => {
            this.footer = document.querySelector('.footer');
            if (!this.footer) return;

            this.setupElements();
            this.addEventListeners();
            this.updateCopyrightYear();

            // Çerez yönetimi
            const cookieBanner = document.getElementById('cookie-banner');
            const acceptButton = document.getElementById('accept-cookies');
            const rejectButton = document.getElementById('reject-cookies');

            // Çerez tercihini kontrol et
            const checkCookiePreference = () => {
                const cookiePreference = localStorage.getItem('cookiePreference');
                if (cookiePreference) {
                    cookieBanner.style.display = 'none';
                } else {
                    cookieBanner.style.display = 'flex';
                }
            };

            // Çerez tercihini kaydet
            const setCookiePreference = (accepted) => {
                localStorage.setItem('cookiePreference', accepted ? 'accepted' : 'rejected');
                cookieBanner.style.opacity = '0';
                setTimeout(() => {
                    cookieBanner.style.display = 'none';
                }, 300);
            };

            // Event listeners
            acceptButton.addEventListener('click', () => {
                setCookiePreference(true);
            });

            rejectButton.addEventListener('click', () => {
                setCookiePreference(false);
            });

            // Sayfa yüklendiğinde çerez tercihini kontrol et
            checkCookiePreference();
        });
    }

    setupElements() {
        this.socialLinks = document.querySelectorAll('.social-links a');
        this.footerLinks = document.querySelectorAll('.footer-links a');
    }

    addEventListeners() {
        // Sosyal medya link efektleri
        this.socialLinks.forEach(link => {
            link.addEventListener('mouseenter', this.handleSocialHover);
            link.addEventListener('mouseleave', this.handleSocialHover);
        });

        // Smooth scroll
        this.footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                document.querySelector(targetId)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    handleSocialHover(e) {
        const icon = e.currentTarget.querySelector('i');
        if (e.type === 'mouseenter') {
            icon.style.transform = 'scale(1.2)';
        } else {
            icon.style.transform = 'scale(1)';
        }
    }

    updateCopyrightYear() {
        const copyrightElement = document.querySelector('.footer-bottom p');
        if (copyrightElement) {
            copyrightElement.innerHTML = `Görkem Ajans © ${new Date().getFullYear()} | <span>El Yapımı Tiny House ve Bugalov Evler</span>`;
        }
    }
}

new Footer(); 
