// Менеджер рекламных роликов
class AdManager {
    constructor() {
        this.ads = [];
        this.currentAd = null;
        this.adStats = {
            views: 0,
            clicks: 0,
            completions: 0,
            skips: 0
        };
        this.loadAds();
    }

    // Загрузка рекламных роликов
    loadAds() {
        // В реальном приложении здесь будет загрузка с сервера
        this.ads = [
            {
                id: 1,
                title: 'Реклама приложения',
                duration: 15,
                videoUrl: 'https://example.com/ad1.mp4',
                clickUrl: 'https://example.com/app',
                reward: 50,
                category: 'apps'
            },
            {
                id: 2,
                title: 'Реклама магазина',
                duration: 20,
                videoUrl: 'https://example.com/ad2.mp4',
                clickUrl: 'https://example.com/shop',
                reward: 75,
                category: 'shopping'
            },
            {
                id: 3,
                title: 'Реклама игры',
                duration: 10,
                videoUrl: 'https://example.com/ad3.mp4',
                clickUrl: 'https://example.com/game',
                reward: 30,
                category: 'games'
            }
        ];
    }

    // Получить случайную рекламу
    getRandomAd() {
        if (this.ads.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * this.ads.length);
        this.currentAd = this.ads[randomIndex];
        return this.currentAd;
    }

    // Начать показ рекламы
    startAd() {
        if (!this.currentAd) {
            this.getRandomAd();
        }
        
        if (this.currentAd) {
            this.adStats.views++;
            this.saveStats();
            return this.currentAd;
        }
        
        return null;
    }

    // Завершить просмотр рекламы
    completeAd() {
        if (this.currentAd) {
            this.adStats.completions++;
            this.saveStats();
            return this.currentAd.reward;
        }
        return 0;
    }

    // Пропустить рекламу
    skipAd() {
        if (this.currentAd) {
            this.adStats.skips++;
            this.saveStats();
        }
    }

    // Клик по рекламе
    clickAd() {
        if (this.currentAd) {
            this.adStats.clicks++;
            this.saveStats();
            
            // Открываем ссылку в новом окне
            if (this.currentAd.clickUrl) {
                window.open(this.currentAd.clickUrl, '_blank');
            }
        }
    }

    // Получить статистику
    getStats() {
        return {
            ...this.adStats,
            completionRate: this.adStats.views > 0 ? 
                (this.adStats.completions / this.adStats.views * 100).toFixed(2) : 0,
            clickRate: this.adStats.views > 0 ? 
                (this.adStats.clicks / this.adStats.views * 100).toFixed(2) : 0,
            skipRate: this.adStats.views > 0 ? 
                (this.adStats.skips / this.adStats.views * 100).toFixed(2) : 0
        };
    }

    // Сохранить статистику
    saveStats() {
        localStorage.setItem('adStats', JSON.stringify(this.adStats));
    }

    // Загрузить статистику
    loadStats() {
        const saved = localStorage.getItem('adStats');
        if (saved) {
            this.adStats = { ...this.adStats, ...JSON.parse(saved) };
        }
    }

    // Добавить новую рекламу
    addAd(adData) {
        const newAd = {
            id: Date.now(),
            ...adData
        };
        this.ads.push(newAd);
        return newAd;
    }

    // Удалить рекламу
    removeAd(adId) {
        this.ads = this.ads.filter(ad => ad.id !== adId);
    }

    // Получить рекламу по категории
    getAdsByCategory(category) {
        return this.ads.filter(ad => ad.category === category);
    }

    // Получить все категории
    getCategories() {
        const categories = [...new Set(this.ads.map(ad => ad.category))];
        return categories;
    }

    // Экспорт статистики
    exportStats() {
        const stats = this.getStats();
        const dataStr = JSON.stringify(stats, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `ad-stats-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    // Сброс статистики
    resetStats() {
        this.adStats = {
            views: 0,
            clicks: 0,
            completions: 0,
            skips: 0
        };
        this.saveStats();
    }
}

// Создаем глобальный экземпляр
window.adManager = new AdManager();

// Загружаем статистику при инициализации
window.adManager.loadStats();
