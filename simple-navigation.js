// Простая навигация для мини-приложения
// Этот файл гарантированно работает

console.log('🚀 Загружается простая навигация...');

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 DOM загружен, инициализируем навигацию...');
    
    // Функция для переключения страниц
    function switchPage(pageId, buttonId) {
        console.log('🔄 Переключение на страницу:', pageId);
        
        // Скрываем все страницы
        const pages = ['mainPage', 'shopPage', 'cabinetPage', 'miniGamesPage'];
        pages.forEach(id => {
            const page = document.getElementById(id);
            if (page) {
                page.style.display = 'none';
                console.log('❌ Скрыта страница:', id);
            }
        });
        
        // Убираем активный класс со всех кнопок
        const allButtons = document.querySelectorAll('.nav-item, .bottom-nav button');
        allButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Показываем нужную страницу
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            console.log('✅ Показана страница:', pageId);
        } else {
            console.error('❌ Страница не найдена:', pageId);
        }
        
        // Активируем кнопку
        const activeButton = document.getElementById(buttonId);
        if (activeButton) {
            activeButton.classList.add('active');
            console.log('✅ Активирована кнопка:', buttonId);
        }
    }
    
    // Добавляем обработчики для кнопок навигации
    function addNavigationHandlers() {
        console.log('🔧 Добавляем обработчики навигации...');
        
        // Кнопка Магазин
        const shopBtn = document.getElementById('navShop');
        if (shopBtn) {
            shopBtn.onclick = function(e) {
                e.preventDefault();
                console.log('🛒 Клик по кнопке Магазин');
                switchPage('shopPage', 'navShop');
            };
            console.log('✅ Обработчик для Магазин добавлен');
        } else {
            console.error('❌ Кнопка Магазин не найдена');
        }
        
        // Кнопка Гадания
        const readingsBtn = document.getElementById('navReadings');
        if (readingsBtn) {
            readingsBtn.onclick = function(e) {
                e.preventDefault();
                console.log('🔮 Клик по кнопке Гадания');
                switchPage('mainPage', 'navReadings');
            };
            console.log('✅ Обработчик для Гадания добавлен');
        } else {
            console.error('❌ Кнопка Гадания не найдена');
        }
        
        // Кнопка Кабинет
        const cabinetBtn = document.getElementById('navCabinet');
        if (cabinetBtn) {
            cabinetBtn.onclick = function(e) {
                e.preventDefault();
                console.log('👤 Клик по кнопке Кабинет');
                switchPage('cabinetPage', 'navCabinet');
            };
            console.log('✅ Обработчик для Кабинет добавлен');
        } else {
            console.error('❌ Кнопка Кабинет не найдена');
        }
    }
    
    // Запускаем инициализацию с задержкой
    setTimeout(function() {
        console.log('⏰ Запускаем инициализацию навигации...');
        addNavigationHandlers();
        
        // Показываем главную страницу по умолчанию
        switchPage('mainPage', 'navReadings');
        
        console.log('🎉 Навигация инициализирована!');
    }, 500);
    
    // Дополнительная проверка через 2 секунды
    setTimeout(function() {
        console.log('🔍 Дополнительная проверка навигации...');
        const navButtons = document.querySelectorAll('.nav-item, .bottom-nav button');
        console.log('Найдено кнопок навигации:', navButtons.length);
        
        if (navButtons.length === 0) {
            console.error('❌ Кнопки навигации не найдены!');
            // Попробуем найти кнопки по другому селектору
            const altButtons = document.querySelectorAll('button[id*="nav"]');
            console.log('Альтернативные кнопки найдены:', altButtons.length);
        }
    }, 2000);
});

console.log('📋 Простая навигация загружена');
