document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Form doğrulama fonksiyonları
    const validators = {
        name: value => value.length >= 3 || 'İsim en az 3 karakter olmalıdır',
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Geçerli bir e-posta adresi giriniz',
        phone: value => /^[0-9]{10,11}$/.test(value.replace(/\D/g, '')) || 'Geçerli bir telefon numarası giriniz',
        message: value => value.length >= 10 || 'Mesajınız en az 10 karakter olmalıdır'
    };

    // Input doğrulama
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            const result = validators[input.id]?.(input.value.trim());
            
            if (typeof result === 'string') {
                input.classList.add('error');
                showError(input, result);
            } else {
                input.classList.remove('error');
                hideError(input);
            }
        });
    });

    // Hata mesajı gösterme/gizleme
    function showError(input, message) {
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            input.parentElement.insertBefore(errorDiv, input.nextSibling);
        }
        errorDiv.textContent = message;
    }

    function hideError(input) {
        const errorDiv = input.nextElementSibling;
        if (errorDiv?.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }

    // Form gönderimi
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Tüm alanları kontrol et
        let isValid = true;
        formInputs.forEach(input => {
            const result = validators[input.id]?.(input.value.trim());
            if (typeof result === 'string') {
                isValid = false;
                showError(input, result);
            }
        });

        if (!isValid) {
            showNotification('Lütfen tüm alanları doğru şekilde doldurunuz', 'error');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Gönderiliyor...';
        submitButton.disabled = true;

        try {
            // Form verilerini topla
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // API çağrısı simülasyonu
            await new Promise(resolve => setTimeout(resolve, 1000));

            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            contactForm.reset();

        } catch (error) {
            showNotification('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });

    // Bildirim gösterme
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);
        requestAnimationFrame(() => notification.classList.add('show'));

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}); 