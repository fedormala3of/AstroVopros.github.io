const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// Импортируем конфигурацию
const config = require('./config.js');

// Конфигурация бота
const botConfig = {
    token: config.telegram.token,
    webAppUrl: config.telegram.webAppUrl, // URL вашего мини-приложения
    port: process.env.PORT || 3000
};

// Создаем экземпляр бота
const bot = new TelegramBot(botConfig.token, { polling: true });

// Колода карт Таро (78 карт)
const tarotCards = [
    // Старшие Арканы (22 карты)
    { name: 'Шут', meaning: 'Начало пути, свобода, приключения', type: 'major', number: 0 },
    { name: 'Маг', meaning: 'Сила воли, мастерство, новые возможности', type: 'major', number: 1 },
    { name: 'Верховная Жрица', meaning: 'Интуиция, тайны, внутренняя мудрость', type: 'major', number: 2 },
    { name: 'Императрица', meaning: 'Плодородие, изобилие, материнство', type: 'major', number: 3 },
    { name: 'Император', meaning: 'Власть, авторитет, структура', type: 'major', number: 4 },
    { name: 'Иерофант', meaning: 'Традиции, духовность, обучение', type: 'major', number: 5 },
    { name: 'Влюбленные', meaning: 'Любовь, выбор, гармония', type: 'major', number: 6 },
    { name: 'Колесница', meaning: 'Движение, прогресс, контроль', type: 'major', number: 7 },
    { name: 'Сила', meaning: 'Внутренняя сила, мужество, терпение', type: 'major', number: 8 },
    { name: 'Отшельник', meaning: 'Самоанализ, одиночество, мудрость', type: 'major', number: 9 },
    { name: 'Колесо Фортуны', meaning: 'Изменения, судьба, циклы', type: 'major', number: 10 },
    { name: 'Справедливость', meaning: 'Баланс, справедливость, правда', type: 'major', number: 11 },
    { name: 'Повешенный', meaning: 'Жертва, новый взгляд, пауза', type: 'major', number: 12 },
    { name: 'Смерть', meaning: 'Конец, трансформация, новое начало', type: 'major', number: 13 },
    { name: 'Умеренность', meaning: 'Баланс, гармония, терпение', type: 'major', number: 14 },
    { name: 'Дьявол', meaning: 'Искушения, привязанности, темная сторона', type: 'major', number: 15 },
    { name: 'Башня', meaning: 'Внезапные изменения, разрушение, откровения', type: 'major', number: 16 },
    { name: 'Звезда', meaning: 'Надежда, вдохновение, вера', type: 'major', number: 17 },
    { name: 'Луна', meaning: 'Интуиция, иллюзии, подсознание', type: 'major', number: 18 },
    { name: 'Солнце', meaning: 'Радость, успех, жизненная сила', type: 'major', number: 19 },
    { name: 'Суд', meaning: 'Возрождение, призыв, трансформация', type: 'major', number: 20 },
    { name: 'Мир', meaning: 'Завершение, достижение, гармония', type: 'major', number: 21 },
    
    // Младшие Арканы - Кубки (14 карт)
    { name: 'Туз Кубков', meaning: 'Новые эмоции, любовь, творчество', type: 'minor', suit: 'cups', number: 1 },
    { name: 'Двойка Кубков', meaning: 'Партнерство, гармония, единство', type: 'minor', suit: 'cups', number: 2 },
    { name: 'Тройка Кубков', meaning: 'Празднование, дружба, радость', type: 'minor', suit: 'cups', number: 3 },
    { name: 'Четверка Кубков', meaning: 'Апатия, усталость, неудовлетворенность', type: 'minor', suit: 'cups', number: 4 },
    { name: 'Пятерка Кубков', meaning: 'Потеря, разочарование, горе', type: 'minor', suit: 'cups', number: 5 },
    { name: 'Шестерка Кубков', meaning: 'Ностальгия, детские воспоминания, невинность', type: 'minor', suit: 'cups', number: 6 },
    { name: 'Семерка Кубков', meaning: 'Выбор, иллюзии, возможности', type: 'minor', suit: 'cups', number: 7 },
    { name: 'Восьмерка Кубков', meaning: 'Уход, поиск, перемены', type: 'minor', suit: 'cups', number: 8 },
    { name: 'Девятка Кубков', meaning: 'Удовлетворение, изобилие, успех', type: 'minor', suit: 'cups', number: 9 },
    { name: 'Десятка Кубков', meaning: 'Семейное счастье, гармония, любовь', type: 'minor', suit: 'cups', number: 10 },
    { name: 'Паж Кубков', meaning: 'Новости, творчество, мечты', type: 'minor', suit: 'cups', court: 'page' },
    { name: 'Рыцарь Кубков', meaning: 'Романтика, предложения, эмоции', type: 'minor', suit: 'cups', court: 'knight' },
    { name: 'Королева Кубков', meaning: 'Заботливость, интуиция, сострадание', type: 'minor', suit: 'cups', court: 'queen' },
    { name: 'Король Кубков', meaning: 'Эмоциональная зрелость, мудрость, спокойствие', type: 'minor', suit: 'cups', court: 'king' },
    
    // Младшие Арканы - Мечи (14 карт)
    { name: 'Туз Мечей', meaning: 'Ясность, правда, прорыв', type: 'minor', suit: 'swords', number: 1 },
    { name: 'Двойка Мечей', meaning: 'Выбор, баланс, тупик', type: 'minor', suit: 'swords', number: 2 },
    { name: 'Тройка Мечей', meaning: 'Боль, разбитое сердце, страдание', type: 'minor', suit: 'swords', number: 3 },
    { name: 'Четверка Мечей', meaning: 'Отдых, восстановление, медитация', type: 'minor', suit: 'swords', number: 4 },
    { name: 'Пятерка Мечей', meaning: 'Поражение, конфликт, потеря', type: 'minor', suit: 'swords', number: 5 },
    { name: 'Шестерка Мечей', meaning: 'Переход, путешествие, изменения', type: 'minor', suit: 'swords', number: 6 },
    { name: 'Семерка Мечей', meaning: 'Обман, скрытность, стратегия', type: 'minor', suit: 'swords', number: 7 },
    { name: 'Восьмерка Мечей', meaning: 'Ловушка, ограничения, беспомощность', type: 'minor', suit: 'swords', number: 8 },
    { name: 'Девятка Мечей', meaning: 'Тревога, страх, кошмары', type: 'minor', suit: 'swords', number: 9 },
    { name: 'Десятка Мечей', meaning: 'Конец, предательство, боль', type: 'minor', suit: 'swords', number: 10 },
    { name: 'Паж Мечей', meaning: 'Новости, идеи, обучение', type: 'minor', suit: 'swords', court: 'page' },
    { name: 'Рыцарь Мечей', meaning: 'Действие, конфликт, решительность', type: 'minor', suit: 'swords', court: 'knight' },
    { name: 'Королева Мечей', meaning: 'Независимость, ясность, прямота', type: 'minor', suit: 'swords', court: 'queen' },
    { name: 'Король Мечей', meaning: 'Интеллект, логика, авторитет', type: 'minor', suit: 'swords', court: 'king' },
    
    // Младшие Арканы - Пентакли (14 карт)
    { name: 'Туз Пентаклей', meaning: 'Новые возможности, богатство, потенциал', type: 'minor', suit: 'pentacles', number: 1 },
    { name: 'Двойка Пентаклей', meaning: 'Баланс, адаптация, гибкость', type: 'minor', suit: 'pentacles', number: 2 },
    { name: 'Тройка Пентаклей', meaning: 'Сотрудничество, мастерство, обучение', type: 'minor', suit: 'pentacles', number: 3 },
    { name: 'Четверка Пентаклей', meaning: 'Сохранение, безопасность, консерватизм', type: 'minor', suit: 'pentacles', number: 4 },
    { name: 'Пятерка Пентаклей', meaning: 'Бедность, изоляция, нужда', type: 'minor', suit: 'pentacles', number: 5 },
    { name: 'Шестерка Пентаклей', meaning: 'Щедрость, помощь, поддержка', type: 'minor', suit: 'pentacles', number: 6 },
    { name: 'Семерка Пентаклей', meaning: 'Терпение, долгосрочные планы, рост', type: 'minor', suit: 'pentacles', number: 7 },
    { name: 'Восьмерка Пентаклей', meaning: 'Мастерство, развитие, совершенствование', type: 'minor', suit: 'pentacles', number: 8 },
    { name: 'Девятка Пентаклей', meaning: 'Благополучие, роскошь, независимость', type: 'minor', suit: 'pentacles', number: 9 },
    { name: 'Десятка Пентаклей', meaning: 'Семейное богатство, наследие, стабильность', type: 'minor', suit: 'pentacles', number: 10 },
    { name: 'Паж Пентаклей', meaning: 'Новые возможности, обучение, практичность', type: 'minor', suit: 'pentacles', court: 'page' },
    { name: 'Рыцарь Пентаклей', meaning: 'Трудолюбие, надежность, прогресс', type: 'minor', suit: 'pentacles', court: 'knight' },
    { name: 'Королева Пентаклей', meaning: 'Практичность, изобилие, заботливость', type: 'minor', suit: 'pentacles', court: 'queen' },
    { name: 'Король Пентаклей', meaning: 'Успех, стабильность, надежность', type: 'minor', suit: 'pentacles', court: 'king' },
    
    // Младшие Арканы - Жезлы (14 карт)
    { name: 'Туз Жезлов', meaning: 'Новые начинания, энергия, вдохновение', type: 'minor', suit: 'wands', number: 1 },
    { name: 'Двойка Жезлов', meaning: 'Планирование, выбор, будущее', type: 'minor', suit: 'wands', number: 2 },
    { name: 'Тройка Жезлов', meaning: 'Расширение, путешествия, рост', type: 'minor', suit: 'wands', number: 3 },
    { name: 'Четверка Жезлов', meaning: 'Стабильность, дом, семья', type: 'minor', suit: 'wands', number: 4 },
    { name: 'Пятерка Жезлов', meaning: 'Конфликт, конкуренция, вызов', type: 'minor', suit: 'wands', number: 5 },
    { name: 'Шестерка Жезлов', meaning: 'Победа, успех, признание', type: 'minor', suit: 'wands', number: 6 },
    { name: 'Семерка Жезлов', meaning: 'Защита, вызов, упорство', type: 'minor', suit: 'wands', number: 7 },
    { name: 'Восьмерка Жезлов', meaning: 'Быстрые изменения, движение, новости', type: 'minor', suit: 'wands', number: 8 },
    { name: 'Девятка Жезлов', meaning: 'Сила, выносливость, стойкость', type: 'minor', suit: 'wands', number: 9 },
    { name: 'Десятка Жезлов', meaning: 'Бремя, ответственность, давление', type: 'minor', suit: 'wands', number: 10 },
    { name: 'Паж Жезлов', meaning: 'Новости, идеи, вдохновение', type: 'minor', suit: 'wands', court: 'page' },
    { name: 'Рыцарь Жезлов', meaning: 'Энергия, страсть, приключения', type: 'minor', suit: 'wands', court: 'knight' },
    { name: 'Королева Жезлов', meaning: 'Страсть, независимость, творчество', type: 'minor', suit: 'wands', court: 'queen' },
    { name: 'Король Жезлов', meaning: 'Лидерство, харизма, вдохновение', type: 'minor', suit: 'wands', court: 'king' }
];

// Типы раскладов
const spreads = {
    one_card: {
        name: 'Одна карта',
        description: 'Простой ответ на вопрос',
        cards: 1,
        price: 50
    },
    three_cards: {
        name: 'Три карты',
        description: 'Прошлое, настоящее, будущее',
        cards: 3,
        price: 100
    },
    celtic_cross: {
        name: 'Кельтский крест',
        description: 'Глубокий анализ ситуации',
        cards: 10,
        price: 200
    }
};

// Хранение данных пользователей
const userData = new Map();

// Функция для перемешивания карт
function shuffleCards() {
    const shuffled = [...tarotCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Функция для гадания
function performReading(spreadType, question) {
    const spread = spreads[spreadType];
    const shuffledDeck = shuffleCards();
    const selectedCards = shuffledDeck.slice(0, spread.cards);
    
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

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.from.first_name;
    
    // Инициализируем данные пользователя
    if (!userData.has(chatId)) {
        userData.set(chatId, {
            balance: 1000,
            readings: 0,
            lastReading: null
        });
    }
    
    const user = userData.get(chatId);
    
    const welcomeMessage = `🔮 Добро пожаловать в мир Таро, ${userName}!\n\n` +
        `У вас есть ${user.balance} монет для гаданий.\n\n` +
        `🎴 Доступные расклады:\n` +
        `• /one_card - Одна карта (50 монет)\n` +
        `• /three_cards - Три карты (100 монет)\n` +
        `• /celtic_cross - Кельтский крест (200 монет)\n\n` +
        `📱 Или используйте мини-приложение для удобного гадания!`;
    
    // Создаем клавиатуру с кнопкой мини-приложения
    const keyboard = {
        inline_keyboard: [
            [{
                text: '🔮 Открыть мини-приложение',
                web_app: { url: botConfig.webAppUrl }
            }]
        ]
    };
    
    bot.sendMessage(chatId, welcomeMessage, { reply_markup: keyboard });
});

// Обработка команды /one_card
bot.onText(/\/one_card/, (msg) => {
    const chatId = msg.chat.id;
    const user = userData.get(chatId) || { balance: 1000 };
    
    if (user.balance < 50) {
        bot.sendMessage(chatId, '❌ Недостаточно монет! Нужно 50 монет для гадания одной картой.');
        return;
    }
    
    bot.sendMessage(chatId, '🔮 Гадание одной картой\n\n❓ Задайте ваш вопрос:');
    userData.set(chatId, { ...user, waitingForQuestion: 'one_card' });
});

// Обработка команды /three_cards
bot.onText(/\/three_cards/, (msg) => {
    const chatId = msg.chat.id;
    const user = userData.get(chatId) || { balance: 1000 };
    
    if (user.balance < 100) {
        bot.sendMessage(chatId, '❌ Недостаточно монет! Нужно 100 монет для гадания тремя картами.');
        return;
    }
    
    bot.sendMessage(chatId, '🔮 Гадание тремя картами\n\n❓ Задайте ваш вопрос:');
    userData.set(chatId, { ...user, waitingForQuestion: 'three_cards' });
});

// Обработка команды /celtic_cross
bot.onText(/\/celtic_cross/, (msg) => {
    const chatId = msg.chat.id;
    const user = userData.get(chatId) || { balance: 1000 };
    
    if (user.balance < 200) {
        bot.sendMessage(chatId, '❌ Недостаточно монет! Нужно 200 монет для гадания кельтским крестом.');
        return;
    }
    
    bot.sendMessage(chatId, '🔮 Гадание кельтским крестом\n\n❓ Задайте ваш вопрос:');
    userData.set(chatId, { ...user, waitingForQuestion: 'celtic_cross' });
});

// Обработка команды /balance
bot.onText(/\/balance/, (msg) => {
    const chatId = msg.chat.id;
    const user = userData.get(chatId) || { balance: 1000, readings: 0 };
    
    const balanceMessage = `💰 Ваш баланс: ${user.balance} монет\n` +
        `🔮 Всего гаданий: ${user.readings}\n\n` +
        `💡 Монеты можно получить за активность или купить.`;
    
    bot.sendMessage(chatId, balanceMessage);
});

// Обработка команды /miniapp
bot.onText(/\/miniapp/, (msg) => {
    const chatId = msg.chat.id;
    
    const miniappMessage = `📱 Мини-приложение Таро\n\n` +
        `🔮 Откройте удобный интерфейс для гадания на картах Таро!\n\n` +
        `✨ Особенности мини-приложения:\n` +
        `• Красивый и интуитивный интерфейс\n` +
        `• Все 78 карт Таро\n` +
        `• 3 типа раскладов\n` +
        `• Мгновенные результаты\n` +
        `• Поддержка темной темы\n\n` +
        `🎯 Нажмите кнопку ниже, чтобы открыть мини-приложение!`;
    
    // Создаем клавиатуру с кнопкой мини-приложения
    const keyboard = {
        inline_keyboard: [
            [{
                text: '🔮 Открыть мини-приложение',
                web_app: { url: botConfig.webAppUrl }
            }]
        ]
    };
    
    bot.sendMessage(chatId, miniappMessage, { reply_markup: keyboard });
});

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    
    const helpMessage = `🔮 Помощь по боту Таро\n\n` +
        `📋 Доступные команды:\n` +
        `• /start - Начать работу с ботом\n` +
        `• /one_card - Гадание одной картой (50 монет)\n` +
        `• /three_cards - Гадание тремя картами (100 монет)\n` +
        `• /celtic_cross - Гадание кельтским крестом (200 монет)\n` +
        `• /balance - Показать баланс\n` +
        `• /help - Показать эту справку\n` +
        `• /miniapp - Открыть мини-приложение\n\n` +
        `❓ Как гадать:\n` +
        `1. Выберите тип расклада\n` +
        `2. Задайте вопрос\n` +
        `3. Получите интерпретацию\n\n` +
        `📱 Мини-приложение предоставляет удобный интерфейс для гадания!\n\n` +
        `💡 Карты Таро - это инструмент самопознания, а не предсказание судьбы.`;
    
    bot.sendMessage(chatId, helpMessage);
});

// Обработка текстовых сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    
    // Пропускаем команды
    if (text.startsWith('/')) return;
    
    const user = userData.get(chatId);
    if (!user || !user.waitingForQuestion) {
        bot.sendMessage(chatId, '🔮 Используйте команды для начала гадания:\n/one_card, /three_cards, /celtic_cross');
        return;
    }
    
    const spreadType = user.waitingForQuestion;
    const spread = spreads[spreadType];
    
    // Проверяем баланс
    if (user.balance < spread.price) {
        bot.sendMessage(chatId, `❌ Недостаточно монет! Нужно ${spread.price} монет для этого гадания.`);
        return;
    }
    
    // Выполняем гадание
    const interpretation = performReading(spreadType, text);
    
    // Обновляем данные пользователя
    userData.set(chatId, {
        ...user,
        balance: user.balance - spread.price,
        readings: (user.readings || 0) + 1,
        lastReading: { type: spreadType, question: text, interpretation },
        waitingForQuestion: null
    });
    
    // Отправляем результат
    bot.sendMessage(chatId, interpretation, { parse_mode: 'HTML' });
    
    // Показываем обновленный баланс
    const newBalance = userData.get(chatId).balance;
    bot.sendMessage(chatId, `💰 Остаток баланса: ${newBalance} монет\n\n🔮 Для нового гадания используйте команды!`);
});

// Обработка ошибок
bot.on('error', (error) => {
    console.error('Ошибка бота:', error);
});

bot.on('polling_error', (error) => {
    console.error('Ошибка polling:', error);
});

// Запуск бота
console.log('🔮 Бот Таро запускается...');
console.log('📱 Используйте команду /start для начала работы');

// Экспортируем для использования в других файлах
module.exports = { bot, tarotCards, spreads, userData, performReading };
