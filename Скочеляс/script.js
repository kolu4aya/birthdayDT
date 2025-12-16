// Установка текущей даты
function setCurrentDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    };
    const dateString = now.toLocaleDateString('ru-RU', options);
    document.getElementById('current-date').textContent = dateString;
}

// Установка текущего года
function setCurrentYear() {
    const year = new Date().getFullYear();
    document.getElementById('current-year').textContent = year;
}

// Анимация счетчиков
function animateCounters() {
    const counters = document.querySelectorAll('.number-value, .stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Запуск при появлении в viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Задувание свечей
function blowCandles() {
    const candles = document.querySelectorAll('.candle');
    const cakeMessage = document.querySelector('.cake-message p');
    
    candles.forEach(candle => {
        candle.style.animation = 'none';
        candle.style.opacity = '0.3';
    });
    
    cakeMessage.textContent = 'Спасибо! Свечи задуты! Давайте вместе загадаем желание ' +
                              'на следующие 79 лет процветания нашего Дома творчества!';
    
    // Создаём конфетти
    createConfetti();
}

// Создание конфетти
function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const colors = ['#D4AF37', '#E63946', '#1D3557', '#F1FAEE'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${color};
                left: ${Math.random() * 100}%;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confetti-fall ${Math.random() * 3 + 2}s linear;
                z-index: 1000;
            `;
            
            confettiContainer.appendChild(confetti);
            
            // Удаление через 5 секунд
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Добавление поздравления гостя
function addGuestWish() {
    const name = document.getElementById('guestName').value.trim();
    const role = document.getElementById('guestRole').value;
    const wish = document.getElementById('guestWish').value.trim();
    
    if (!name || !role || !wish) {
        alert('Пожалуйста, заполните все поля!');
        return;
    }
    
    const wishesWall = document.getElementById('wishesWall');
    const roleText = getRoleText(role);
    
    const wishCard = document.createElement('div');
    wishCard.className = 'wish-card animate__animated animate__fadeInUp';
    wishCard.innerHTML = `
        <div class="wish-header">
            <i class="fas fa-user-circle"></i>
            <div class="wish-author">
                <h4>${name}, ${roleText}</h4>
                <span class="wish-date">Только что</span>
            </div>
        </div>
        <div class="wish-text">
            <p>${wish}</p>
        </div>
    `;
    
    wishesWall.prepend(wishCard);
    
    // Очистка формы
    document.getElementById('guestName').value = '';
    document.getElementById('guestRole').value = '';
    document.getElementById('guestWish').value = '';
    
    // Показать уведомление
    showNotification('Спасибо за ваше поздравление к 79-летию!');
}

// Получение текста роли
function getRoleText(role) {
    const roles = {
        'graduate': 'выпускник',
        'parent': 'родитель',
        'teacher': 'педагог',
        'student': 'воспитанник',
        'guest': 'гость'
    };
    return roles[role] || 'гость';
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification animate__animated animate__fadeInUp';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Удаление через 5 секунд
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Анимация при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-milestone, .number-item, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    setCurrentYear();
    animateCounters();
    animateOnScroll();
    
    // Создать немного конфетти при загрузке
    setTimeout(createConfetti, 1000);
    setInterval(createConfetti, 10000);
});