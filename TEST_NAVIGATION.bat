@echo off
echo 🔮 Запуск тестового сервера для проверки навигации...
echo.
echo 📱 Откройте http://localhost:8080 в браузере
echo 🔧 Нажмите Ctrl+C для остановки сервера
echo.
cd /d "%~dp0"
node test-server.js
pause
