@echo off
title Telegram Bot Mini App - Full Start
chcp 65001 >nul

echo.
echo ========================================
echo Telegram Bot Mini App - Starting All
echo ========================================
echo.

echo Starting HTTP server...
start "HTTP Server" cmd /k "cd /d %~dp0 && node http_server.js"

echo.
echo Waiting 3 seconds for server to start...
timeout /t 3 /nobreak >nul

echo Starting Telegram bot...
start "Telegram Bot" cmd /k "cd /d %~dp0 && node bot.js"

echo.
echo ✅ Both servers started!
echo.
echo 📱 HTTP Server: http://localhost:3000
echo 🤖 Telegram Bot: Running with polling
echo.
echo 💡 Press any key to close this window...
pause >nul
