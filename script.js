// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;

// Элементы интерфейса
const spreadSelection = document.getElementById('spreadSelection');
const questionInput = document.getElementById('questionInput');
const readingResult = document.getElementById('readingResult');
const loading = document.getElementById('loading');
const questionText = document.getElementById('questionText');
const submitQuestion = document.getElementById('submitQuestion');
const backToSpreads = document.getElementById('backToSpreads');
const newReading = document.getElementById('newReading');
const shareResult = document.getElementById('shareResult');
const interpretation = document.getElementById('interpretation');

// Текущий выбранный расклад
let currentSpread = null;

// Цены раскладов
const spreadPrices = {
    one_card: 50,
    three_cards: 100,
    celtic_cross: 200
};

// Текущий баланс пользователя
let userBalance = 1000;

// Инициализация приложения
async function initApp() {
    // Настраиваем Telegram Web App
    tg.ready();
    tg.expand();
    
    // Устанавливаем тему
    if (tg.colorScheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Загружаем баланс пользователя
    await loadUserBalance();
    
    // Показываем главный экран
    showSpreadSelection();
    
    // Добавляем обработчики событий
    addEventListeners();
}

// Загрузка баланса пользователя
async function loadUserBalance() {
    try {
        // Проверяем, есть ли автономные данные
        if (window.tarotData) {
            // Используем фиксированный баланс для автономной версии
            updateBalance(1000);
        } else {
            // Используем серверную версию
            const apiUrl = window.config ? window.config.getApiUrl() : '/api/balance';
            const response = await fetch(`${apiUrl}/api/balance`);
            if (response.ok) {
                const data = await response.json();
                updateBalance(data.balance);
            }
        }
    } catch (error) {
        console.error('Ошибка загрузки баланса:', error);
        // Используем значение по умолчанию
        updateBalance(1000);
    }
}

// Добавление обработчиков событий
function addEventListeners() {
    // Выбор расклада
    document.querySelectorAll('.spread-card').forEach(card => {
        card.addEventListener('click', () => {
            const spreadType = card.dataset.spread;
            selectSpread(spreadType);
        });
    });
    
    // Отправка вопроса
    submitQuestion.addEventListener('click', submitQuestionHandler);
    
    // Кнопки навигации
    backToSpreads.addEventListener('click', showSpreadSelection);
    newReading.addEventListener('click', showSpreadSelection);
    
    // Поделиться результатом
    shareResult.addEventListener('click', shareResultHandler);
    
    // Enter для отправки вопроса
    questionText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitQuestionHandler();
        }
    });
}

// Выбор расклада
function selectSpread(spreadType) {
    const price = spreadPrices[spreadType];
    
    // Проверяем баланс
    if (userBalance < price) {
        showError(`Недостаточно монет! Нужно ${price} монет для этого гадания.`);
        return;
    }
    
    currentSpread = spreadType;
    showQuestionInput();
}

// Обновление баланса
function updateBalance(newBalance) {
    userBalance = newBalance;
    document.getElementById('balanceAmount').textContent = newBalance;
}

// Проверка доступности раскладов
function updateSpreadAvailability() {
    document.querySelectorAll('.spread-card').forEach(card => {
        const spreadType = card.dataset.spread;
        const price = spreadPrices[spreadType];
        const priceElement = card.querySelector('.price');
        
        if (userBalance < price) {
            card.classList.add('disabled');
            priceElement.textContent = `Недостаточно монет (${price})`;
        } else {
            card.classList.remove('disabled');
            priceElement.textContent = `${price} монет`;
        }
    });
}

// Показать выбор расклада
function showSpreadSelection() {
    spreadSelection.style.display = 'block';
    questionInput.style.display = 'none';
    readingResult.style.display = 'none';
    loading.style.display = 'none';
    
    // Сброс формы
    questionText.value = '';
    currentSpread = null;
    
    // Обновляем доступность раскладов
    updateSpreadAvailability();
}

// Показать ввод вопроса
function showQuestionInput() {
    spreadSelection.style.display = 'none';
    questionInput.style.display = 'block';
    readingResult.style.display = 'none';
    loading.style.display = 'none';
    
    // Фокус на поле ввода
    questionText.focus();
}

// Показать загрузку
function showLoading() {
    spreadSelection.style.display = 'none';
    questionInput.style.display = 'none';
    readingResult.style.display = 'none';
    loading.style.display = 'block';
}

// Показать результат
function showResult(result) {
    spreadSelection.style.display = 'none';
    questionInput.style.display = 'none';
    readingResult.style.display = 'block';
    loading.style.display = 'none';
    
    // Отображаем результат
    interpretation.innerHTML = formatInterpretation(result);
}

// Обработчик отправки вопроса
async function submitQuestionHandler() {
    const question = questionText.value.trim();
    
    if (!question) {
        showError('Пожалуйста, введите ваш вопрос');
        return;
    }
    
    if (question.length < 10) {
        showError('Вопрос должен содержать минимум 10 символов');
        return;
    }
    
    if (question.length > 500) {
        showError('Вопрос слишком длинный. Максимум 500 символов');
        return;
    }
    
    try {
        showLoading();
        
        // Проверяем, есть ли автономные данные
        if (window.tarotData && window.tarotData.performReading) {
            // Используем автономную версию (для GitHub Pages)
            setTimeout(() => {
                const interpretation = window.tarotData.performReading(currentSpread, question);
                const price = spreadPrices[currentSpread];
                const newBalance = userBalance - price;
                updateBalance(newBalance);
                showResult(interpretation);
            }, 2000); // Имитируем загрузку
        } else {
            // Используем серверную версию (для локальной разработки)
            const apiUrl = window.config ? window.config.getApiUrl() : '/api/reading';
            const response = await fetch(`${apiUrl}/api/reading`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    spreadType: currentSpread,
                    question: question
                })
            });
            
            if (!response.ok) {
                throw new Error('Ошибка сервера');
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Обновляем баланс
                if (data.newBalance !== undefined) {
                    updateBalance(data.newBalance);
                }
                showResult(data.interpretation);
            } else {
                throw new Error(data.error || 'Ошибка гадания');
            }
        }
        
    } catch (error) {
        console.error('Ошибка:', error);
        showError('Произошла ошибка при гадании. Попробуйте еще раз.');
        showQuestionInput();
    }
}

// Форматирование результата гадания
function formatInterpretation(text) {
    // Разбиваем на строки и форматируем
    const lines = text.split('\n');
    let formatted = '';
    
    lines.forEach((line, index) => {
        if (line.trim()) {
            if (line.includes('🔮') || line.includes('❓') || line.includes('🎴') || line.includes('💭')) {
                formatted += `<h3 class="section-title">${line}</h3>`;
            } else if (line.match(/^\d+\./)) {
                formatted += `<div class="card-line" style="animation-delay: ${index * 0.1}s">${line}</div>`;
            } else {
                formatted += `<p class="interpretation-text" style="animation-delay: ${index * 0.1}s">${line}</p>`;
            }
        }
    });
    
    return formatted;
}

// Показать ошибку
function showError(message) {
    // Создаем уведомление об ошибке
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Удаляем через 3 секунды
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Поделиться результатом
function shareResultHandler() {
    if (navigator.share) {
        navigator.share({
            title: '🔮 Мое гадание на картах Таро',
            text: interpretation.textContent,
            url: window.location.href
        });
    } else {
        // Fallback для браузеров без поддержки Web Share API
        const text = interpretation.textContent;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showSuccess('Результат скопирован в буфер обмена!');
            });
        } else {
            // Старый способ
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showSuccess('Результат скопирован в буфер обмена!');
        }
    }
}

// Показать успешное уведомление
function showSuccess(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Добавляем стили для уведомлений
const style = document.createElement('style');
style.textContent = `
    .error-notification, .success-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }
    
    .error-notification {
        background: #e74c3c;
    }
    
    .success-notification {
        background: #27ae60;
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .card-line {
        background: rgba(102, 126, 234, 0.1);
        padding: 10px;
        border-radius: 8px;
        margin: 5px 0;
        border-left: 4px solid #667eea;
    }
    
    .dark-theme {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    }
    
    .dark-theme .spread-card,
    .dark-theme .interpretation {
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
    
    .dark-theme .spread-card h3 {
        color: #3498db;
    }
    
    .dark-theme .spread-card p {
        color: #bdc3c7;
    }
`;

document.head.appendChild(style);

// Запуск приложения
document.addEventListener('DOMContentLoaded', initApp);

// Обработка ошибок
window.addEventListener('error', (e) => {
    console.error('Ошибка приложения:', e.error);
    showError('Произошла неожиданная ошибка');
});

// Обработка необработанных промисов
window.addEventListener('unhandledrejection', (e) => {
    console.error('Необработанная ошибка промиса:', e.reason);
    showError('Ошибка соединения с сервером');
});

