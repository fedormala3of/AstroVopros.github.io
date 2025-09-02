// Конфигурация для мини-приложения
const config = {
    // API URL для GitHub Pages
    apiUrl: 'https://fedormala3of.github.io/AstroVopros.github.io',
    
    // Настройки для локальной разработки
    localApiUrl: 'http://localhost:3000',
    
    // Определяем, работаем ли мы локально или на GitHub Pages
    isLocal: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    
    // Получаем правильный API URL
    getApiUrl: function() {
        return this.isLocal ? this.localApiUrl : this.apiUrl;
    }
};

// Экспортируем для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.config = config;
}

