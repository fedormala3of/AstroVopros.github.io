@echo off
echo 🔍 Проверка файлов для GitHub Pages...
echo.

echo 📁 Основные файлы:
if exist "index.html" (
    echo ✅ index.html - НАЙДЕН
) else (
    echo ❌ index.html - НЕ НАЙДЕН
)

if exist "script.js" (
    echo ✅ script.js - НАЙДЕН
) else (
    echo ❌ script.js - НЕ НАЙДЕН
)

if exist "styles.css" (
    echo ✅ styles.css - НАЙДЕН
) else (
    echo ❌ styles.css - НЕ НАЙДЕН
)

echo.
echo 🔧 Дополнительные файлы:
if exist "config.js" echo ✅ config.js
if exist "standalone.js" echo ✅ standalone.js
if exist "ad-manager.js" echo ✅ ad-manager.js
if exist "card-manager.js" echo ✅ card-manager.js
if exist "enhanced-features.js" echo ✅ enhanced-features.js
if exist "notifications.js" echo ✅ notifications.js

echo.
echo 🖼️ Папка с изображениями:
if exist "img" (
    echo ✅ img/ - НАЙДЕНА
) else (
    echo ❌ img/ - НЕ НАЙДЕНА
)

echo.
echo 🎯 Проверка навигации в index.html:
findstr /C:"bottom-nav" index.html >nul
if %errorlevel%==0 (
    echo ✅ Нижнее меню найдено в index.html
) else (
    echo ❌ Нижнее меню НЕ найдено в index.html
)

findstr /C:"simpleNavigation" index.html >nul
if %errorlevel%==0 (
    echo ✅ Резервная навигация найдена в index.html
) else (
    echo ❌ Резервная навигация НЕ найдена в index.html
)

echo.
echo 📋 Готово к загрузке на GitHub!
echo 🌐 Сайт: https://fedormala3of.github.io/AstroVopros.github.io/
echo.
pause
