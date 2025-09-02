# 🚀 Quick Start Guide

## 1. Setup

```bash
# Install dependencies
npm install

# Configure your bot token in config.js
# Replace 'YOUR_BOT_TOKEN_HERE' with your actual token
```

## 2. Run

### Windows
```bash
start.bat
```

### Manual
```bash
# Create SSL certificates
node create_ssl.js

# Start HTTPS server
node https_server.js

# In another terminal, start the bot
node bot.js
```

## 3. Test

1. Open `https://localhost:3000` in your browser
2. Find your bot in Telegram
3. Send `/start` command
4. Test the mini-app with `/miniapp`

## 4. Deploy

1. Set up a server with Node.js
2. Configure your domain and SSL certificates
3. Set webhook URL in Telegram
4. Deploy the code
5. Start the application

That's it! Your Telegram bot mini-app is ready! 🎉
