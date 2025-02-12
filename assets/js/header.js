document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const mobileMenuBtn = header.querySelector('.mobile-menu-btn');
    const navMenu = header.querySelector('.nav-menu');
    const dropdowns = header.querySelectorAll('.dropdown');

    // Dropdown menüleri kapat
    function closeDropdowns() {
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    }

    // Mobil menüyü kapat
    function closeMobileMenu() {
        header.classList.remove('menu-open');
        navMenu.classList.remove('active');
        closeDropdowns();
    }

    // Mobil menü kontrolü
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        header.classList.toggle('menu-open');
        navMenu.classList.toggle('active');
        
        if (!navMenu.classList.contains('active')) {
            closeDropdowns();
        }
    });

    // Dropdown kontrolü
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show');
                }
            });
            
            dropdown.classList.toggle('show');
        });

        // Dropdown menüsüne tıklandığında kapanmasını engelle
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        dropdownMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Sayfa scroll kontrolü
    let lastScroll = 0;
    let scrollTimer = null;

    window.addEventListener('scroll', () => {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
                closeMobileMenu();
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        }, 150);
    });

    // Sayfa dışı tıklama kontrolü
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            closeDropdowns();
            closeMobileMenu();
        }
    });

    // ESC tuşu kontrolü
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDropdowns();
            closeMobileMenu();
        }
    });

    // Pencere boyutu değişimi kontrolü
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}); 