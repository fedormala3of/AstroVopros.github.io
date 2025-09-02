// Конфигурация бота Таро
module.exports = {
    // Основные настройки
    bot: {
        name: 'Tarot Bot',
        version: '1.0.0',
        description: 'Телеграм бот для гадания на картах Таро'
    },
    
    // Настройки Telegram
    telegram: {
        // Токен бота (замените на ваш)
        token: '8047129004:AAFsemMvY7MtRhrlOi6rNkvlOkWE2IYu39A',
        
        // URL мини-приложения (для будущего использования)
        webAppUrl: 'https://your-domain.com',
        
        // Настройки polling
        polling: true,
        pollingOptions: {
            timeout: 10,
            limit: 100
        }
    },
    
    // Настройки сервера
    server: {
        http: {
            port: 3000,
            host: 'localhost'
        },
        https: {
            port: 3443,
            host: 'localhost'
        }
    },
    
    // Настройки карт Таро
    tarot: {
        // Количество карт в колоде
        totalCards: 78,
        
        // Старшие Арканы
        majorArcana: 22,
        
        // Младшие Арканы
        minorArcana: 56,
        
        // Масти
        suits: ['cups', 'swords', 'pentacles', 'wands'],
        
        // Карты двора
        courtCards: ['page', 'knight', 'queen', 'king']
    },
    
    // Настройки раскладов
    spreads: {
        one_card: {
            name: 'Одна карта',
            description: 'Простой ответ на вопрос',
            cards: 1,
            price: 50,
            positions: ['Ответ']
        },
        three_cards: {
            name: 'Три карты',
            description: 'Прошлое, настоящее, будущее',
            cards: 3,
            price: 100,
            positions: ['Прошлое', 'Настоящее', 'Будущее']
        },
        celtic_cross: {
            name: 'Кельтский крест',
            description: 'Глубокий анализ ситуации',
            cards: 10,
            price: 200,
            positions: [
                'Текущая ситуация',
                'Вызов',
                'Прошлое',
                'Будущее',
                'Сознательные мысли',
                'Подсознательные мысли',
                'Влияния',
                'Окружение',
                'Надежды и страхи',
                'Итог'
            ]
        }
    },
    
    // Настройки пользователей
    user: {
        // Начальный баланс
        initialBalance: 1000,
        
        // Лимиты
        maxQuestionLength: 500,
        minQuestionLength: 10,
        
        // Награды
        dailyBonus: 100,
        readingBonus: 10
    },
    
    // Настройки безопасности
    security: {
        // Rate limiting
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 минут
            max: 100 // максимум 100 запросов
        },
        
        // Фильтрация
        filterProfanity: true,
        maxConcurrentReadings: 1
    },
    
    // Настройки логирования
    logging: {
        level: 'info', // debug, info, warn, error
        file: 'bot.log',
        console: true
    },
    
    // Настройки разработки
    development: {
        debug: false,
        testMode: false,
        mockData: false
    }
};
