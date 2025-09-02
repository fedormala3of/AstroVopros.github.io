// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;

// Отладочная информация
console.log('Script loaded');
console.log('Telegram WebApp:', tg);

// Элементы интерфейса
const spreadSelection = document.getElementById('spreadSelection');
const questionInput = document.getElementById('questionInput');
const readingResult = document.getElementById('readingResult');
const loading = document.getElementById('loading');
const questionText = document.getElementById('questionText');
const submitQuestion = document.getElementById('submitQuestion');
const submitWithAd = document.getElementById('submitWithAd');
const backToSpreads = document.getElementById('backToSpreads');
const newReading = document.getElementById('newReading');
const shareResult = document.getElementById('shareResult');
const interpretation = document.getElementById('interpretation');

// Новые элементы для рекламы
const earnCoinsBtn = document.getElementById('earnCoinsBtn');
const adSection = document.getElementById('adSection');
const earnCoinsSection = document.getElementById('earnCoinsSection');
const adTimer = document.getElementById('adTimer');
const adCountdown = document.getElementById('adCountdown');
const skipAdBtn = document.getElementById('skipAdBtn');
const watchAdBtn = document.getElementById('watchAdBtn');
const backToMainBtn = document.getElementById('backToMainBtn');

// Элементы для выбора карт
const cardSelection = document.getElementById('cardSelection');
const cardGrid = document.getElementById('cardGrid');
const selectedCards = document.getElementById('selectedCards');
const selectedCardsList = document.getElementById('selectedCardsList');
const confirmSelection = document.getElementById('confirmSelection');
const shuffleCards = document.getElementById('shuffleCards');
const backToQuestion = document.getElementById('backToQuestion');

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

// Переменные для рекламы
let adTimerInterval = null;
let adTimeLeft = 15;
let isWatchingAd = false;
let adReward = 50;

// Инициализация приложения
async function initApp() {
    console.log('Initializing app...');
    
    // Настраиваем Telegram Web App
    if (tg) {
        tg.ready();
        tg.expand();
        console.log('Telegram WebApp ready');
    } else {
        console.log('Telegram WebApp not available');
    }
    
    // Устанавливаем тему
    if (tg && tg.colorScheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Загружаем баланс пользователя
    await loadUserBalance();
    
    // Показываем главный экран
    showSpreadSelection();
    
    // Добавляем обработчики событий
    addEventListeners();
    console.log('Event listeners added');
    
    console.log('App initialized successfully');
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
    console.log('Adding event listeners...');
    
    // Выбор расклада
    const spreadCards = document.querySelectorAll('.spread-card');
    console.log('Found spread cards:', spreadCards.length);
    spreadCards.forEach(card => {
        card.addEventListener('click', () => {
            const spreadType = card.dataset.spread;
            console.log('Spread selected:', spreadType);
            selectSpread(spreadType);
        });
    });
    
    // Отправка вопроса
    if (submitQuestion) submitQuestion.addEventListener('click', submitQuestionHandler);
    if (submitWithAd) submitWithAd.addEventListener('click', submitWithAdHandler);
    
    // Кнопки навигации
    if (backToSpreads) backToSpreads.addEventListener('click', showSpreadSelection);
    if (newReading) newReading.addEventListener('click', showSpreadSelection);
    
    // Поделиться результатом
    if (shareResult) shareResult.addEventListener('click', shareResultHandler);
    
    // Кнопки рекламы
    if (earnCoinsBtn) earnCoinsBtn.addEventListener('click', showEarnCoinsSection);
    if (backToMainBtn) backToMainBtn.addEventListener('click', showSpreadSelection);
    if (skipAdBtn) skipAdBtn.addEventListener('click', skipAd);
    if (watchAdBtn) watchAdBtn.addEventListener('click', completeAd);
    
    // Кнопки статистики
const viewStatsBtn = document.getElementById('viewStatsBtn');
const exportStatsBtn = document.getElementById('exportStatsBtn');
const resetStatsBtn = document.getElementById('resetStatsBtn');
const backToEarnBtn = document.getElementById('backToEarnBtn');

if (viewStatsBtn) viewStatsBtn.addEventListener('click', showAdStats);
if (exportStatsBtn) exportStatsBtn.addEventListener('click', exportStats);
if (resetStatsBtn) resetStatsBtn.addEventListener('click', resetStats);
if (backToEarnBtn) backToEarnBtn.addEventListener('click', showEarnCoinsSection);
    
    // Кнопки выбора карт
    if (confirmSelection) confirmSelection.addEventListener('click', confirmCardSelection);
    if (shuffleCards) shuffleCards.addEventListener('click', shuffleCardGrid);
    if (backToQuestion) backToQuestion.addEventListener('click', showQuestionInput);
    
    // Обработчики для опций заработка
    document.querySelectorAll('.earn-option').forEach(option => {
        const button = option.querySelector('button');
        if (button) {
            button.addEventListener('click', () => {
                const coins = parseInt(option.dataset.coins);
                const type = option.querySelector('h3').textContent;
                handleEarnOption(type, coins);
            });
        }
    });
    
    // Enter для отправки вопроса
    if (questionText) {
        questionText.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submitQuestionHandler();
            }
        });
    }
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
        // Показываем выбор карт вместо автоматического гадания
        showCardSelection();
        
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

// ===== ФУНКЦИИ ДЛЯ РЕКЛАМЫ =====

// Показать секцию заработка монет
function showEarnCoinsSection() {
    hideAllSections();
    earnCoinsSection.style.display = 'block';
}

// Обработчик отправки вопроса за рекламу
function submitWithAdHandler() {
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
    
    // Показываем рекламу
    showAdSection();
}

// Показать секцию рекламы
function showAdSection() {
    hideAllSections();
    adSection.style.display = 'block';
    
    // Получаем рекламу из менеджера
    const ad = window.adManager.startAd();
    if (!ad) {
        showError('Реклама временно недоступна');
        showQuestionInput();
        return;
    }
    
    // Устанавливаем параметры рекламы
    adTimeLeft = ad.duration;
    adReward = ad.reward;
    isWatchingAd = true;
    
    // Обновляем отображение
    adTimer.textContent = adTimeLeft;
    adCountdown.textContent = adTimeLeft;
    
    // Обновляем информацию о награде
    const adInfo = adSection.querySelector('.ad-info p');
    if (adInfo) {
        adInfo.innerHTML = `🎁 За просмотр рекламы вы получите <strong>${adReward} монет</strong>`;
    }
    
    // Скрываем кнопку получения монет
    watchAdBtn.style.display = 'none';
    skipAdBtn.style.display = 'inline-block';
    
    // Запускаем таймер
    startAdTimer();
    
    // Добавляем обработчик клика по рекламе
    const adVideo = document.getElementById('adVideo');
    adVideo.addEventListener('click', () => {
        window.adManager.clickAd();
    });
}

// Запуск таймера рекламы
function startAdTimer() {
    adTimerInterval = setInterval(() => {
        adTimeLeft--;
        adTimer.textContent = adTimeLeft;
        adCountdown.textContent = adTimeLeft;
        
        if (adTimeLeft <= 0) {
            clearInterval(adTimerInterval);
            completeAdTimer();
        }
    }, 1000);
}

// Завершение таймера рекламы
function completeAdTimer() {
    isWatchingAd = false;
    watchAdBtn.style.display = 'inline-block';
    skipAdBtn.style.display = 'none';
    adCountdown.textContent = 'Готово!';
}

// Пропустить рекламу
function skipAd() {
    if (adTimerInterval) {
        clearInterval(adTimerInterval);
    }
    isWatchingAd = false;
    
    // Отмечаем пропуск в статистике
    window.adManager.skipAd();
    
    showError('Реклама пропущена. Для получения гадания нужны монеты.');
    showQuestionInput();
}

// Завершить просмотр рекламы
function completeAd() {
    if (adTimerInterval) {
        clearInterval(adTimerInterval);
    }
    
    // Получаем награду из менеджера
    const reward = window.adManager.completeAd();
    
    // Добавляем монеты
    const newBalance = userBalance + reward;
    updateBalance(newBalance);
    
    // Показываем успех
    showSuccess(`Получено ${reward} монет за просмотр рекламы!`);
    
    // Выполняем гадание
    setTimeout(() => {
        performReadingAfterAd();
    }, 1500);
}

// Выполнить гадание после просмотра рекламы
function performReadingAfterAd() {
    // Показываем выбор карт после просмотра рекламы
    showCardSelection();
}

// Обработка опций заработка
function handleEarnOption(type, coins) {
    switch (type) {
        case 'Просмотр рекламы':
            showAdSection();
            break;
        case 'Ежедневный бонус':
            // Проверяем, можно ли получить ежедневный бонус
            const lastDailyBonus = localStorage.getItem('lastDailyBonus');
            const today = new Date().toDateString();
            
            if (lastDailyBonus === today) {
                showError('Ежедневный бонус уже получен сегодня!');
                return;
            }
            
            // Выдаем бонус
            const newBalance = userBalance + coins;
            updateBalance(newBalance);
            localStorage.setItem('lastDailyBonus', today);
            showSuccess(`Получен ежедневный бонус: ${coins} монет!`);
            break;
        case 'Пригласить друга':
            // Поделиться ссылкой
            if (navigator.share) {
                navigator.share({
                    title: '🔮 Таро Мини-Апп',
                    text: 'Попробуй гадание на картах Таро!',
                    url: window.location.href
                }).then(() => {
                    const newBalance = userBalance + coins;
                    updateBalance(newBalance);
                    showSuccess(`Получено ${coins} монет за приглашение друга!`);
                });
            } else {
                // Fallback - копируем ссылку
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const newBalance = userBalance + coins;
                    updateBalance(newBalance);
                    showSuccess(`Ссылка скопирована! Получено ${coins} монет!`);
                });
            }
            break;
    }
}

// Скрыть все секции
function hideAllSections() {
    spreadSelection.style.display = 'none';
    questionInput.style.display = 'none';
    cardSelection.style.display = 'none';
    readingResult.style.display = 'none';
    loading.style.display = 'none';
    adSection.style.display = 'none';
    earnCoinsSection.style.display = 'none';
    adStatsSection.style.display = 'none';
}

// ===== ФУНКЦИИ ДЛЯ СТАТИСТИКИ =====

// Показать статистику рекламы
function showAdStats() {
    hideAllSections();
    adStatsSection.style.display = 'block';
    updateStatsDisplay();
}

// Обновить отображение статистики
function updateStatsDisplay() {
    const stats = window.adManager.getStats();
    
    document.getElementById('totalViews').textContent = stats.views;
    document.getElementById('totalCompletions').textContent = stats.completions;
    document.getElementById('totalClicks').textContent = stats.clicks;
    document.getElementById('totalSkips').textContent = stats.skips;
    
    document.getElementById('completionRate').textContent = stats.completionRate + '%';
    document.getElementById('clickRate').textContent = stats.clickRate + '%';
    document.getElementById('skipRate').textContent = stats.skipRate + '%';
}

// Экспорт статистики
function exportStats() {
    window.adManager.exportStats();
    showSuccess('Статистика экспортирована!');
}

// Сброс статистики
function resetStats() {
    if (confirm('Вы уверены, что хотите сбросить всю статистику? Это действие нельзя отменить.')) {
        window.adManager.resetStats();
        updateStatsDisplay();
        showSuccess('Статистика сброшена!');
    }
}

// ===== ФУНКЦИИ ДЛЯ ВЫБОРА КАРТ =====

// Показать секцию выбора карт
function showCardSelection() {
    hideAllSections();
    cardSelection.style.display = 'block';
    
    // Очищаем предыдущий выбор
    window.cardManager.clearSelection();
    updateSelectedCardsDisplay();
    
    // Загружаем карты
    loadCardGrid();
}

// Загрузить сетку карт
function loadCardGrid() {
    cardGrid.innerHTML = '';
    const cards = window.cardManager.getAllCards();
    
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        cardGrid.appendChild(cardElement);
    });
}

// Создать элемент карты
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-item';
    cardDiv.dataset.cardId = card.id;
    
    const img = document.createElement('img');
    img.src = card.imagePath;
    img.alt = card.name;
    img.onerror = function() {
        // Если изображение не загрузилось, показываем рубашку
        this.src = window.cardManager.cardBackImage;
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    overlay.innerHTML = '<span class="check-icon">✓</span>';
    
    cardDiv.appendChild(img);
    cardDiv.appendChild(overlay);
    
    // Обработчик клика
    cardDiv.addEventListener('click', () => {
        toggleCardSelection(card);
    });
    
    return cardDiv;
}

// Переключить выбор карты
function toggleCardSelection(card) {
    const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
    const requiredCards = spreads[currentSpread].cards;
    const currentSelected = window.cardManager.getSelectedCards().length;
    
    if (window.cardManager.isCardSelected(card.id)) {
        // Убираем карту из выбранных
        window.cardManager.removeCard(card.id);
        cardElement.classList.remove('selected');
    } else {
        // Добавляем карту в выбранные, если не превышен лимит
        if (currentSelected < requiredCards) {
            window.cardManager.selectCard(card);
            cardElement.classList.add('selected');
        } else {
            showError(`Можно выбрать только ${requiredCards} карт для этого расклада`);
        }
    }
    
    updateSelectedCardsDisplay();
    updateConfirmButton();
}

// Обновить отображение выбранных карт
function updateSelectedCardsDisplay() {
    selectedCardsList.innerHTML = '';
    const selectedCards = window.cardManager.getSelectedCards();
    
    selectedCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'selected-card-item';
        
        const img = document.createElement('img');
        img.src = card.imagePath;
        img.alt = card.name;
        img.onerror = function() {
            this.src = window.cardManager.cardBackImage;
        };
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeSelectedCard(card.id);
        });
        
        cardElement.appendChild(img);
        cardElement.appendChild(removeBtn);
        selectedCardsList.appendChild(cardElement);
    });
}

// Удалить выбранную карту
function removeSelectedCard(cardId) {
    window.cardManager.removeCard(cardId);
    
    // Обновляем отображение в сетке
    const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
    if (cardElement) {
        cardElement.classList.remove('selected');
    }
    
    updateSelectedCardsDisplay();
    updateConfirmButton();
}

// Обновить состояние кнопки подтверждения
function updateConfirmButton() {
    const requiredCards = spreads[currentSpread].cards;
    const selectedCount = window.cardManager.getSelectedCards().length;
    
    confirmSelection.disabled = selectedCount !== requiredCards;
    
    if (selectedCount === requiredCards) {
        confirmSelection.textContent = `✅ Подтвердить выбор (${selectedCount}/${requiredCards})`;
    } else {
        confirmSelection.textContent = `✅ Подтвердить выбор (${selectedCount}/${requiredCards})`;
    }
}

// Перемешать карты в сетке
function shuffleCardGrid() {
    loadCardGrid();
    showSuccess('Карты перемешаны!');
}

// Подтвердить выбор карт
function confirmCardSelection() {
    const selectedCards = window.cardManager.getSelectedCards();
    const requiredCards = spreads[currentSpread].cards;
    
    if (selectedCards.length !== requiredCards) {
        showError(`Выберите ровно ${requiredCards} карт для этого расклада`);
        return;
    }
    
    // Выполняем гадание с выбранными картами
    performReadingWithSelectedCards(selectedCards);
}

// Выполнить гадание с выбранными картами
function performReadingWithSelectedCards(selectedCards) {
    const question = questionText.value.trim();
    
    try {
        showLoading();
        
        // Создаем интерпретацию с выбранными картами
        setTimeout(() => {
            const interpretation = createInterpretationWithCards(selectedCards, question);
            const price = spreadPrices[currentSpread];
            const newBalance = userBalance - price;
            updateBalance(newBalance);
            showResult(interpretation);
        }, 2000);
        
    } catch (error) {
        console.error('Ошибка:', error);
        showError('Произошла ошибка при гадании. Попробуйте еще раз.');
        showCardSelection();
    }
}

// Создать интерпретацию с выбранными картами
function createInterpretationWithCards(selectedCards, question) {
    const spread = spreads[currentSpread];
    
    let interpretation = `🔮 Гадание: ${spread.name}\n\n`;
    interpretation += `❓ Вопрос: ${question}\n\n`;
    interpretation += `🎴 Выбранные карты:\n`;
    
    selectedCards.forEach((card, index) => {
        interpretation += `${index + 1}. ${card.name} - ${card.meaning}\n`;
    });
    
    interpretation += `\n💭 Общая интерпретация:\n`;
    interpretation += `Карты показывают, что в вашей ситуации ${getGeneralInterpretation(selectedCards)}`;
    
    return interpretation;
}

// Функция для общей интерпретации (из standalone.js)
function getGeneralInterpretation(cards) {
    const meanings = cards.map(card => card.meaning.toLowerCase());
    const positiveWords = ['любовь', 'успех', 'радость', 'надежда', 'гармония', 'богатство'];
    const negativeWords = ['боль', 'конфликт', 'потеря', 'страх', 'страдание', 'бедность'];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    meanings.forEach(meaning => {
        positiveWords.forEach(word => {
            if (meaning.includes(word)) positiveCount++;
        });
        negativeWords.forEach(word => {
            if (meaning.includes(word)) negativeCount++;
        });
    });
    
    if (positiveCount > negativeCount) {
        return 'преобладают позитивные энергии. Это хороший знак для вашего будущего.';
    } else if (negativeCount > positiveCount) {
        return 'есть некоторые сложности, но они временные. Сосредоточьтесь на решении проблем.';
    } else {
        return 'есть баланс между светлыми и темными сторонами. Прислушайтесь к своей интуиции.';
    }
}

