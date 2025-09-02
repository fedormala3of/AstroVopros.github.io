@echo off
echo Starting Telegram Bot with Card Selection...
echo.
echo Step 1: Installing dependencies (if not already installed)...
call npm install
echo.
echo Step 2: Starting Telegram Bot...
echo Mini-app now includes:
echo - Interactive card selection
echo - Real card images from img/ folder
echo - Manual card shuffling
echo - Beautiful card interface
echo.
start cmd /k "node bot.js"
echo.
echo Bot is starting in a separate window.
echo Mini-app is hosted on GitHub Pages with card selection.
echo.
pause
