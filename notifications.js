// Система уведомлений для мини-приложения Таро
class NotificationSystem {
    constructor() {
        this.container = null;
        this.settings = this.loadSettings();
        this.init();
    }

    init() {
        this.createContainer();
        this.loadSettings();
    }

    createContainer() {
        // Создаем контейнер для уведомлений
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        this.container.id = 'notificationContainer';
        document.body.appendChild(this.container);
    }

    loadSettings() {
        const defaultSettings = {
            enabled: true,
            sound: true,
            vibration: true,
            dailyReminder: true,
            achievementAlerts: true,
            balanceAlerts: true
        };

        const saved = localStorage.getItem('notificationSettings');
        this.settings = saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
        return this.settings;
    }

    saveSettings() {
        localStorage.setItem('notificationSettings', JSON.stringify(this.settings));
    }

    updateSetting(key, value) {
        this.settings[key] = value;
        this.saveSettings();
    }

    show(message, type = 'info', duration = 3000) {
        if (!this.settings.enabled) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        this.container.appendChild(notification);

        // Анимация появления
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Звуковое уведомление
        if (this.settings.sound) {
            this.playSound(type);
        }

        // Вибрация
        if (this.settings.vibration && navigator.vibrate) {
            navigator.vibrate(200);
        }

        // Автоматическое скрытие
        if (duration > 0) {
            setTimeout(() => {
                this.hide(notification);
            }, duration);
        }

        return notification;
    }

    hide(notification) {
        if (notification && notification.parentNode) {
            notification.classList.add('hide');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }

    getIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            achievement: '🏆',
            balance: '💰',
            ad: '📺'
        };
        return icons[type] || icons.info;
    }

    playSound(type) {
        // Создаем простой звуковой сигнал
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Разные частоты для разных типов уведомлений
        const frequencies = {
            success: 800,
            error: 400,
            warning: 600,
            info: 500,
            achievement: 1000,
            balance: 700,
            ad: 900
        };

        oscillator.frequency.setValueAtTime(frequencies[type] || 500, audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    // Специальные методы для разных типов уведомлений
    showSuccess(message, duration = 3000) {
        return this.show(message, 'success', duration);
    }

    showError(message, duration = 5000) {
        return this.show(message, 'error', duration);
    }

    showWarning(message, duration = 4000) {
        return this.show(message, 'warning', duration);
    }

    showInfo(message, duration = 3000) {
        return this.show(message, 'info', duration);
    }

    showAchievement(message, duration = 5000) {
        return this.show(message, 'achievement', duration);
    }

    showBalance(message, duration = 3000) {
        return this.show(message, 'balance', duration);
    }

    showAd(message, duration = 3000) {
        return this.show(message, 'ad', duration);
    }

    // Методы для работы с настройками
    toggleSetting(key) {
        this.settings[key] = !this.settings[key];
        this.saveSettings();
        return this.settings[key];
    }

    getSetting(key) {
        return this.settings[key];
    }

    // Ежедневные напоминания
    checkDailyReminder() {
        if (!this.settings.dailyReminder) return;

        const lastReminder = localStorage.getItem('lastDailyReminder');
        const today = new Date().toDateString();

        if (lastReminder !== today) {
            this.showInfo('🔮 Не забудьте сделать расклад сегодня!', 5000);
            localStorage.setItem('lastDailyReminder', today);
        }
    }

    // Уведомления о достижениях
    showAchievementNotification(achievement) {
        if (!this.settings.achievementAlerts) return;

        const message = `🏆 Достижение разблокировано: ${achievement.name}!`;
        this.showAchievement(message, 5000);
    }

    // Уведомления о балансе
    showBalanceNotification(change, newBalance) {
        if (!this.settings.balanceAlerts) return;

        const sign = change > 0 ? '+' : '';
        const message = `💰 Баланс изменен: ${sign}${change} монет. Текущий баланс: ${newBalance}`;
        this.showBalance(message, 3000);
    }

    // Уведомления о рекламе
    showAdNotification(type, reward) {
        if (!this.settings.enabled) return;

        const messages = {
            completed: `📺 Реклама просмотрена! Получено: ${reward} монет`,
            skipped: '⏭️ Реклама пропущена',
            clicked: '🔗 Переход по рекламе засчитан'
        };

        this.showAd(messages[type] || 'Реклама обработана', 3000);
    }
}

// Создаем глобальный экземпляр системы уведомлений
window.notificationSystem = new NotificationSystem();

// Функции для работы с настройками уведомлений
function toggleNotificationSetting(setting) {
    const isEnabled = window.notificationSystem.toggleSetting(setting);
    updateNotificationToggle(setting, isEnabled);
    
    // Показываем уведомление об изменении настройки
    const settingNames = {
        enabled: 'Уведомления',
        sound: 'Звук',
        vibration: 'Вибрация',
        dailyReminder: 'Ежедневные напоминания',
        achievementAlerts: 'Уведомления о достижениях',
        balanceAlerts: 'Уведомления о балансе'
    };
    
    const message = `${settingNames[setting]} ${isEnabled ? 'включены' : 'выключены'}`;
    window.notificationSystem.showInfo(message, 2000);
}

function updateNotificationToggle(setting, isEnabled) {
    const toggle = document.getElementById(`notifications${setting.charAt(0).toUpperCase() + setting.slice(1)}`);
    if (toggle) {
        toggle.classList.toggle('active', isEnabled);
    }
}

function loadNotificationSettings() {
    if (window.notificationSystem) {
        const settings = window.notificationSystem.settings;
        Object.keys(settings).forEach(setting => {
            updateNotificationToggle(setting, settings[setting]);
        });
    }
}

// Проверяем ежедневные напоминания при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.notificationSystem) {
            window.notificationSystem.checkDailyReminder();
        }
    }, 2000);
});
