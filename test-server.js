// Простой HTTP сервер для тестирования мини-приложения
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME типы
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Если запрашивается корень, показываем test-navigation.html
    if (filePath === './') {
        filePath = './test-navigation.html';
    }
    
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <html>
                        <head><title>404 - Файл не найден</title></head>
                        <body>
                            <h1>404 - Файл не найден</h1>
                            <p>Запрашиваемый файл: ${filePath}</p>
                            <p><a href="/">Вернуться на главную</a></p>
                        </body>
                    </html>
                `);
            } else {
                res.writeHead(500);
                res.end(`Ошибка сервера: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Тестовый сервер запущен на http://localhost:${PORT}`);
    console.log(`📱 Откройте http://localhost:${PORT} для тестирования навигации`);
    console.log(`🔧 Нажмите Ctrl+C для остановки сервера`);
});

// Обработка завершения процесса
process.on('SIGINT', () => {
    console.log('\n🛑 Останавливаем сервер...');
    server.close(() => {
        console.log('✅ Сервер остановлен');
        process.exit(0);
    });
});
