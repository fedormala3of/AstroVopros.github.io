// ДОПОЛНИТЕЛЬНЫЕ ИГРЫ И ФУНКЦИИ ДЛЯ ТАРО-БОТА

// Игра: Мистический лабиринт
function startMysticLabyrinthGame() {
    console.log('🌀 Запуск игры "Мистический лабиринт"');
    const cost = 40;
    const currentBalance = getCurrentBalance();
    
    if (currentBalance < cost) {
        showInsufficientBalance(cost, currentBalance);
        return;
    }
    
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const gameContent = document.createElement('div');
    gameContent.style.cssText = `
        background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
        color: white;
        padding: 40px;
        border-radius: 25px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        animation: slideInUp 0.5s ease-out;
    `;
    
    gameContent.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px; animation: float 2s ease-in-out infinite;">🌀</div>
        <h2 style="margin: 0 0 20px 0; font-size: 28px;">Мистический лабиринт</h2>
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Найдите выход из магического лабиринта!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <button onclick="startLabyrinth()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 15px 40px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            🌀 Начать поиск!
        </button>
        
        <button onclick="this.closest('.game-modal').remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Отмена
        </button>
    `;
    
    gameModal.appendChild(gameContent);
    document.body.appendChild(gameModal);
    
    function startLabyrinth() {
        deductCoins(cost);
        
        gameContent.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 20px; animation: spin 3s linear infinite;">🌀</div>
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">Исследуем лабиринт...</h2>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Ищем правильный путь...</p>
        `;
        
        setTimeout(() => {
            const paths = ['лево', 'право', 'прямо', 'назад'];
            const correctPath = Math.floor(Math.random() * 4);
            const userPath = Math.floor(Math.random() * 4);
            const isWin = correctPath === userPath;
            const reward = isWin ? 250 : 0;
            
            gameContent.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 20px;">${isWin ? '🏆' : '😔'}</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">${isWin ? 'Поздравляем!' : 'Попробуйте еще раз!'}</h2>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <div style="font-size: 18px; margin-bottom: 10px;">Правильный путь: ${paths[correctPath]}</div>
                    <div style="font-size: 16px; opacity: 0.9;">Ваш выбор: ${paths[userPath]}</div>
                </div>
                <p style="margin: 0 0 20px 0; font-size: 16px;">
                    ${isWin ? `Вы нашли выход! Выигрыш: ${reward} монет` : 'Лабиринт запутал вас...'}
                </p>
                <button onclick="this.closest('.game-modal').remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: 2px solid white;
                    color: white;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                ">
                    Закрыть
                </button>
            `;
            
            if (reward > 0) {
                addCoins(reward);
            }
        }, 3000);
    }
}

// Игра: Звездная карта
function startStarMapGame() {
    console.log('⭐ Запуск игры "Звездная карта"');
    const cost = 45;
    const currentBalance = getCurrentBalance();
    
    if (currentBalance < cost) {
        showInsufficientBalance(cost, currentBalance);
        return;
    }
    
    const constellations = [
        { name: 'Большая Медведица', symbol: '🐻', stars: '⭐⭐⭐⭐⭐⭐⭐' },
        { name: 'Орион', symbol: '🏹', stars: '⭐⭐⭐⭐⭐⭐' },
        { name: 'Кассиопея', symbol: '👑', stars: '⭐⭐⭐⭐⭐' },
        { name: 'Лебедь', symbol: '🦢', stars: '⭐⭐⭐⭐⭐⭐' },
        { name: 'Пегас', symbol: '🐎', stars: '⭐⭐⭐⭐⭐⭐⭐' },
        { name: 'Дракон', symbol: '🐉', stars: '⭐⭐⭐⭐⭐⭐' }
    ];
    
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const gameContent = document.createElement('div');
    gameContent.style.cssText = `
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 40px;
        border-radius: 25px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        animation: slideInUp 0.5s ease-out;
    `;
    
    gameContent.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px; animation: float 2s ease-in-out infinite;">⭐</div>
        <h2 style="margin: 0 0 20px 0; font-size: 28px;">Звездная карта</h2>
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Угадайте созвездие по звездам!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <button onclick="showConstellation()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 15px 40px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            ⭐ Показать звезды!
        </button>
        
        <button onclick="this.closest('.game-modal').remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Отмена
        </button>
    `;
    
    gameModal.appendChild(gameContent);
    document.body.appendChild(gameModal);
    
    function showConstellation() {
        deductCoins(cost);
        
        const randomConstellation = Math.floor(Math.random() * constellations.length);
        const constellation = constellations[randomConstellation];
        
        gameContent.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">${constellation.stars}</div>
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">Какое это созвездие?</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                ${constellations.map((const, index) => `
                    <button class="constellation-choice" data-const="${index}" style="
                        background: rgba(255,255,255,0.2);
                        border: 2px solid rgba(255,255,255,0.3);
                        color: white;
                        padding: 15px;
                        border-radius: 15px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                       onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        ${const.symbol} ${const.name}
                    </button>
                `).join('')}
            </div>
        `;
        
        gameContent.querySelectorAll('.constellation-choice').forEach(button => {
            button.addEventListener('click', function() {
                const selectedConst = parseInt(this.dataset.const);
                const isWin = selectedConst === randomConstellation;
                const reward = isWin ? 300 : 0;
                
                gameContent.innerHTML = `
                    <div style="font-size: 60px; margin-bottom: 20px;">${isWin ? '🌟' : '⭐'}</div>
                    <h2 style="margin: 0 0 20px 0; font-size: 24px;">${isWin ? 'Правильно!' : 'Неверно!'}</h2>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <div style="font-size: 18px; margin-bottom: 10px;">Правильный ответ: ${constellation.symbol} ${constellation.name}</div>
                        <div style="font-size: 16px; opacity: 0.9;">Ваш выбор: ${constellations[selectedConst].symbol} ${constellations[selectedConst].name}</div>
                    </div>
                    <p style="margin: 0 0 20px 0; font-size: 16px;">
                        ${isWin ? `Отлично! Выигрыш: ${reward} монет` : 'Попробуйте еще раз!'}
                    </p>
                    <button onclick="this.closest('.game-modal').remove()" style="
                        background: rgba(255,255,255,0.2);
                        border: 2px solid white;
                        color: white;
                        padding: 12px 30px;
                        border-radius: 25px;
                        cursor: pointer;
                        font-size: 16px;
                    ">
                        Закрыть
                    </button>
                `;
                
                if (reward > 0) {
                    addCoins(reward);
                }
            });
        });
    }
}

// Игра: Кристальная память
function startCrystalMemoryGame() {
    console.log('💎 Запуск игры "Кристальная память"');
    const cost = 50;
    const currentBalance = getCurrentBalance();
    
    if (currentBalance < cost) {
        showInsufficientBalance(cost, currentBalance);
        return;
    }
    
    const crystals = ['💎', '🔮', '💠', '🔷', '🔶', '💜', '💙', '💚'];
    
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const gameContent = document.createElement('div');
    gameContent.style.cssText = `
        background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
        color: white;
        padding: 40px;
        border-radius: 25px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        animation: slideInUp 0.5s ease-out;
    `;
    
    gameContent.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px; animation: float 2s ease-in-out infinite;">💎</div>
        <h2 style="margin: 0 0 20px 0; font-size: 28px;">Кристальная память</h2>
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Запомните последовательность кристаллов!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <button onclick="startMemoryGame()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 15px 40px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            💎 Начать игру!
        </button>
        
        <button onclick="this.closest('.game-modal').remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Отмена
        </button>
    `;
    
    gameModal.appendChild(gameContent);
    document.body.appendChild(gameModal);
    
    function startMemoryGame() {
        deductCoins(cost);
        
        const sequence = [];
        for (let i = 0; i < 4; i++) {
            sequence.push(Math.floor(Math.random() * crystals.length));
        }
        
        // Показываем последовательность
        let currentIndex = 0;
        gameContent.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">${crystals[sequence[currentIndex]]}</div>
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">Запоминайте последовательность...</h2>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Кристалл ${currentIndex + 1} из 4</p>
        `;
        
        const showNext = () => {
            currentIndex++;
            if (currentIndex < sequence.length) {
                setTimeout(() => {
                    gameContent.innerHTML = `
                        <div style="font-size: 60px; margin-bottom: 20px;">${crystals[sequence[currentIndex]]}</div>
                        <h2 style="margin: 0 0 20px 0; font-size: 24px;">Запоминайте последовательность...</h2>
                        <p style="margin: 0; font-size: 16px; opacity: 0.9;">Кристалл ${currentIndex + 1} из 4</p>
                    `;
                    showNext();
                }, 1000);
            } else {
                setTimeout(() => {
                    showUserInput(sequence);
                }, 1000);
            }
        };
        
        showNext();
    }
    
    function showUserInput(sequence) {
        gameContent.innerHTML = `
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">Повторите последовательность:</h2>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
                ${crystals.map((crystal, index) => `
                    <button class="crystal-choice" data-crystal="${index}" style="
                        background: rgba(255,255,255,0.2);
                        border: 2px solid rgba(255,255,255,0.3);
                        color: white;
                        padding: 20px;
                        border-radius: 15px;
                        cursor: pointer;
                        font-size: 24px;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                       onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        ${crystal}
                    </button>
                `).join('')}
            </div>
            <div id="user-sequence" style="font-size: 24px; margin-bottom: 20px;"></div>
        `;
        
        let userSequence = [];
        const userSequenceDiv = document.getElementById('user-sequence');
        
        gameContent.querySelectorAll('.crystal-choice').forEach(button => {
            button.addEventListener('click', function() {
                const crystalIndex = parseInt(this.dataset.crystal);
                userSequence.push(crystalIndex);
                userSequenceDiv.textContent = userSequence.map(i => crystals[i]).join(' ');
                
                if (userSequence.length === sequence.length) {
                    checkSequence(sequence, userSequence);
                }
            });
        });
    }
    
    function checkSequence(sequence, userSequence) {
        const isCorrect = sequence.every((crystal, index) => crystal === userSequence[index]);
        const reward = isCorrect ? 400 : 0;
        
        gameContent.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">${isCorrect ? '🎉' : '😔'}</div>
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">${isCorrect ? 'Отлично!' : 'Неверно!'}</h2>
            <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                <div style="font-size: 18px; margin-bottom: 10px;">Правильная последовательность:</div>
                <div style="font-size: 24px; margin-bottom: 10px;">${sequence.map(i => crystals[i]).join(' ')}</div>
                <div style="font-size: 18px; margin-bottom: 10px;">Ваша последовательность:</div>
                <div style="font-size: 24px;">${userSequence.map(i => crystals[i]).join(' ')}</div>
            </div>
            <p style="margin: 0 0 20px 0; font-size: 16px;">
                ${isCorrect ? `Память работает отлично! Выигрыш: ${reward} монет` : 'Попробуйте еще раз!'}
            </p>
            <button onclick="this.closest('.game-modal').remove()" style="
                background: rgba(255,255,255,0.2);
                border: 2px solid white;
                color: white;
                padding: 12px 30px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
            ">
                Закрыть
            </button>
        `;
        
        if (reward > 0) {
            addCoins(reward);
        }
    }
}

// Игра: Руническая викторина
function startRunicQuizGame() {
    console.log('📚 Запуск игры "Руническая викторина"');
    const cost = 55;
    const currentBalance = getCurrentBalance();
    
    if (currentBalance < cost) {
        showInsufficientBalance(cost, currentBalance);
        return;
    }
    
    const questions = [
        {
            question: 'Что означает руна Феху?',
            options: ['Богатство', 'Сила', 'Путешествие', 'Бог'],
            correct: 0
        },
        {
            question: 'Какая руна символизирует силу?',
            options: ['Феху', 'Уруз', 'Турисаз', 'Ансуз'],
            correct: 1
        },
        {
            question: 'Что означает руна Райдо?',
            options: ['Богатство', 'Сила', 'Путешествие', 'Бог'],
            correct: 2
        },
        {
            question: 'Какая руна связана с богом?',
            options: ['Феху', 'Уруз', 'Турисаз', 'Ансуз'],
            correct: 3
        },
        {
            question: 'Что символизирует руна Кеназ?',
            options: ['Богатство', 'Факел', 'Путешествие', 'Бог'],
            correct: 1
        }
    ];
    
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const gameContent = document.createElement('div');
    gameContent.style.cssText = `
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        color: white;
        padding: 40px;
        border-radius: 25px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        animation: slideInUp 0.5s ease-out;
    `;
    
    gameContent.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px; animation: float 2s ease-in-out infinite;">📚</div>
        <h2 style="margin: 0 0 20px 0; font-size: 28px;">Руническая викторина</h2>
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Ответьте на вопросы о рунах!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <button onclick="startQuiz()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 15px 40px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            📚 Начать викторину!
        </button>
        
        <button onclick="this.closest('.game-modal').remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Отмена
        </button>
    `;
    
    gameModal.appendChild(gameContent);
    document.body.appendChild(gameModal);
    
    function startQuiz() {
        deductCoins(cost);
        
        let currentQuestion = 0;
        let correctAnswers = 0;
        
        function showQuestion() {
            const question = questions[currentQuestion];
            
            gameContent.innerHTML = `
                <div style="font-size: 40px; margin-bottom: 20px;">📚</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">Вопрос ${currentQuestion + 1} из ${questions.length}</h2>
                <p style="margin: 0 0 30px 0; font-size: 18px; font-weight: 600;">${question.question}</p>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-answer="${index}" style="
                            background: rgba(255,255,255,0.2);
                            border: 2px solid rgba(255,255,255,0.3);
                            color: white;
                            padding: 15px;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 16px;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
            
            gameContent.querySelectorAll('.quiz-option').forEach(button => {
                button.addEventListener('click', function() {
                    const selectedAnswer = parseInt(this.dataset.answer);
                    const isCorrect = selectedAnswer === question.correct;
                    
                    if (isCorrect) {
                        correctAnswers++;
                    }
                    
                    currentQuestion++;
                    
                    if (currentQuestion < questions.length) {
                        setTimeout(() => {
                            showQuestion();
                        }, 1000);
                    } else {
                        showResults();
                    }
                });
            });
        }
        
        function showResults() {
            const percentage = Math.round((correctAnswers / questions.length) * 100);
            let reward = 0;
            
            if (percentage >= 80) reward = 500;
            else if (percentage >= 60) reward = 300;
            else if (percentage >= 40) reward = 150;
            else reward = 50;
            
            gameContent.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 20px;">${percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : percentage >= 40 ? '🥉' : '📚'}</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">Результаты викторины</h2>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <div style="font-size: 18px; margin-bottom: 10px;">Правильных ответов: ${correctAnswers} из ${questions.length}</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">Процент: ${percentage}%</div>
                    <div style="font-size: 18px;">Выигрыш: ${reward} монет</div>
                </div>
                <p style="margin: 0 0 20px 0; font-size: 16px;">
                    ${percentage >= 80 ? 'Отличные знания рун!' : 
                      percentage >= 60 ? 'Хорошие знания!' : 
                      percentage >= 40 ? 'Неплохо!' : 'Изучайте руны дальше!'}
                </p>
                <button onclick="this.closest('.game-modal').remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: 2px solid white;
                    color: white;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                ">
                    Закрыть
                </button>
            `;
            
            addCoins(reward);
        }
        
        showQuestion();
    }
}

// Игра: Таро-квиз
function startTarotQuizGame() {
    console.log('🎴 Запуск игры "Таро-квиз"');
    const cost = 60;
    const currentBalance = getCurrentBalance();
    
    if (currentBalance < cost) {
        showInsufficientBalance(cost, currentBalance);
        return;
    }
    
    const questions = [
        {
            question: 'Сколько карт в колоде Таро?',
            options: ['72', '78', '84', '90'],
            correct: 1
        },
        {
            question: 'Сколько карт в Старших Арканах?',
            options: ['20', '21', '22', '23'],
            correct: 2
        },
        {
            question: 'Что означает карта "Дурак"?',
            options: ['Глупость', 'Начало пути', 'Конец', 'Мудрость'],
            correct: 1
        },
        {
            question: 'Какая карта означает любовь?',
            options: ['Императрица', 'Влюбленные', 'Солнце', 'Луна'],
            correct: 1
        },
        {
            question: 'Что символизирует карта "Смерть"?',
            options: ['Конец жизни', 'Трансформация', 'Болезнь', 'Потеря'],
            correct: 1
        }
    ];
    
    const gameModal = document.createElement('div');
    gameModal.className = 'game-modal';
    gameModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const gameContent = document.createElement('div');
    gameContent.style.cssText = `
        background: linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%);
        color: white;
        padding: 40px;
        border-radius: 25px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        animation: slideInUp 0.5s ease-out;
    `;
    
    gameContent.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px; animation: float 2s ease-in-out infinite;">🎴</div>
        <h2 style="margin: 0 0 20px 0; font-size: 28px;">Таро-квиз</h2>
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Проверьте знания карт Таро!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <button onclick="startTarotQuiz()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 15px 40px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            🎴 Начать квиз!
        </button>
        
        <button onclick="this.closest('.game-modal').remove()" style="
            background: rgba(255,255,255,0.2);
            border: 2px solid white;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
            Отмена
        </button>
    `;
    
    gameModal.appendChild(gameContent);
    document.body.appendChild(gameModal);
    
    function startTarotQuiz() {
        deductCoins(cost);
        
        let currentQuestion = 0;
        let correctAnswers = 0;
        
        function showQuestion() {
            const question = questions[currentQuestion];
            
            gameContent.innerHTML = `
                <div style="font-size: 40px; margin-bottom: 20px;">🎴</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">Вопрос ${currentQuestion + 1} из ${questions.length}</h2>
                <p style="margin: 0 0 30px 0; font-size: 18px; font-weight: 600;">${question.question}</p>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-answer="${index}" style="
                            background: rgba(255,255,255,0.2);
                            border: 2px solid rgba(255,255,255,0.3);
                            color: white;
                            padding: 15px;
                            border-radius: 15px;
                            cursor: pointer;
                            font-size: 16px;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                           onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            `;
            
            gameContent.querySelectorAll('.quiz-option').forEach(button => {
                button.addEventListener('click', function() {
                    const selectedAnswer = parseInt(this.dataset.answer);
                    const isCorrect = selectedAnswer === question.correct;
                    
                    if (isCorrect) {
                        correctAnswers++;
                    }
                    
                    currentQuestion++;
                    
                    if (currentQuestion < questions.length) {
                        setTimeout(() => {
                            showQuestion();
                        }, 1000);
                    } else {
                        showResults();
                    }
                });
            });
        }
        
        function showResults() {
            const percentage = Math.round((correctAnswers / questions.length) * 100);
            let reward = 0;
            
            if (percentage >= 80) reward = 600;
            else if (percentage >= 60) reward = 400;
            else if (percentage >= 40) reward = 200;
            else reward = 100;
            
            gameContent.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 20px;">${percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : percentage >= 40 ? '🥉' : '🎴'}</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">Результаты квиза</h2>
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <div style="font-size: 18px; margin-bottom: 10px;">Правильных ответов: ${correctAnswers} из ${questions.length}</div>
                    <div style="font-size: 18px; margin-bottom: 10px;">Процент: ${percentage}%</div>
                    <div style="font-size: 18px;">Выигрыш: ${reward} монет</div>
                </div>
                <p style="margin: 0 0 20px 0; font-size: 16px;">
                    ${percentage >= 80 ? 'Отличные знания Таро!' : 
                      percentage >= 60 ? 'Хорошие знания!' : 
                      percentage >= 40 ? 'Неплохо!' : 'Изучайте Таро дальше!'}
                </p>
                <button onclick="this.closest('.game-modal').remove()" style="
                    background: rgba(255,255,255,0.2);
                    border: 2px solid white;
                    color: white;
                    padding: 12px 30px;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 16px;
                ">
                    Закрыть
                </button>
            `;
            
            addCoins(reward);
        }
        
        showQuestion();
    }
}
