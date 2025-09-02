@echo off
title Telegram Bot - GitHub Pages Version
chcp 65001 >nul

echo.
echo ========================================
echo Telegram Bot - GitHub Pages Version
echo ========================================
echo.

echo Starting Telegram bot...
echo Mini-app is available at: https://fedormala3of.github.io/AstroVopros.github.io/
echo.

start "Telegram Bot" cmd /k "cd /d %~dp0 && node bot.js"

echo.
echo ✅ Bot started!
echo.
echo 📱 Mini-app: https://fedormala3of.github.io/AstroVopros.github.io/
echo 🤖 Telegram Bot: Running with polling
echo.
echo 💡 Press any key to close this window...
pause >nul
