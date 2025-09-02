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
            // Используем автономную версию (для GitHub Pages)
            updateBalance(1000);
        } else {
            // Пытаемся загрузить с сервера
            const apiUrl = window.config ? window.config.getApiUrl() : '';
            const response = await fetch(`${apiUrl}/api/balance`);
            if (response.ok) {
                const data = await response.json();
                updateBalance(data.balance);
            } else {
                throw new Error('Server not available');
            }
        }
    } catch (error) {
        console.log('Using default balance');
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
    if (submitQuestion) {
        submitQuestion.addEventListener('click', submitQuestionHandler);
        console.log('Submit question listener added');
    }
    if (submitWithAd) {
        submitWithAd.addEventListener('click', submitWithAdHandler);
        console.log('Submit with ad listener added');
    }
    
    // Кнопки навигации
    if (backToSpreads) {
        backToSpreads.addEventListener('click', showSpreadSelection);
        console.log('Back to spreads listener added');
    }
    if (newReading) {
        newReading.addEventListener('click', showSpreadSelection);
        console.log('New reading listener added');
    }
    
    // Поделиться результатом
    if (shareResult) {
        shareResult.addEventListener('click', shareResultHandler);
        console.log('Share result listener added');
    }
    
    // Кнопки рекламы
    if (earnCoinsBtn) {
        earnCoinsBtn.addEventListener('click', showEarnCoinsSection);
        console.log('Earn coins listener added');
    }
    if (backToMainBtn) {
        backToMainBtn.addEventListener('click', showSpreadSelection);
        console.log('Back to main listener added');
    }
    if (skipAdBtn) {
        skipAdBtn.addEventListener('click', skipAd);
        console.log('Skip ad listener added');
    }
    if (watchAdBtn) {
        watchAdBtn.addEventListener('click', completeAd);
        console.log('Watch ad listener added');
    }
    
    // Кнопки статистики
    const viewStatsBtn = document.getElementById('viewStatsBtn');
    const exportStatsBtn = document.getElementById('exportStatsBtn');
    const resetStatsBtn = document.getElementById('resetStatsBtn');
    const backToEarnBtn = document.getElementById('backToEarnBtn');

    if (viewStatsBtn) {
        viewStatsBtn.addEventListener('click', showAdStats);
        console.log('View stats listener added');
    }
    if (exportStatsBtn) {
        exportStatsBtn.addEventListener('click', exportStats);
        console.log('Export stats listener added');
    }
    if (resetStatsBtn) {
        resetStatsBtn.addEventListener('click', resetStats);
        console.log('Reset stats listener added');
    }
    if (backToEarnBtn) {
        backToEarnBtn.addEventListener('click', showEarnCoinsSection);
        console.log('Back to earn listener added');
    }
    
    // Кнопки выбора карт
    if (confirmSelection) {
        confirmSelection.addEventListener('click', confirmCardSelection);
        console.log('Confirm selection listener added');
    }
    if (shuffleCards) {
        shuffleCards.addEventListener('click', shuffleCardGrid);
        console.log('Shuffle cards listener added');
    }
    if (backToQuestion) {
        backToQuestion.addEventListener('click', showQuestionInput);
        console.log('Back to question listener added');
    }
    
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
        console.log('Question text listener added');
    }
    
    console.log('All event listeners added');
}

// Выбор расклада
function selectSpread(spreadType) {
    const price = spreadPrices[spreadType];
    
    if (userBalance < price) {
        showError(`Недостаточно монет. Нужно: ${price}, у вас: ${userBalance}`);
        return;
    }
    
    currentSpread = spreadType;
    showQuestionInput();
}

// Показать секцию выбора расклада
function showSpreadSelection() {
    hideAllSections();
    spreadSelection.style.display = 'block';
    updateSpreadAvailability();
}

// Показать секцию ввода вопроса
function showQuestionInput() {
    hideAllSections();
    questionInput.style.display = 'block';
    questionText.value = '';
}

// Показать секцию результата
function showResult(interpretationText) {
    hideAllSections();
    readingResult.style.display = 'block';
    interpretation.innerHTML = formatInterpretation(interpretationText);
}

// Показать загрузку
function showLoading() {
    hideAllSections();
    loading.style.display = 'block';
}

// Обновить баланс
function updateBalance(newBalance) {
    userBalance = newBalance;
    const balanceElement = document.getElementById('balanceAmount');
    if (balanceElement) {
        balanceElement.textContent = newBalance;
    }
}

// Обновить доступность раскладов
function updateSpreadAvailability() {
    document.querySelectorAll('.spread-card').forEach(card => {
        const spreadType = card.dataset.spread;
        const price = spreadPrices[spreadType];
        
        if (userBalance < price) {
            card.classList.add('disabled');
        } else {
            card.classList.remove('disabled');
        }
    });
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
                formatted += `<h3 class="section-title" style="animation-delay: ${index * 0.1}s">${line}</h3>`;
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
    alert(message);
}

// Показать успех
function showSuccess(message) {
    alert(message);
}

// Поделиться результатом
function shareResultHandler() {
    if (navigator.share) {
        navigator.share({
            title: '🔮 Результат гадания на картах Таро',
            text: interpretation.textContent,
            url: window.location.href
        });
    } else {
        // Fallback - копируем текст
        navigator.clipboard.writeText(interpretation.textContent).then(() => {
            showSuccess('Результат скопирован в буфер обмена!');
        });
    }
}

// Скрыть все секции
function hideAllSections() {
    if (spreadSelection) spreadSelection.style.display = 'none';
    if (questionInput) questionInput.style.display = 'none';
    if (cardSelection) cardSelection.style.display = 'none';
    if (readingResult) readingResult.style.display = 'none';
    if (loading) loading.style.display = 'none';
    if (adSection) adSection.style.display = 'none';
    if (earnCoinsSection) earnCoinsSection.style.display = 'none';
    if (document.getElementById('adStatsSection')) {
        document.getElementById('adStatsSection').style.display = 'none';
    }
}

// ===== ФУНКЦИИ ДЛЯ РЕКЛАМЫ =====

// Показать секцию заработка монет
function showEarnCoinsSection() {
    hideAllSections();
    if (earnCoinsSection) {
        earnCoinsSection.style.display = 'block';
    }
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
    if (adSection) {
        adSection.style.display = 'block';
        
        // Получаем рекламу из менеджера
        const ad = window.adManager ? window.adManager.startAd() : null;
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
        if (adTimer) adTimer.textContent = adTimeLeft;
        if (adCountdown) adCountdown.textContent = adTimeLeft;
        
        // Обновляем информацию о награде
        const adInfo = adSection.querySelector('.ad-info p');
        if (adInfo) {
            adInfo.innerHTML = `🎁 За просмотр рекламы вы получите <strong>${adReward} монет</strong>`;
        }
        
        // Скрываем кнопку получения монет
        if (watchAdBtn) watchAdBtn.style.display = 'none';
        if (skipAdBtn) skipAdBtn.style.display = 'inline-block';
        
        // Запускаем таймер
        startAdTimer();
        
        // Добавляем обработчик клика по рекламе
        const adVideo = document.getElementById('adVideo');
        if (adVideo) {
            adVideo.addEventListener('click', () => {
                if (window.adManager) {
                    window.adManager.clickAd();
                }
            });
        }
    }
}

// Запуск таймера рекламы
function startAdTimer() {
    adTimerInterval = setInterval(() => {
        adTimeLeft--;
        if (adTimer) adTimer.textContent = adTimeLeft;
        if (adCountdown) adCountdown.textContent = adTimeLeft;
        
        if (adTimeLeft <= 0) {
            clearInterval(adTimerInterval);
            completeAdTimer();
        }
    }, 1000);
}

// Завершение таймера рекламы
function completeAdTimer() {
    isWatchingAd = false;
    if (watchAdBtn) watchAdBtn.style.display = 'inline-block';
    if (skipAdBtn) skipAdBtn.style.display = 'none';
    if (adCountdown) adCountdown.textContent = 'Готово!';
}

// Пропустить рекламу
function skipAd() {
    if (adTimerInterval) {
        clearInterval(adTimerInterval);
    }
    isWatchingAd = false;
    
    // Отмечаем пропуск в статистике
    if (window.adManager) {
        window.adManager.skipAd();
    }
    
    showError('Реклама пропущена. Для получения гадания нужны монеты.');
    showQuestionInput();
}

// Завершить просмотр рекламы
function completeAd() {
    if (adTimerInterval) {
        clearInterval(adTimerInterval);
    }
    
    // Получаем награду из менеджера
    const reward = window.adManager ? window.adManager.completeAd() : adReward;
    
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

// ===== ФУНКЦИИ ДЛЯ СТАТИСТИКИ =====

// Показать статистику рекламы
function showAdStats() {
    hideAllSections();
    const adStatsSection = document.getElementById('adStatsSection');
    if (adStatsSection) {
        adStatsSection.style.display = 'block';
        updateStatsDisplay();
    }
}

// Обновить отображение статистики
function updateStatsDisplay() {
    if (!window.adManager) return;
    
    const stats = window.adManager.getStats();
    
    const totalViews = document.getElementById('totalViews');
    const totalCompletions = document.getElementById('totalCompletions');
    const totalClicks = document.getElementById('totalClicks');
    const totalSkips = document.getElementById('totalSkips');
    const completionRate = document.getElementById('completionRate');
    const clickRate = document.getElementById('clickRate');
    const skipRate = document.getElementById('skipRate');
    
    if (totalViews) totalViews.textContent = stats.views;
    if (totalCompletions) totalCompletions.textContent = stats.completions;
    if (totalClicks) totalClicks.textContent = stats.clicks;
    if (totalSkips) totalSkips.textContent = stats.skips;
    if (completionRate) completionRate.textContent = stats.completionRate + '%';
    if (clickRate) clickRate.textContent = stats.clickRate + '%';
    if (skipRate) skipRate.textContent = stats.skipRate + '%';
}

// Экспорт статистики
function exportStats() {
    if (window.adManager) {
        window.adManager.exportStats();
        showSuccess('Статистика экспортирована!');
    }
}

// Сброс статистики
function resetStats() {
    if (confirm('Вы уверены, что хотите сбросить всю статистику? Это действие нельзя отменить.')) {
        if (window.adManager) {
            window.adManager.resetStats();
            updateStatsDisplay();
            showSuccess('Статистика сброшена!');
        }
    }
}

// ===== ФУНКЦИИ ДЛЯ ВЫБОРА КАРТ =====

// Показать секцию выбора карт
function showCardSelection() {
    hideAllSections();
    if (cardSelection) {
        cardSelection.style.display = 'block';
        
        // Очищаем предыдущий выбор
        if (window.cardManager) {
            window.cardManager.clearSelection();
        }
        updateSelectedCardsDisplay();
        
        // Загружаем карты
        loadCardGrid();
    }
}

// Загрузить сетку карт
function loadCardGrid() {
    if (!cardGrid) return;
    
    cardGrid.innerHTML = '';
    
    if (window.cardManager) {
        const cards = window.cardManager.getAllCards();
        cards.forEach(card => {
            const cardElement = createCardElement(card);
            cardGrid.appendChild(cardElement);
        });
    } else {
        // Fallback - показываем сообщение
        cardGrid.innerHTML = '<p>Карты загружаются...</p>';
    }
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
        this.src = window.cardManager ? window.cardManager.cardBackImage : 'img/Рубашка.png';
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
    if (!window.cardManager) return;
    
    const cardElement = document.querySelector(`[data-card-id="${card.id}"]`);
    const requiredCards = window.spreads ? window.spreads[currentSpread].cards : 1;
    const currentSelected = window.cardManager.getSelectedCards().length;
    
    if (window.cardManager.isCardSelected(card.id)) {
        // Убираем карту из выбранных
        window.cardManager.removeCard(card.id);
        if (cardElement) cardElement.classList.remove('selected');
    } else {
        // Добавляем карту в выбранные, если не превышен лимит
        if (currentSelected < requiredCards) {
            window.cardManager.selectCard(card);
            if (cardElement) cardElement.classList.add('selected');
        } else {
            showError(`Можно выбрать только ${requiredCards} карт для этого расклада`);
        }
    }
    
    updateSelectedCardsDisplay();
    updateConfirmButton();
}

// Обновить отображение выбранных карт
function updateSelectedCardsDisplay() {
    if (!selectedCardsList || !window.cardManager) return;
    
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
    if (!window.cardManager) return;
    
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
    if (!confirmSelection || !window.cardManager) return;
    
    const requiredCards = window.spreads ? window.spreads[currentSpread].cards : 1;
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
    if (!window.cardManager) return;
    
    const selectedCards = window.cardManager.getSelectedCards();
    const requiredCards = window.spreads ? window.spreads[currentSpread].cards : 1;
    
    if (selectedCards.length !== requiredCards) {
        showError(`Выберите ровно ${requiredCards} карт для этого расклада`);
        return;
    }
    
    // Выполняем гадание с выбранными картами
    performReadingWithSelectedCards(selectedCards);
}

// Выполнить гадание с выбранными картами
function performReadingWithSelectedCards(selectedCards) {
    const question = questionText ? questionText.value.trim() : '';
    
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
    const spread = window.spreads ? window.spreads[currentSpread] : { name: 'Расклад' };
    
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

// Функция для общей интерпретации
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    initApp();
});

// Fallback инициализация
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
