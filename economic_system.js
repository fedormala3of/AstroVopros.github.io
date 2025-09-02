// ЭКОНОМИЧЕСКАЯ СИСТЕМА ДЛЯ ТАРО-БОТА

// Система уровней пользователей
let userLevel = parseInt(localStorage.getItem('userLevel')) || 1;
let userXP = parseInt(localStorage.getItem('userXP')) || 0;
let userAchievements = JSON.parse(localStorage.getItem('userAchievements')) || [];

// Система достижений
const achievements = [
    { id: 'first_reading', name: 'Первое гадание', description: 'Проведите первое гадание', xp: 50, icon: '🔮' },
    { id: 'first_game', name: 'Первая игра', description: 'Сыграйте в первую игру', xp: 30, icon: '🎮' },
    { id: 'coin_collector', name: 'Коллекционер монет', description: 'Заработайте 1000 монет', xp: 100, icon: '💰' },
    { id: 'game_master', name: 'Мастер игр', description: 'Выиграйте 10 игр', xp: 150, icon: '🏆' },
    { id: 'daily_player', name: 'Ежедневный игрок', description: 'Входите в приложение 7 дней подряд', xp: 200, icon: '📅' },
    { id: 'lucky_streak', name: 'Полоса везения', description: 'Выиграйте 5 игр подряд', xp: 300, icon: '🍀' },
    { id: 'tarot_expert', name: 'Эксперт Таро', description: 'Проведите 50 гаданий', xp: 250, icon: '🎴' },
    { id: 'quiz_master', name: 'Мастер викторин', description: 'Пройдите все викторины на 100%', xp: 400, icon: '🧠' }
];

// Ежедневные бонусы
function getDailyBonus() {
    const lastBonusDate = localStorage.getItem('lastBonusDate');
    const today = new Date().toDateString();
    
    if (lastBonusDate !== today) {
        const streak = parseInt(localStorage.getItem('bonusStreak')) || 0;
        const newStreak = streak + 1;
        const bonusAmount = Math.min(50 + (newStreak * 10), 200); // От 50 до 200 монет
        
        localStorage.setItem('lastBonusDate', today);
        localStorage.setItem('bonusStreak', newStreak.toString());
        
        addCoins(bonusAmount);
        addXP(25);
        
        showNotification('🎁 Ежедневный бонус', `Получено ${bonusAmount} монет! Серия: ${newStreak} дней`, 'success');
        
        // Проверяем достижение
        if (newStreak === 7) {
            unlockAchievement('daily_player');
        }
        
        return true;
    }
    return false;
}

// Система опыта и уровней
function addXP(amount) {
    userXP += amount;
    localStorage.setItem('userXP', userXP.toString());
    
    const newLevel = Math.floor(userXP / 100) + 1;
    if (newLevel > userLevel) {
        userLevel = newLevel;
        localStorage.setItem('userLevel', userLevel.toString());
        
        const levelReward = userLevel * 100;
        addCoins(levelReward);
        
        showNotification('🎉 Новый уровень!', `Уровень ${userLevel}! Получено ${levelReward} монет`, 'success');
    }
}

// Система достижений
function unlockAchievement(achievementId) {
    if (!userAchievements.includes(achievementId)) {
        userAchievements.push(achievementId);
        localStorage.setItem('userAchievements', JSON.stringify(userAchievements));
        
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
            addXP(achievement.xp);
            showNotification('🏆 Достижение разблокировано!', `${achievement.icon} ${achievement.name}`, 'success');
        }
    }
}

// Проверка достижений
function checkAchievements() {
    const balance = getCurrentBalance();
    const gamesPlayed = parseInt(localStorage.getItem('gamesPlayed')) || 0;
    const readingsDone = parseInt(localStorage.getItem('readingsDone')) || 0;
    const gamesWon = parseInt(localStorage.getItem('gamesWon')) || 0;
    const winStreak = parseInt(localStorage.getItem('winStreak')) || 0;
    
    // Проверяем достижения
    if (balance >= 1000 && !userAchievements.includes('coin_collector')) {
        unlockAchievement('coin_collector');
    }
    
    if (gamesWon >= 10 && !userAchievements.includes('game_master')) {
        unlockAchievement('game_master');
    }
    
    if (readingsDone >= 50 && !userAchievements.includes('tarot_expert')) {
        unlockAchievement('tarot_expert');
    }
    
    if (winStreak >= 5 && !userAchievements.includes('lucky_streak')) {
        unlockAchievement('lucky_streak');
    }
}

// Сезонные события
function getSeasonalEvent() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // Новый год
    if (month === 1 && day <= 7) {
        return {
            name: 'Новогоднее событие',
            description: 'Двойные монеты за все действия!',
            multiplier: 2,
            icon: '🎄'
        };
    }
    
    // Хэллоуин
    if (month === 10 && day >= 25) {
        return {
            name: 'Хэллоуин',
            description: 'Мистические бонусы!',
            multiplier: 1.5,
            icon: '🎃'
        };
    }
    
    // День рождения бота (пример)
    if (month === 6 && day === 15) {
        return {
            name: 'День рождения бота',
            description: 'Тройные монеты!',
            multiplier: 3,
            icon: '🎂'
        };
    }
    
    return null;
}

// Реферальная система
function generateReferralCode() {
    const userId = localStorage.getItem('userId') || Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
    return userId;
}

function useReferralCode(code) {
    const usedCodes = JSON.parse(localStorage.getItem('usedReferralCodes')) || [];
    
    if (usedCodes.includes(code)) {
        return false; // Код уже использован
    }
    
    usedCodes.push(code);
    localStorage.setItem('usedReferralCodes', JSON.stringify(usedCodes));
    
    // Бонус за использование реферального кода
    addCoins(100);
    addXP(50);
    
    showNotification('🎁 Реферальный бонус', 'Получено 100 монет за использование кода!', 'success');
    
    return true;
}

// Система подарков
function getGiftBox() {
    const lastGiftDate = localStorage.getItem('lastGiftDate');
    const today = new Date().toDateString();
    
    if (lastGiftDate !== today) {
        const gifts = [
            { type: 'coins', amount: 50, name: 'Монеты' },
            { type: 'coins', amount: 100, name: 'Больше монет' },
            { type: 'xp', amount: 25, name: 'Опыт' },
            { type: 'bonus', amount: 1, name: 'Бонусная игра' }
        ];
        
        const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
        
        localStorage.setItem('lastGiftDate', today);
        
        if (randomGift.type === 'coins') {
            addCoins(randomGift.amount);
        } else if (randomGift.type === 'xp') {
            addXP(randomGift.amount);
        } else if (randomGift.type === 'bonus') {
            localStorage.setItem('bonusGames', (parseInt(localStorage.getItem('bonusGames')) || 0) + 1);
        }
        
        showNotification('🎁 Подарок!', `Получено: ${randomGift.name}`, 'success');
        
        return true;
    }
    return false;
}

// Система лояльности
function getLoyaltyBonus() {
    const daysActive = parseInt(localStorage.getItem('daysActive')) || 0;
    const newDaysActive = daysActive + 1;
    localStorage.setItem('daysActive', newDaysActive.toString());
    
    if (newDaysActive % 30 === 0) {
        const loyaltyReward = newDaysActive * 10;
        addCoins(loyaltyReward);
        addXP(100);
        
        showNotification('💎 Бонус лояльности', `За ${newDaysActive} дней активности: ${loyaltyReward} монет`, 'success');
    }
}

// Инициализация экономической системы
function initEconomicSystem() {
    // Проверяем ежедневный бонус
    getDailyBonus();
    
    // Проверяем подарки
    getGiftBox();
    
    // Проверяем бонус лояльности
    getLoyaltyBonus();
    
    // Проверяем достижения
    checkAchievements();
    
    // Обновляем отображение уровня
    updateLevelDisplay();
}

// Обновление отображения уровня
function updateLevelDisplay() {
    const levelElement = document.getElementById('userLevel');
    if (levelElement) {
        levelElement.textContent = `Уровень ${userLevel}`;
    }
    
    const xpElement = document.getElementById('userXP');
    if (xpElement) {
        const currentLevelXP = userXP % 100;
        const nextLevelXP = 100;
        xpElement.textContent = `${currentLevelXP}/${nextLevelXP} XP`;
    }
}

// Функция для показа достижений
function showAchievements() {
    const modal = document.createElement('div');
    modal.className = 'achievement-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        border-radius: 25px;
        text-align: center;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        animation: slideInUp 0.5s ease-out;
    `;
    
    const unlockedAchievements = achievements.filter(a => userAchievements.includes(a.id));
    const lockedAchievements = achievements.filter(a => !userAchievements.includes(a.id));
    
    content.innerHTML = `
        <h2 style="margin: 0 0 30px 0; font-size: 28px;">🏆 Достижения</h2>
        
        <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; font-size: 20px;">Разблокированные (${unlockedAchievements.length})</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                ${unlockedAchievements.map(achievement => `
                    <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 15px;">
                        <div style="font-size: 24px; margin-bottom: 10px;">${achievement.icon}</div>
                        <div style="font-weight: 600; margin-bottom: 5px;">${achievement.name}</div>
                        <div style="font-size: 14px; opacity: 0.9;">${achievement.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div style="margin-bottom: 30px;">
            <h3 style="margin: 0 0 20px 0; font-size: 20px;">Заблокированные (${lockedAchievements.length})</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px;">
                ${lockedAchievements.map(achievement => `
                    <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; opacity: 0.6;">
                        <div style="font-size: 24px; margin-bottom: 10px;">🔒</div>
                        <div style="font-weight: 600; margin-bottom: 5px;">${achievement.name}</div>
                        <div style="font-size: 14px; opacity: 0.9;">${achievement.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <button onclick="this.closest('.achievement-modal').remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Закрыть
        </button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
}

// Переопределяем функции для учета статистики
const originalDeductCoins = window.deductCoins;
window.deductCoins = function(amount) {
    originalDeductCoins(amount);
    
    // Увеличиваем счетчик потраченных монет
    const spentCoins = parseInt(localStorage.getItem('spentCoins')) || 0;
    localStorage.setItem('spentCoins', (spentCoins + amount).toString());
};

const originalAddCoins = window.addCoins;
window.addCoins = function(amount) {
    originalAddCoins(amount);
    
    // Увеличиваем счетчик заработанных монет
    const earnedCoins = parseInt(localStorage.getItem('earnedCoins')) || 0;
    localStorage.setItem('earnedCoins', (earnedCoins + amount).toString());
    
    // Проверяем достижения
    checkAchievements();
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initEconomicSystem();
});
