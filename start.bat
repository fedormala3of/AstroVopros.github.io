@echo off
title Telegram Bot Mini App
chcp 65001 >nul

echo.
echo ========================================
echo Telegram Bot Mini App - Starting
echo ========================================
echo.

echo Step 1: Creating SSL certificates...
node create_ssl.js
if errorlevel 1 (
    echo ❌ Failed to create SSL certificates
    pause
    exit /b 1
)

echo.
echo Step 2: Starting HTTPS server...
node https_server.js