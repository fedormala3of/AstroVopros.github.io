// Автономная версия мини-приложения для GitHub Pages
// Включает все данные карт и логику гадания

// Колода карт Таро (78 карт)
const tarotCards = [
    // Старшие Арканы (22 карты)
    { name: 'Шут', meaning: 'Начало пути, свобода, приключения', type: 'major', number: 0 },
    { name: 'Маг', meaning: 'Сила воли, концентрация, мастерство', type: 'major', number: 1 },
    { name: 'Верховная Жрица', meaning: 'Интуиция, тайны, подсознание', type: 'major', number: 2 },
    { name: 'Императрица', meaning: 'Плодородие, материнство, природа', type: 'major', number: 3 },
    { name: 'Император', meaning: 'Власть, структура, авторитет', type: 'major', number: 4 },
    { name: 'Иерофант', meaning: 'Традиции, духовность, обучение', type: 'major', number: 5 },
    { name: 'Влюбленные', meaning: 'Любовь, выбор, гармония', type: 'major', number: 6 },
    { name: 'Колесница', meaning: 'Контроль, направление, победа', type: 'major', number: 7 },
    { name: 'Сила', meaning: 'Внутренняя сила, терпение, контроль', type: 'major', number: 8 },
    { name: 'Отшельник', meaning: 'Поиск истины, самоанализ, мудрость', type: 'major', number: 9 },
    { name: 'Колесо Фортуны', meaning: 'Судьба, циклы, перемены', type: 'major', number: 10 },
    { name: 'Справедливость', meaning: 'Баланс, справедливость, правда', type: 'major', number: 11 },
    { name: 'Повешенный', meaning: 'Жертва, ожидание, новый взгляд', type: 'major', number: 12 },
    { name: 'Смерть', meaning: 'Конец, трансформация, новое начало', type: 'major', number: 13 },
    { name: 'Умеренность', meaning: 'Баланс, терпение, гармония', type: 'major', number: 14 },
    { name: 'Дьявол', meaning: 'Искушение, зависимость, материализм', type: 'major', number: 15 },
    { name: 'Башня', meaning: 'Внезапные перемены, разрушение, освобождение', type: 'major', number: 16 },
    { name: 'Звезда', meaning: 'Надежда, вдохновение, духовность', type: 'major', number: 17 },
    { name: 'Луна', meaning: 'Иллюзии, страхи, подсознание', type: 'major', number: 18 },
    { name: 'Солнце', meaning: 'Радость, успех, жизненная сила', type: 'major', number: 19 },
    { name: 'Суд', meaning: 'Возрождение, прощение, новый этап', type: 'major', number: 20 },
    { name: 'Мир', meaning: 'Завершение, успех, гармония', type: 'major', number: 21 },
    
    // Младшие Арканы - Кубки (14 карт)
    { name: 'Туз Кубков', meaning: 'Новая любовь, эмоциональное начало', type: 'cups', number: 1 },
    { name: 'Двойка Кубков', meaning: 'Партнерство, взаимная любовь', type: 'cups', number: 2 },
    { name: 'Тройка Кубков', meaning: 'Дружба, празднование, радость', type: 'cups', number: 3 },
    { name: 'Четверка Кубков', meaning: 'Апатия, упущенные возможности', type: 'cups', number: 4 },
    { name: 'Пятерка Кубков', meaning: 'Потеря, разочарование, горе', type: 'cups', number: 5 },
    { name: 'Шестерка Кубков', meaning: 'Ностальгия, детские воспоминания', type: 'cups', number: 6 },
    { name: 'Семерка Кубков', meaning: 'Иллюзии, выбор, фантазии', type: 'cups', number: 7 },
    { name: 'Восьмерка Кубков', meaning: 'Отказ, поиск смысла', type: 'cups', number: 8 },
    { name: 'Девятка Кубков', meaning: 'Удовлетворение, исполнение желаний', type: 'cups', number: 9 },
    { name: 'Десятка Кубков', meaning: 'Семейное счастье, гармония', type: 'cups', number: 10 },
    { name: 'Паж Кубков', meaning: 'Новые чувства, творчество', type: 'cups', number: 11 },
    { name: 'Рыцарь Кубков', meaning: 'Романтизм, идеализм, эмоции', type: 'cups', number: 12 },
    { name: 'Королева Кубков', meaning: 'Эмоциональная зрелость, интуиция', type: 'cups', number: 13 },
    { name: 'Король Кубков', meaning: 'Эмоциональный контроль, мудрость', type: 'cups', number: 14 },
    
    // Младшие Арканы - Мечи (14 карт)
    { name: 'Туз Мечей', meaning: 'Новая идея, ясность мышления', type: 'swords', number: 1 },
    { name: 'Двойка Мечей', meaning: 'Трудный выбор, равновесие', type: 'swords', number: 2 },
    { name: 'Тройка Мечей', meaning: 'Боль, разбитое сердце, страдание', type: 'swords', number: 3 },
    { name: 'Четверка Мечей', meaning: 'Отдых, восстановление, медитация', type: 'swords', number: 4 },
    { name: 'Пятерка Мечей', meaning: 'Конфликт, поражение, предательство', type: 'swords', number: 5 },
    { name: 'Шестерка Мечей', meaning: 'Переход, путешествие, изменения', type: 'swords', number: 6 },
    { name: 'Семерка Мечей', meaning: 'Обман, воровство, хитрость', type: 'swords', number: 7 },
    { name: 'Восьмерка Мечей', meaning: 'Ограничения, чувство ловушки', type: 'swords', number: 8 },
    { name: 'Девятка Мечей', meaning: 'Тревога, кошмары, беспокойство', type: 'swords', number: 9 },
    { name: 'Десятка Мечей', meaning: 'Конец, предательство, поражение', type: 'swords', number: 10 },
    { name: 'Паж Мечей', meaning: 'Новые идеи, любопытство', type: 'swords', number: 11 },
    { name: 'Рыцарь Мечей', meaning: 'Действие, импульсивность, конфликт', type: 'swords', number: 12 },
    { name: 'Королева Мечей', meaning: 'Ясность, независимость, правда', type: 'swords', number: 13 },
    { name: 'Король Мечей', meaning: 'Интеллект, справедливость, авторитет', type: 'swords', number: 14 },
    
    // Младшие Арканы - Пентакли (14 карт)
    { name: 'Туз Пентаклей', meaning: 'Новые возможности, материальный успех', type: 'pentacles', number: 1 },
    { name: 'Двойка Пентаклей', meaning: 'Баланс, приоритеты, гибкость', type: 'pentacles', number: 2 },
    { name: 'Тройка Пентаклей', meaning: 'Сотрудничество, мастерство, работа', type: 'pentacles', number: 3 },
    { name: 'Четверка Пентаклей', meaning: 'Безопасность, контроль, стабильность', type: 'pentacles', number: 4 },
    { name: 'Пятерка Пентаклей', meaning: 'Бедность, изоляция, материальные трудности', type: 'pentacles', number: 5 },
    { name: 'Шестерка Пентаклей', meaning: 'Щедрость, благотворительность, помощь', type: 'pentacles', number: 6 },
    { name: 'Семерка Пентаклей', meaning: 'Терпение, долгосрочные инвестиции', type: 'pentacles', number: 7 },
    { name: 'Восьмерка Пентаклей', meaning: 'Навыки, мастерство, преданность', type: 'pentacles', number: 8 },
    { name: 'Девятка Пентаклей', meaning: 'Благополучие, самодостаточность', type: 'pentacles', number: 9 },
    { name: 'Десятка Пентаклей', meaning: 'Богатство, семья, наследие', type: 'pentacles', number: 10 },
    { name: 'Паж Пентаклей', meaning: 'Новые возможности, обучение', type: 'pentacles', number: 11 },
    { name: 'Рыцарь Пентаклей', meaning: 'Трудолюбие, надежность, медленный прогресс', type: 'pentacles', number: 12 },
    { name: 'Королева Пентаклей', meaning: 'Практичность, материальная безопасность', type: 'pentacles', number: 13 },
    { name: 'Король Пентаклей', meaning: 'Финансовая стабильность, щедрость', type: 'pentacles', number: 14 },
    
    // Младшие Арканы - Жезлы (14 карт)
    { name: 'Туз Жезлов', meaning: 'Новые начинания, энергия, вдохновение', type: 'wands', number: 1 },
    { name: 'Двойка Жезлов', meaning: 'Планирование, будущие возможности', type: 'wands', number: 2 },
    { name: 'Тройка Жезлов', meaning: 'Расширение, дальновидность, лидерство', type: 'wands', number: 3 },
    { name: 'Четверка Жезлов', meaning: 'Празднование, гармония, стабильность', type: 'wands', number: 4 },
    { name: 'Пятерка Жезлов', meaning: 'Конкуренция, конфликт, соперничество', type: 'wands', number: 5 },
    { name: 'Шестерка Жезлов', meaning: 'Победа, успех, признание', type: 'wands', number: 6 },
    { name: 'Семерка Жезлов', meaning: 'Вызов, защита, настойчивость', type: 'wands', number: 7 },
    { name: 'Восьмерка Жезлов', meaning: 'Быстрые действия, движение, прогресс', type: 'wands', number: 8 },
    { name: 'Девятка Жезлов', meaning: 'Стойкость, выносливость, последние усилия', type: 'wands', number: 9 },
    { name: 'Десятка Жезлов', meaning: 'Бремя, ответственность, перегрузка', type: 'wands', number: 10 },
    { name: 'Паж Жезлов', meaning: 'Новые идеи, энтузиазм, приключения', type: 'wands', number: 11 },
    { name: 'Рыцарь Жезлов', meaning: 'Действие, приключения, импульсивность', type: 'wands', number: 12 },
    { name: 'Королева Жезлов', meaning: 'Уверенность, независимость, страсть', type: 'wands', number: 13 },
    { name: 'Король Жезлов', meaning: 'Лидерство, харизма, авторитет', type: 'wands', number: 14 }
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
    },
    relationships: {
        name: 'Расклад на отношения',
        description: 'Анализ любовных отношений',
        cards: 5,
        price: 150
    },
    career: {
        name: 'Расклад на карьеру',
        description: 'Профессиональные вопросы',
        cards: 4,
        price: 150
    },
    health: {
        name: 'Расклад на здоровье',
        description: 'Вопросы о самочувствии',
        cards: 3,
        price: 120
    }
};

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
    
    // Добавляем позиции для новых раскладов
    const positions = getSpreadPositions(spreadType);
    
    selectedCards.forEach((card, index) => {
        if (positions && positions[index]) {
            interpretation += `${index + 1}. ${positions[index]}: ${card.name} - ${card.meaning}\n`;
        } else {
            interpretation += `${index + 1}. ${card.name} - ${card.meaning}\n`;
        }
    });
    
    interpretation += `\n💭 Общая интерпретация:\n`;
    interpretation += `Карты показывают, что в вашей ситуации ${getGeneralInterpretation(selectedCards)}`;
    
    return interpretation;
}

// Функция для получения позиций расклада
function getSpreadPositions(spreadType) {
    const positions = {
        relationships: ['Ваши чувства', 'Чувства партнера', 'Препятствия', 'Совет карт', 'Будущее отношений'],
        career: ['Текущая ситуация', 'Возможности', 'Препятствия', 'Рекомендации'],
        health: ['Физическое состояние', 'Эмоциональное состояние', 'Рекомендации']
    };
    
    return positions[spreadType] || null;
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

// Экспортируем для использования в мини-приложении
if (typeof window !== 'undefined') {
    window.tarotData = {
        tarotCards,
        spreads,
        performReading
    };
}
