// Расширенные функции для бота Таро

// ===== СИСТЕМА ДОСТИЖЕНИЙ =====
class AchievementSystem {
    constructor() {
        this.achievements = {
            firstReading: { id: 'firstReading', name: 'Новичок', icon: '🌟', description: 'Первое гадание', unlocked: false, progress: 0, target: 1 },
            tenReadings: { id: 'tenReadings', name: 'Любитель', icon: '🔮', description: '10 гаданий', unlocked: false, progress: 0, target: 10 },
            fiftyReadings: { id: 'fiftyReadings', name: 'Эксперт', icon: '⭐', description: '50 гаданий', unlocked: false, progress: 0, target: 50 },
            hundredReadings: { id: 'hundredReadings', name: 'Мастер', icon: '👑', description: '100 гаданий', unlocked: false, progress: 0, target: 100 },
            adWatcher: { id: 'adWatcher', name: 'Рекламщик', icon: '📺', description: '50 реклам', unlocked: false, progress: 0, target: 50 },
            spender: { id: 'spender', name: 'Щедрый', icon: '💰', description: '1000 монет', unlocked: false, progress: 0, target: 1000 },
            social: { id: 'social', name: 'Социальный', icon: '👥', description: '5 друзей', unlocked: false, progress: 0, target: 5 },
            gamer: { id: 'gamer', name: 'Игрок', icon: '🎮', description: '10 игр', unlocked: false, progress: 0, target: 10 }
        };
        this.loadAchievements();
    }

    loadAchievements() {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            const savedAchievements = JSON.parse(saved);
            Object.keys(this.achievements).forEach(key => {
                if (savedAchievements[key]) {
                    this.achievements[key] = { ...this.achievements[key], ...savedAchievements[key] };
                }
            });
        }
    }

    saveAchievements() {
        localStorage.setItem('achievements', JSON.stringify(this.achievements));
    }

    updateProgress(type, amount = 1) {
        if (this.achievements[type]) {
            this.achievements[type].progress += amount;
            if (this.achievements[type].progress >= this.achievements[type].target && !this.achievements[type].unlocked) {
                this.achievements[type].unlocked = true;
                this.showAchievementNotification(this.achievements[type]);
                this.giveReward(this.achievements[type]);
            }
            this.saveAchievements();
            this.updateAchievementsDisplay();
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-popup">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>Достижение разблокировано!</h4>
                    <p>${achievement.name}</p>
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    giveReward(achievement) {
        const rewards = {
            firstReading: 50,
            tenReadings: 100,
            fiftyReadings: 500,
            hundredReadings: 1000,
            adWatcher: 200,
            spender: 300,
            social: 500,
            gamer: 150
        };
        
        const reward = rewards[achievement.id] || 0;
        if (reward > 0) {
            const newBalance = userBalance + reward;
            updateBalance(newBalance);
            showSuccess(`Получена награда: ${reward} монет за достижение "${achievement.name}"!`);
        }
    }

    updateAchievementsDisplay() {
        const grid = document.getElementById('achievementsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        Object.values(this.achievements).forEach(achievement => {
            const item = document.createElement('div');
            item.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            item.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-progress">${achievement.progress}/${achievement.target}</div>
            `;
            grid.appendChild(item);
        });
    }
}

// ===== РЕФЕРАЛЬНАЯ СИСТЕМА =====
class ReferralSystem {
    constructor() {
        this.userId = this.generateUserId();
        this.referralCode = this.generateReferralCode();
        this.referrals = this.loadReferrals();
        this.initReferralLink();
    }

    generateUserId() {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('userId', userId);
        }
        return userId;
    }

    generateReferralCode() {
        return this.userId.substr(-6).toUpperCase();
    }

    loadReferrals() {
        const saved = localStorage.getItem('referrals');
        return saved ? JSON.parse(saved) : { count: 0, earnings: 0, referrals: [] };
    }

    saveReferrals() {
        localStorage.setItem('referrals', JSON.stringify(this.referrals));
    }

    initReferralLink() {
        const referralLink = document.getElementById('referralLink');
        if (referralLink) {
            referralLink.value = `${window.location.origin}?ref=${this.referralCode}`;
        }
        
        // Проверяем реферальный код в URL
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');
        if (refCode && refCode !== this.referralCode) {
            this.processReferral(refCode);
        }
    }

    processReferral(refCode) {
        // Симуляция обработки реферального кода
        const referrerId = refCode.toLowerCase();
        if (!this.referrals.referrals.includes(referrerId)) {
            this.referrals.referrals.push(referrerId);
            this.referrals.count++;
            this.referrals.earnings += 200;
            this.saveReferrals();
            
            // Награждаем пользователя
            const newBalance = userBalance + 200;
            updateBalance(newBalance);
            showSuccess('Получено 200 монет за приглашение друга!');
            
            // Обновляем отображение
            this.updateReferralDisplay();
        }
    }

    updateReferralDisplay() {
        const referralsCount = document.getElementById('referralsCount');
        const referralEarnings = document.getElementById('referralEarnings');
        
        if (referralsCount) referralsCount.textContent = this.referrals.count;
        if (referralEarnings) referralEarnings.textContent = this.referrals.earnings;
    }

    copyReferralLink() {
        const referralLink = document.getElementById('referralLink');
        if (referralLink) {
            referralLink.select();
            document.execCommand('copy');
            showSuccess('Ссылка скопирована в буфер обмена!');
        }
    }
}

// ===== МИНИ-ИГРЫ =====
class MiniGames {
    constructor() {
        this.currentGame = null;
        this.gameStats = this.loadGameStats();
    }

    loadGameStats() {
        const saved = localStorage.getItem('gameStats');
        return saved ? JSON.parse(saved) : { gamesPlayed: 0, totalScore: 0, bestScores: {} };
    }

    saveGameStats() {
        localStorage.setItem('gameStats', JSON.stringify(this.gameStats));
    }

    startGame(gameType) {
        this.currentGame = gameType;
        hideAllSections();
        
        const miniGamesSection = document.getElementById('miniGamesSection');
        if (miniGamesSection) {
            miniGamesSection.style.display = 'block';
        }
        
        // Скрываем все игры
        document.querySelectorAll('.game-container').forEach(game => {
            game.style.display = 'none';
        });
        
        // Показываем выбранную игру
        const gameContainer = document.getElementById(`${gameType}Game`);
        if (gameContainer) {
            gameContainer.style.display = 'block';
        }
        
        // Инициализируем игру
        switch (gameType) {
            case 'guessCard':
                this.initGuessCardGame();
                break;
            case 'quiz':
                this.initQuizGame();
                break;
            case 'puzzle':
                this.initPuzzleGame();
                break;
        }
    }

    initGuessCardGame() {
        this.guessCardData = {
            currentCard: null,
            score: 0,
            attempts: 0,
            cards: []
        };
        
        // Загружаем карты для игры
        if (window.cardManager) {
            this.guessCardData.cards = window.cardManager.getAllCards().slice(0, 10);
        }
        
        this.updateGuessCardDisplay();
    }

    updateGuessCardDisplay() {
        const scoreElement = document.getElementById('gameScore');
        const attemptsElement = document.getElementById('gameAttempts');
        
        if (scoreElement) scoreElement.textContent = this.guessCardData.score;
        if (attemptsElement) attemptsElement.textContent = this.guessCardData.attempts;
    }

    showNextCard() {
        if (this.guessCardData.cards.length === 0) {
            this.endGuessCardGame();
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * this.guessCardData.cards.length);
        this.guessCardData.currentCard = this.guessCardData.cards[randomIndex];
        this.guessCardData.cards.splice(randomIndex, 1);
        
        // Показываем рубашку карты
        const cardBack = document.getElementById('cardBack');
        const gameCardImage = document.getElementById('gameCardImage');
        
        if (cardBack) cardBack.style.display = 'flex';
        if (gameCardImage) gameCardImage.style.display = 'none';
        
        // Создаем варианты ответов
        this.createGuessOptions();
    }

    createGuessOptions() {
        const optionsContainer = document.getElementById('gameOptions');
        if (!optionsContainer || !this.guessCardData.currentCard) return;
        
        // Создаем правильный ответ и 3 неправильных
        const correctAnswer = this.guessCardData.currentCard.name;
        const allCards = window.cardManager ? window.cardManager.getAllCards() : [];
        const wrongAnswers = allCards
            .filter(card => card.name !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(card => card.name);
        
        const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
        
        optionsContainer.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'game-option';
            button.textContent = option;
            button.addEventListener('click', () => this.checkGuess(option));
            optionsContainer.appendChild(button);
        });
    }

    checkGuess(guess) {
        if (!this.guessCardData.currentCard) return;
        
        this.guessCardData.attempts++;
        const isCorrect = guess === this.guessCardData.currentCard.name;
        
        if (isCorrect) {
            this.guessCardData.score += 10;
            showSuccess('Правильно! +10 очков');
        } else {
            showError(`Неправильно! Правильный ответ: ${this.guessCardData.currentCard.name}`);
        }
        
        this.updateGuessCardDisplay();
        
        // Показываем карту
        const cardBack = document.getElementById('cardBack');
        const gameCardImage = document.getElementById('gameCardImage');
        
        if (cardBack) cardBack.style.display = 'none';
        if (gameCardImage) {
            gameCardImage.src = this.guessCardData.currentCard.imagePath;
            gameCardImage.style.display = 'block';
        }
        
        // Подсвечиваем правильный ответ
        const options = document.querySelectorAll('.game-option');
        options.forEach(option => {
            if (option.textContent === this.guessCardData.currentCard.name) {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }
            option.disabled = true;
        });
        
        // Показываем кнопку следующей карты
        const nextCardBtn = document.getElementById('nextCard');
        if (nextCardBtn) nextCardBtn.style.display = 'inline-block';
    }

    endGuessCardGame() {
        this.gameStats.gamesPlayed++;
        this.gameStats.totalScore += this.guessCardData.score;
        
        if (!this.gameStats.bestScores.guessCard || this.guessCardData.score > this.gameStats.bestScores.guessCard) {
            this.gameStats.bestScores.guessCard = this.guessCardData.score;
        }
        
        this.saveGameStats();
        
        // Обновляем достижения
        if (window.achievementSystem) {
            window.achievementSystem.updateProgress('gamer');
        }
        
        showSuccess(`Игра завершена! Счет: ${this.guessCardData.score}`);
        
        // Показываем кнопку завершения
        const endGameBtn = document.getElementById('endGame');
        if (endGameBtn) endGameBtn.style.display = 'inline-block';
    }

    initQuizGame() {
        this.quizData = {
            currentQuestion: 0,
            score: 0,
            questions: this.generateQuizQuestions()
        };
        
        this.showQuizQuestion();
    }

    generateQuizQuestions() {
        return [
            {
                question: "Что означает карта 'Дурак' в прямом положении?",
                options: ["Начало нового пути", "Глупость", "Безрассудство", "Детство"],
                correct: 0
            },
            {
                question: "Сколько карт в колоде Таро?",
                options: ["72", "78", "56", "22"],
                correct: 1
            },
            {
                question: "Что символизирует карта 'Смерть'?",
                options: ["Физическую смерть", "Конец и начало", "Болезнь", "Потерю"],
                correct: 1
            },
            {
                question: "Какая карта означает любовь и отношения?",
                options: ["Императрица", "Влюбленные", "Солнце", "Звезда"],
                correct: 1
            },
            {
                question: "Что означает карта 'Башня'?",
                options: ["Стабильность", "Внезапные изменения", "Защиту", "Высоту"],
                correct: 1
            }
        ];
    }

    showQuizQuestion() {
        if (this.quizData.currentQuestion >= this.quizData.questions.length) {
            this.endQuizGame();
            return;
        }
        
        const question = this.quizData.questions[this.quizData.currentQuestion];
        
        const questionElement = document.getElementById('quizQuestion');
        const optionsContainer = document.getElementById('quizOptions');
        const currentQuestionElement = document.getElementById('currentQuestion');
        const totalQuestionsElement = document.getElementById('totalQuestions');
        const correctAnswersElement = document.getElementById('correctAnswers');
        
        if (questionElement) questionElement.textContent = question.question;
        if (currentQuestionElement) currentQuestionElement.textContent = this.quizData.currentQuestion + 1;
        if (totalQuestionsElement) totalQuestionsElement.textContent = this.quizData.questions.length;
        if (correctAnswersElement) correctAnswersElement.textContent = this.quizData.score;
        
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'quiz-option';
                button.textContent = option;
                button.addEventListener('click', () => this.checkQuizAnswer(index));
                optionsContainer.appendChild(button);
            });
        }
    }

    checkQuizAnswer(selectedIndex) {
        const question = this.quizData.questions[this.quizData.currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        if (isCorrect) {
            this.quizData.score++;
            showSuccess('Правильно!');
        } else {
            showError(`Неправильно! Правильный ответ: ${question.options[question.correct]}`);
        }
        
        // Подсвечиваем ответы
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === selectedIndex && !isCorrect) {
                option.classList.add('incorrect');
            }
            option.disabled = true;
        });
        
        // Показываем кнопку следующего вопроса
        const nextQuestionBtn = document.getElementById('nextQuestion');
        if (nextQuestionBtn) nextQuestionBtn.style.display = 'inline-block';
    }

    nextQuizQuestion() {
        this.quizData.currentQuestion++;
        this.showQuizQuestion();
        
        const nextQuestionBtn = document.getElementById('nextQuestion');
        if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
    }

    endQuizGame() {
        this.gameStats.gamesPlayed++;
        this.gameStats.totalScore += this.quizData.score;
        
        if (!this.gameStats.bestScores.quiz || this.quizData.score > this.gameStats.bestScores.quiz) {
            this.gameStats.bestScores.quiz = this.quizData.score;
        }
        
        this.saveGameStats();
        
        // Обновляем достижения
        if (window.achievementSystem) {
            window.achievementSystem.updateProgress('gamer');
        }
        
        const percentage = Math.round((this.quizData.score / this.quizData.questions.length) * 100);
        showSuccess(`Викторина завершена! Результат: ${this.quizData.score}/${this.quizData.questions.length} (${percentage}%)`);
        
        // Показываем кнопку завершения
        const finishQuizBtn = document.getElementById('finishQuiz');
        if (finishQuizBtn) finishQuizBtn.style.display = 'inline-block';
    }

    initPuzzleGame() {
        this.puzzleData = {
            moves: 0,
            startTime: null,
            solved: false,
            pieces: [1, 2, 3, 4, 5, 6, 7, 8, 0] // 0 = пустая клетка
        };
        
        this.createPuzzleGrid();
    }

    createPuzzleGrid() {
        const grid = document.getElementById('puzzleGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        this.puzzleData.pieces.forEach((piece, index) => {
            const div = document.createElement('div');
            div.className = `puzzle-piece ${piece === 0 ? 'empty' : ''}`;
            div.textContent = piece === 0 ? '' : piece;
            div.addEventListener('click', () => this.movePuzzlePiece(index));
            grid.appendChild(div);
        });
    }

    movePuzzlePiece(index) {
        if (this.puzzleData.solved) return;
        
        const emptyIndex = this.puzzleData.pieces.indexOf(0);
        const canMove = this.canMovePiece(index, emptyIndex);
        
        if (canMove) {
            // Меняем местами
            [this.puzzleData.pieces[index], this.puzzleData.pieces[emptyIndex]] = 
            [this.puzzleData.pieces[emptyIndex], this.puzzleData.pieces[index]];
            
            this.puzzleData.moves++;
            this.updatePuzzleDisplay();
            
            if (this.isPuzzleSolved()) {
                this.solvePuzzle();
            }
        }
    }

    canMovePiece(from, to) {
        const rowFrom = Math.floor(from / 3);
        const colFrom = from % 3;
        const rowTo = Math.floor(to / 3);
        const colTo = to % 3;
        
        return (Math.abs(rowFrom - rowTo) === 1 && colFrom === colTo) ||
               (Math.abs(colFrom - colTo) === 1 && rowFrom === rowTo);
    }

    isPuzzleSolved() {
        return this.puzzleData.pieces.every((piece, index) => piece === index + 1 || (index === 8 && piece === 0));
    }

    solvePuzzle() {
        this.puzzleData.solved = true;
        this.gameStats.gamesPlayed++;
        
        if (!this.gameStats.bestScores.puzzle || this.puzzleData.moves < this.gameStats.bestScores.puzzle) {
            this.gameStats.bestScores.puzzle = this.puzzleData.moves;
        }
        
        this.saveGameStats();
        
        // Обновляем достижения
        if (window.achievementSystem) {
            window.achievementSystem.updateProgress('gamer');
        }
        
        showSuccess(`Пазл решен! Ходов: ${this.puzzleData.moves}`);
    }

    updatePuzzleDisplay() {
        const movesElement = document.getElementById('puzzleMoves');
        if (movesElement) movesElement.textContent = this.puzzleData.moves;
        
        this.createPuzzleGrid();
    }

    shufflePuzzle() {
        // Простое перемешивание
        for (let i = this.puzzleData.pieces.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.puzzleData.pieces[i], this.puzzleData.pieces[j]] = 
            [this.puzzleData.pieces[j], this.puzzleData.pieces[i]];
        }
        
        this.puzzleData.moves = 0;
        this.puzzleData.solved = false;
        this.updatePuzzleDisplay();
    }
}

// ===== РАСШИРЕННЫЕ РАСКЛАДЫ =====
const extendedSpreads = {
    relationships: {
        name: 'Расклад на отношения',
        cards: 5,
        positions: ['Ваши чувства', 'Чувства партнера', 'Препятствия', 'Совет карт', 'Будущее отношений'],
        price: 150
    },
    career: {
        name: 'Расклад на карьеру',
        cards: 4,
        positions: ['Текущая ситуация', 'Возможности', 'Препятствия', 'Рекомендации'],
        price: 150
    },
    health: {
        name: 'Расклад на здоровье',
        cards: 3,
        positions: ['Физическое состояние', 'Эмоциональное состояние', 'Рекомендации'],
        price: 120
    }
};

// ===== ИНИЦИАЛИЗАЦИЯ СИСТЕМ =====
let achievementSystem;
let referralSystem;
let miniGames;

function initEnhancedFeatures() {
    // Инициализируем системы
    achievementSystem = new AchievementSystem();
    referralSystem = new ReferralSystem();
    miniGames = new MiniGames();
    
    // Делаем доступными глобально
    window.achievementSystem = achievementSystem;
    window.referralSystem = referralSystem;
    window.miniGames = miniGames;
    
    // Обновляем отображение
    achievementSystem.updateAchievementsDisplay();
    referralSystem.updateReferralDisplay();
    
    // Добавляем обработчики событий
    addEnhancedEventListeners();
}

function addEnhancedEventListeners() {
    // Копирование реферальной ссылки
    const copyReferralBtn = document.getElementById('copyReferralLink');
    if (copyReferralBtn) {
        copyReferralBtn.addEventListener('click', () => {
            referralSystem.copyReferralLink();
        });
    }
    
    // Мини-игры
    const startGameBtn = document.getElementById('startGame');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', () => {
            miniGames.showNextCard();
            startGameBtn.style.display = 'none';
        });
    }
    
    const nextCardBtn = document.getElementById('nextCard');
    if (nextCardBtn) {
        nextCardBtn.addEventListener('click', () => {
            miniGames.showNextCard();
            nextCardBtn.style.display = 'none';
        });
    }
    
    const endGameBtn = document.getElementById('endGame');
    if (endGameBtn) {
        endGameBtn.addEventListener('click', () => {
            showShopSection();
        });
    }
    
    // Викторина
    const startQuizBtn = document.getElementById('startQuiz');
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            miniGames.showQuizQuestion();
            startQuizBtn.style.display = 'none';
        });
    }
    
    const nextQuestionBtn = document.getElementById('nextQuestion');
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            miniGames.nextQuizQuestion();
        });
    }
    
    const finishQuizBtn = document.getElementById('finishQuiz');
    if (finishQuizBtn) {
        finishQuizBtn.addEventListener('click', () => {
            showShopSection();
        });
    }
    
    // Пазл
    const startPuzzleBtn = document.getElementById('startPuzzle');
    if (startPuzzleBtn) {
        startPuzzleBtn.addEventListener('click', () => {
            miniGames.puzzleData.startTime = Date.now();
            startPuzzleBtn.style.display = 'none';
            const shuffleBtn = document.getElementById('shufflePuzzle');
            if (shuffleBtn) shuffleBtn.style.display = 'inline-block';
        });
    }
    
    const shufflePuzzleBtn = document.getElementById('shufflePuzzle');
    if (shufflePuzzleBtn) {
        shufflePuzzleBtn.addEventListener('click', () => {
            miniGames.shufflePuzzle();
        });
    }
}

// Функции для запуска мини-игр
function startMiniGame(gameType) {
    if (miniGames) {
        miniGames.startGame(gameType);
    }
}

function showGameMenu() {
    showShopSection();
}

// Расширенные функции для обновления статистики
function updateUserStatsWithAchievements() {
    // Обновляем достижения при изменении статистики
    if (achievementSystem) {
        achievementSystem.updateProgress('firstReading', userStats.totalReadings);
        achievementSystem.updateProgress('tenReadings', userStats.totalReadings);
        achievementSystem.updateProgress('fiftyReadings', userStats.totalReadings);
        achievementSystem.updateProgress('hundredReadings', userStats.totalReadings);
        achievementSystem.updateProgress('adWatcher', userStats.adsWatched);
        achievementSystem.updateProgress('spender', userStats.totalSpent);
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Ждем инициализации основного приложения
    setTimeout(() => {
        initEnhancedFeatures();
    }, 1000);
});
