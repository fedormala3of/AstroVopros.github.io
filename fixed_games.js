// Исправленные функции игр

// Игра: Колесо фортуны
function startWheelOfFortuneGame() {
    console.log('🎡 Запуск игры "Колесо фортуны"');
    const cost = 35;
    const currentBalance = getCurrentBalance();
    
    if (currentBalance < cost) {
        showInsufficientBalance(cost, currentBalance);
        return;
    }
    
    const prizes = [
        { name: 'Малый приз', reward: 50, color: '#f39c12' },
        { name: 'Средний приз', reward: 100, color: '#e74c3c' },
        { name: 'Большой приз', reward: 150, color: '#9b59b6' },
        { name: 'Супер приз', reward: 200, color: '#2ecc71' },
        { name: 'Удача', reward: 25, color: '#3498db' },
        { name: 'Бонус', reward: 75, color: '#e67e22' },
        { name: 'Джекпот', reward: 300, color: '#f1c40f' },
        { name: 'Утешительный', reward: 10, color: '#95a5a6' }
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
        background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
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
        <div style="font-size: 60px; margin-bottom: 20px; animation: float 2s ease-in-out infinite;">🎡</div>
        <h2 style="margin: 0 0 20px 0; font-size: 28px;">Колесо фортуны</h2>
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Крутите колесо и выигрывайте призы!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <button class="spin-wheel-btn" style="
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
            🎡 Крутить колесо!
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
    
    // Добавляем обработчик события для кнопки
    gameContent.querySelector('.spin-wheel-btn').addEventListener('click', function() {
        deductCoins(cost);
        
        gameContent.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 20px; animation: spin 3s linear infinite;">🎡</div>
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">Колесо крутится...</h2>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Фортуна решает вашу судьбу...</p>
        `;
        
        setTimeout(() => {
            const randomPrize = Math.floor(Math.random() * prizes.length);
            const prize = prizes[randomPrize];
            
            gameContent.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 20px;">🎉</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">${prize.name}!</h2>
                <div style="background: ${prize.color}; padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <div style="font-size: 32px; font-weight: 700; margin-bottom: 10px;">${prize.reward} монет</div>
                    <div style="font-size: 18px; opacity: 0.9;">${prize.name}</div>
                </div>
                <p style="margin: 0 0 20px 0; font-size: 16px;">
                    Поздравляем с выигрышем!
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
            
            addCoins(prize.reward);
        }, 3000);
    });
}

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
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Выберите путь в лабиринте!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
            <button class="labyrinth-path" data-path="left" style="
                background: rgba(255,255,255,0.2);
                border: 2px solid rgba(255,255,255,0.3);
                color: white;
                padding: 20px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
               onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                ⬅️ Левый путь
            </button>
            <button class="labyrinth-path" data-path="right" style="
                background: rgba(255,255,255,0.2);
                border: 2px solid rgba(255,255,255,0.3);
                color: white;
                padding: 20px;
                border-radius: 15px;
                cursor: pointer;
                font-size: 16px;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
               onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                ➡️ Правый путь
            </button>
        </div>
        
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
    
    // Добавляем обработчики событий для кнопок
    gameContent.querySelectorAll('.labyrinth-path').forEach(button => {
        button.addEventListener('click', function() {
            const path = this.dataset.path;
            deductCoins(cost);
            
            gameContent.innerHTML = `
                <div style="font-size: 80px; margin-bottom: 20px; animation: spin 2s linear infinite;">🌀</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">Исследуем лабиринт...</h2>
                <p style="margin: 0; font-size: 16px; opacity: 0.9;">Мистические силы ведут вас...</p>
            `;
            
            setTimeout(() => {
                const rewards = [
                    { name: 'Сокровище', reward: 200, emoji: '💎' },
                    { name: 'Магический кристалл', reward: 150, emoji: '🔮' },
                    { name: 'Древний артефакт', reward: 100, emoji: '⚱️' },
                    { name: 'Рунический камень', reward: 75, emoji: '🪨' },
                    { name: 'Мистическая пыль', reward: 50, emoji: '✨' }
                ];
                
                const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
                
                gameContent.innerHTML = `
                    <div style="font-size: 60px; margin-bottom: 20px;">${randomReward.emoji}</div>
                    <h2 style="margin: 0 0 20px 0; font-size: 24px;">Найдено сокровище!</h2>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <div style="font-size: 18px; margin-bottom: 10px;">${randomReward.name}</div>
                        <div style="font-size: 24px; font-weight: 700;">${randomReward.reward} монет</div>
                    </div>
                    <p style="margin: 0 0 20px 0; font-size: 16px;">
                        Вы успешно прошли лабиринт!
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
                
                addCoins(randomReward.reward);
            }, 2000);
        });
    });
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
        { name: 'Орион', symbol: '🏹', stars: '⭐⭐⭐' },
        { name: 'Большая Медведица', symbol: '🐻', stars: '⭐⭐⭐⭐⭐' },
        { name: 'Кассиопея', symbol: '👑', stars: '⭐⭐⭐⭐' },
        { name: 'Лебедь', symbol: '🦢', stars: '⭐⭐⭐' },
        { name: 'Пегас', symbol: '🐴', stars: '⭐⭐⭐⭐' },
        { name: 'Дракон', symbol: '🐉', stars: '⭐⭐⭐' },
        { name: 'Геркулес', symbol: '💪', stars: '⭐⭐⭐' },
        { name: 'Андромеда', symbol: '👸', stars: '⭐⭐⭐' }
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
        <div style="font-size: 60px; margin-bottom: 20px; animation: float 2s ease-in-out infinite;">⭐</div>
        <h2 style="margin: 0 0 20px 0; font-size: 28px;">Звездная карта</h2>
        <p style="margin: 0 0 30px 0; font-size: 16px; opacity: 0.9;">Угадайте созвездие по символам!</p>
        
        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
            <div style="font-size: 14px; margin-bottom: 5px;">💰 Стоимость: ${cost} монет</div>
            <div style="font-size: 14px;">💳 Ваш баланс: ${currentBalance} монет</div>
        </div>
        
        <button class="start-star-game" style="
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
            ⭐ Начать игру!
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
    
    // Добавляем обработчик события для кнопки
    gameContent.querySelector('.start-star-game').addEventListener('click', function() {
        deductCoins(cost);
        
        gameContent.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 20px; animation: spin 2s linear infinite;">⭐</div>
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">Звезды выстраиваются...</h2>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Космические силы работают...</p>
        `;
        
        setTimeout(() => {
            const randomConstellation = Math.floor(Math.random() * constellations.length);
            const constellation = constellations[randomConstellation];
            
            gameContent.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 20px;">${constellation.stars}</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">Какое это созвездие?</h2>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 20px;">
                    ${constellations.map((constellation, index) => `
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
                            ${constellation.symbol} ${constellation.name}
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
        }, 2000);
    });
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
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
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
        
        <button class="start-memory-game" style="
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
    
    // Добавляем обработчик события для кнопки
    gameContent.querySelector('.start-memory-game').addEventListener('click', function() {
        deductCoins(cost);
        
        const crystals = ['💎', '🔮', '💠', '🔷', '💙'];
        const sequence = [];
        const sequenceLength = 3 + Math.floor(Math.random() * 3); // 3-5 кристаллов
        
        // Генерируем последовательность
        for (let i = 0; i < sequenceLength; i++) {
            sequence.push(crystals[Math.floor(Math.random() * crystals.length)]);
        }
        
        // Показываем последовательность
        gameContent.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">💎</div>
            <h2 style="margin: 0 0 20px 0; font-size: 24px;">Запомните последовательность!</h2>
            <div style="font-size: 40px; margin-bottom: 20px; letter-spacing: 10px;">
                ${sequence.join(' ')}
            </div>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Секунд до начала...</p>
        `;
        
        let countdown = 3;
        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdown > 0) {
                gameContent.querySelector('p').textContent = `Секунд до начала: ${countdown}`;
            } else {
                clearInterval(countdownInterval);
                startMemoryTest();
            }
        }, 1000);
        
        function startMemoryTest() {
            gameContent.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 20px;">🔮</div>
                <h2 style="margin: 0 0 20px 0; font-size: 24px;">Повторите последовательность!</h2>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px;">
                    ${crystals.map((crystal, index) => `
                        <button class="crystal-choice" data-crystal="${crystal}" style="
                            background: rgba(255,255,255,0.2);
                            border: 2px solid rgba(255,255,255,0.3);
                            color: white;
                            padding: 15px;
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
                <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
                    <div style="font-size: 16px;">Ваша последовательность:</div>
                    <div id="user-sequence" style="font-size: 24px; margin-top: 10px; min-height: 30px;"></div>
                </div>
            `;
            
            let userSequence = [];
            const userSequenceDiv = document.getElementById('user-sequence');
            
            gameContent.querySelectorAll('.crystal-choice').forEach(button => {
                button.addEventListener('click', function() {
                    const crystal = this.dataset.crystal;
                    userSequence.push(crystal);
                    userSequenceDiv.textContent = userSequence.join(' ');
                    
                    if (userSequence.length === sequence.length) {
                        checkSequence();
                    }
                });
            });
            
            function checkSequence() {
                const isCorrect = JSON.stringify(userSequence) === JSON.stringify(sequence);
                let reward = 0;
                
                if (isCorrect) {
                    reward = 100 + (sequence.length - 3) * 50; // 100-200 монет
                }
                
                gameContent.innerHTML = `
                    <div style="font-size: 60px; margin-bottom: 20px;">${isCorrect ? '🎉' : '💎'}</div>
                    <h2 style="margin: 0 0 20px 0; font-size: 24px;">${isCorrect ? 'Правильно!' : 'Неверно!'}</h2>
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <div style="font-size: 18px; margin-bottom: 10px;">Правильная последовательность:</div>
                        <div style="font-size: 24px; margin-bottom: 10px;">${sequence.join(' ')}</div>
                        <div style="font-size: 18px; margin-bottom: 10px;">Ваша последовательность:</div>
                        <div style="font-size: 24px;">${userSequence.join(' ')}</div>
                    </div>
                    <p style="margin: 0 0 20px 0; font-size: 16px;">
                        ${isCorrect ? `Отлично! Выигрыш: ${reward} монет` : 'Попробуйте еще раз!'}
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
    });
}
