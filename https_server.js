const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3443;

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
    const { tarotCards } = require('./bot.js');
    res.json(tarotCards);
});

// API для получения раскладов
app.get('/api/spreads', (req, res) => {
    const { spreads } = require('./bot.js');
    res.json(spreads);
});

// API для гадания
app.post('/api/reading', (req, res) => {
    const { performReading } = require('./bot.js');
    const { spreadType, question } = req.body;
    
    if (!spreadType || !question) {
        return res.status(400).json({ error: 'Необходимы spreadType и question' });
    }
    
    try {
        const interpretation = performReading(spreadType, question);
        res.json({ success: true, interpretation });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка гадания' });
    }
});

// Проверяем SSL сертификаты
function checkSSLCerts() {
    const keyPath = path.join(__dirname, 'key.pem');
    const certPath = path.join(__dirname, 'cert.pem');
    
    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
        console.error('❌ SSL сертификаты не найдены!');
        console.log('💡 Запустите: node create_ssl_simple.js');
        process.exit(1);
    }
    
    try {
        // Проверяем, что файлы можно прочитать
        const keyContent = fs.readFileSync(keyPath, 'utf8');
        const certContent = fs.readFileSync(certPath, 'utf8');
        
        // Проверяем формат
        if (!keyContent.includes('-----BEGIN RSA PRIVATE KEY-----') || 
            !certContent.includes('-----BEGIN CERTIFICATE-----')) {
            console.error('❌ SSL сертификаты повреждены!');
            console.log('💡 Запустите: node create_ssl_simple.js');
            process.exit(1);
        }
        
        console.log('✅ SSL сертификаты проверены');
    } catch (error) {
        console.error('❌ Ошибка чтения SSL сертификатов:', error.message);
        console.log('💡 Запустите: node create_ssl_simple.js');
        process.exit(1);
    }
}

// Создаем папку mini_app если её нет
function createMiniAppFolder() {
    const miniAppPath = path.join(__dirname, 'mini_app');
    if (!fs.existsSync(miniAppPath)) {
        fs.mkdirSync(miniAppPath);
        console.log('📁 Папка mini_app создана');
    }
}

// Создаем папку mini_app если её нет
createMiniAppFolder();

// Проверяем SSL сертификаты
checkSSLCerts();

// Запускаем HTTPS сервер с обработкой ошибок
try {
    const options = {
        key: fs.readFileSync(path.join(__dirname, 'key.pem'), 'utf8'),
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem'), 'utf8')
    };

    const server = https.createServer(options, app);
    
    server.listen(PORT, () => {
        console.log(`🚀 HTTPS сервер запущен на порту ${PORT}`);
        console.log(`📱 Мини-апп: https://localhost:${PORT}/`);
        console.log(`🔐 SSL сертификаты активны`);
        console.log('💡 Для остановки нажмите Ctrl+C');
    });
    
    // Обработка ошибок сервера
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`❌ Порт ${PORT} уже занят!`);
            console.log('💡 Попробуйте другой порт или остановите процесс на этом порту');
        } else {
            console.error('❌ Ошибка HTTPS сервера:', error.message);
        }
        process.exit(1);
    });
    
} catch (error) {
    console.error('❌ Критическая ошибка при запуске HTTPS сервера:', error.message);
    console.log('💡 Проверьте SSL сертификаты: node check_ssl.js');
    process.exit(1);
}

module.exports = app;
