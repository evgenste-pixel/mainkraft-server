// ==========================================
//  СКРИПТ ДЛЯ КОПИРОВАНИЯ IP-АДРЕСА
// ==========================================

function copyToClipboard(text, buttonId) {
    // Создаем временный элемент textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    
    // Делаем его невидимым
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        // Копируем текст
        document.execCommand('copy');
        
        // Меняем текст кнопки для обратной связи
        const button = document.getElementById(buttonId);
        const originalText = button.innerText;
        
        button.innerText = '✅ Скопировано!';
        button.style.background = '#4CAF50';
        
        // Возвращаем исходный текст через 2 секунды
        setTimeout(() => {
            button.innerText = originalText;
            button.style.background = ''; // Возвращаем цвет из CSS
        }, 2000);
        
    } catch (err) {
        console.error('Ошибка копирования: ', err);
        alert('Не удалось скопировать. IP-адрес: ' + text);
    }
    
    // Удаляем временный элемент
    document.body.removeChild(textarea);
}

// ==========================================
//  ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
//  АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ПРИ СКРОЛЛЕ
// ==========================================
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам после загрузки страницы
window.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .price-card, .mode-item');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });
});
