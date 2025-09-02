const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница мини-аппа
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mini_app', 'index.html'));
});

// API для получения карт
app.get('/api/cards', (req, res) => {
    try {
        const { tarotCards } = require('./bot.js');
        res.json(tarotCards);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка загрузки карт' });
    }
});

// API для получения раскладов
app.get('/api/spreads', (req, res) => {
    try {
        const { spreads } = require('./bot.js');
        res.json(spreads);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка загрузки раскладов' });
    }
});

// API для гадания
app.post('/api/reading', (req, res) => {
    try {
        const { performReading, spreads } = require('./bot.js');
        const { spreadType, question } = req.body;
        
        if (!spreadType || !question) {
            return res.status(400).json({ error: 'Необходимы spreadType и question' });
        }
        
        const spread = spreads[spreadType];
        if (!spread) {
            return res.status(400).json({ error: 'Неизвестный тип расклада' });
        }
        
        // Для демо-версии используем фиксированный баланс
        // В реальном приложении здесь должна быть проверка баланса пользователя
        const currentBalance = 1000; // Это должно приходить от пользователя
        const newBalance = currentBalance - spread.price;
        
        if (newBalance < 0) {
            return res.status(400).json({ error: 'Недостаточно монет для гадания' });
        }
        
        const interpretation = performReading(spreadType, question);
        res.json({ 
            success: true, 
            interpretation,
            newBalance: newBalance,
            price: spread.price
        });
    } catch (error) {
        console.error('Ошибка гадания:', error);
        res.status(500).json({ error: 'Ошибка гадания' });
    }
});

// API для получения баланса пользователя
app.get('/api/balance', (req, res) => {
    // Для демо-версии возвращаем фиксированный баланс
    // В реальном приложении здесь должна быть проверка пользователя
    res.json({ balance: 1000 });
});

// Статус сервера
app.get('/status', (req, res) => {
    res.json({ 
        status: 'running', 
        port: PORT, 
        timestamp: new Date().toISOString() 
    });
});

// Запуск сервера
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('🚀 HTTP Server запущен!');
    console.log(`📱 Мини-приложение доступно по адресу: http://localhost:${PORT}`);
    console.log(`🔗 API статус: http://localhost:${PORT}/status`);
    console.log(`🎴 API карты: http://localhost:${PORT}/api/cards`);
    console.log(`📊 API расклады: http://localhost:${PORT}/api/spreads`);
    console.log('');
    console.log('💡 Для остановки нажмите Ctrl+C');
});

// Обработка ошибок
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`❌ Порт ${PORT} уже занят. Попробуйте другой порт.`);
    } else {
        console.log('❌ Ошибка сервера:', error.message);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Остановка сервера...');
    server.close(() => {
        console.log('✅ Сервер остановлен');
        process.exit(0);
    });
});
