# 🔮 Telegram Bot Mini App

A simple Telegram bot with a mini-app for Tarot card readings.

## ✨ Features

- 🤖 **Telegram Bot** - Full bot functionality with webhook support
- 🔮 **Tarot Reading** - Interactive card readings with beautiful UI
- 📱 **Mini App** - Responsive web interface integrated with Telegram
- 🔐 **HTTPS Server** - Secure SSL-enabled server
- 🎨 **Modern UI** - Beautiful animations and responsive design
- 💰 **Coin System** - Virtual currency for readings
- 📺 **Ad System** - Watch ads to earn coins or get free readings
- 📊 **Ad Analytics** - Track views, clicks, completions, and skip rates
- 🎯 **Daily Bonuses** - Earn coins daily and invite friends
- 📈 **Statistics** - Export ad performance data
- 🎴 **Card Selection** - Choose your own cards for readings
- 🖼️ **Real Card Images** - Beautiful card images from local folder
- 🔀 **Card Shuffling** - Shuffle and select cards manually

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Telegram Bot Token (from @BotFather)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd telegram-bot1
```

2. Install dependencies:
```bash
npm install
```

3. Configure your bot:
   - Edit `config.js` and add your bot token
   - Set your webhook URL

4. Start the application:
```bash
# Windows - Start everything
start_all.bat

# Or manually
node http_server.js
node bot.js
```

## 🌐 GitHub Pages Deployment

The mini-app is deployed on GitHub Pages at: [https://fedormala3of.github.io/AstroVopros.github.io/](https://fedormala3of.github.io/AstroVopros.github.io/)

### Features:
- ✅ **HTTPS enabled** - Works with Telegram Web App
- ✅ **Standalone version** - No server required
- ✅ **Full functionality** - All 78 Tarot cards
- ✅ **Beautiful UI** - Responsive design
- ✅ **Telegram integration** - Native Web App support

## 📱 Bot Commands

- `/start` - Start using the bot
- `/one_card` - Single card reading (50 coins)
- `/three_cards` - Three card spread (100 coins)
- `/celtic_cross` - Celtic cross spread (200 coins)
- `/balance` - Show coin balance
- `/help` - Show help
- `/miniapp` - Open mini-app

## 🎴 Reading Types

### 1. Single Card (50 coins)
- Simple answer to a question
- Quick daily guidance
- Perfect for beginners

### 2. Three Cards (100 coins)
- Past, present, future
- Timeline analysis
- Deeper insights

### 3. Celtic Cross (200 coins)
- 10 cards for detailed analysis
- Comprehensive reading
- Professional-level guidance

## 🔧 Project Structure

```
telegram-bot1/
├── bot.js              # Main bot file
├── https_server.js     # HTTPS server for mini-app
├── create_ssl.js       # SSL certificate generator
├── start.bat           # Windows startup script
├── config.js           # Bot configuration
├── mini_app/           # Mini-app files
│   ├── index.html      # Main HTML
│   ├── script.js       # JavaScript logic
│   └── styles.css      # CSS styles
├── package.json        # Dependencies
└── README.md          # This file
```

## 🌐 Mini-App

The mini-app is accessible at: `https://localhost:3000`

Features:
- Interactive Tarot card selection
- Beautiful card animations
- Responsive design
- Multiple reading types
- Telegram Web App integration

## 💰 Coin System

- **Starting balance**: 1000 coins
- **Single card**: 50 coins
- **Three cards**: 100 coins
- **Celtic cross**: 200 coins

## 📺 Ad System

### Watch Ads for Free Readings
- **Free Reading**: Watch a 15-second ad to get a free tarot reading
- **Earn Coins**: Watch ads to earn 50+ coins
- **Ad Rewards**: Different ads give different coin amounts

### Ad Analytics
- **Views**: Track total ad impressions
- **Completions**: Monitor ad completion rates
- **Clicks**: Track user engagement with ads
- **Skip Rate**: Monitor ad skip behavior
- **Export Data**: Download statistics as JSON

### Earning Options
- **Watch Ads**: 50 coins per ad
- **Daily Bonus**: 100 coins per day
- **Invite Friends**: 200 coins per referral

## 🎴 Card Selection System

### Interactive Card Selection
- **Manual Selection**: Choose your own cards for readings
- **Real Images**: Beautiful card images from local folder
- **Card Shuffling**: Shuffle cards to get random selection
- **Visual Feedback**: See selected cards with checkmarks
- **Card Management**: Add/remove cards from selection

### Card Categories
- **Major Arcana**: 22 cards (Шут, Маг, Императрица, etc.)
- **Cups**: 14 cards (эмоции, любовь, отношения)
- **Swords**: 14 cards (мышление, конфликты, решения)
- **Pentacles**: 14 cards (материальные дела, работа, деньги)
- **Wands**: 14 cards (энергия, творчество, амбиции)

### Features
- **78 Total Cards**: Complete Tarot deck
- **Card Meanings**: Detailed interpretations for each card
- **Image Fallback**: Shows card back if image fails to load
- **Selection Limits**: Enforces correct number of cards per spread

## 🔐 SSL Certificates

The app automatically generates self-signed SSL certificates for HTTPS. For production, replace with proper certificates.

## 🧪 Testing

### Test the bot
1. Start the bot: `node bot.js`
2. Find your bot in Telegram
3. Send `/start` command
4. Test the readings

### Test the mini-app
1. Start HTTPS server: `node https_server.js`
2. Open `https://localhost:3000/`
3. Test all features

## 🚨 Troubleshooting

### SSL Certificate Issues
If you get SSL errors:
```bash
node create_ssl.js
```

### Bot not responding
1. Check your token in `config.js`
2. Make sure the bot is running
3. Check logs for errors

### Dependencies issues
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## 📋 Requirements

- **Node.js** version 14.0.0 or higher
- **npm** for dependency management
- **Telegram Bot Token** from @BotFather

## 🔮 Development

To run in development mode:

```bash
# Create SSL certificates
node create_ssl.js

# Start HTTPS server
node https_server.js

# In another terminal, start the bot
node bot.js
```

## 🚀 Deployment

1. Set up a server with Node.js
2. Configure your domain and SSL certificates
3. Set webhook URL in Telegram
4. Deploy the code
5. Start the application

## 📚 Resources

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api)
- [Tarot Cards](https://en.wikipedia.org/wiki/Tarot)

## 🤝 Contributing

Pull requests are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own bots!

---

**🔮 The bot is ready to use! Trust your intuition and enjoy Tarot card readings!**