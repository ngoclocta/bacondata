class BottleGame {
    constructor() {
        this.score = 0;
        this.timeLeft = 60;
        this.gameActive = false;
        this.gameArea = document.getElementById('gameArea');
        this.scoreDisplay = document.getElementById('currentScore');
        this.timerDisplay = document.getElementById('timer');
        this.startButton = document.getElementById('startGame');
        this.resetButton = document.getElementById('resetGame');
        this.highScoreDisplay = document.getElementById('highScore');
        this.gameInstructions = document.getElementById('gameInstructions');
        this.leaderboardDisplay = document.getElementById('leaderboard');
        
        this.bottles = [];
        this.gameTimer = null;
        this.spawnTimer = null;
        this.botTimer = null;
        
        // Bot players with low scores
        this.bots = [
            { name: 'Bot Alpha', score: 8 },
            { name: 'Bot Beta', score: 12 },
            { name: 'Bot Gamma', score: 6 },
            { name: 'Bot Delta', score: 15 },
            { name: 'Bot Echo', score: 9 }
        ];
        
        this.loadHighScore();
        this.initEventListeners();
        this.updateLeaderboard();
    }
    
    initEventListeners() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.resetButton.addEventListener('click', () => this.resetGame());
    }
    
    startGame() {
        this.gameActive = true;
        this.score = 0;
        this.timeLeft = 60;
        this.startButton.disabled = true;
        this.resetButton.disabled = false;
        this.gameInstructions.style.display = 'none';
        
        this.updateDisplay();
        this.startTimer();
        this.startSpawning();
        this.startBotActivity();
    }
    
    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.timerDisplay.textContent = `Thời gian: ${this.timeLeft}s`;
            
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }
    
    startSpawning() {
        this.spawnTimer = setInterval(() => {
            if (this.gameActive) {
                this.spawnBottle();
            }
        }, 1500);
    }
    
    startBotActivity() {
        // Bots collect bottles occasionally with low efficiency
        this.botTimer = setInterval(() => {
            if (this.gameActive && Math.random() < 0.3) { // 30% chance
                const randomBot = this.bots[Math.floor(Math.random() * this.bots.length)];
                if (randomBot.score < 20) { // Keep bot scores low
                    randomBot.score += Math.random() < 0.5 ? 1 : 0; // 50% chance to gain 1 point
                    this.updateLeaderboard();
                }
            }
        }, 2000);
    }
    
    spawnBottle() {
        const bottle = document.createElement('div');
        bottle.className = 'bottle';
        bottle.innerHTML = '🍼'; // Bottle emoji
        bottle.style.left = Math.random() * (this.gameArea.offsetWidth - 30) + 'px';
        bottle.style.top = Math.random() * (this.gameArea.offsetHeight - 30) + 'px';
        
        bottle.addEventListener('click', () => this.collectBottle(bottle));
        
        this.gameArea.appendChild(bottle);
        this.bottles.push(bottle);
        
        // Remove bottle after 3 seconds if not collected
        setTimeout(() => {
            if (bottle.parentNode) {
                bottle.remove();
                const index = this.bottles.indexOf(bottle);
                if (index > -1) {
                    this.bottles.splice(index, 1);
                }
            }
        }, 3000);
    }
    
    collectBottle(bottle) {
        if (!this.gameActive) return;
        
        this.score++;
        this.updateDisplay();
        this.updateLeaderboard();
        
        // Add collection effect
        bottle.style.transform = 'scale(1.5)';
        bottle.style.opacity = '0';
        
        setTimeout(() => {
            bottle.remove();
            const index = this.bottles.indexOf(bottle);
            if (index > -1) {
                this.bottles.splice(index, 1);
            }
        }, 200);
    }
    
    endGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        clearInterval(this.spawnTimer);
        clearInterval(this.botTimer);
        
        // Remove all remaining bottles
        this.bottles.forEach(bottle => bottle.remove());
        this.bottles = [];
        
        // Check and save high score
        const currentHighScore = parseInt(localStorage.getItem('bottleGameHighScore') || '0');
        if (this.score > currentHighScore) {
            localStorage.setItem('bottleGameHighScore', this.score.toString());
            this.loadHighScore();
            alert(`🎉 Kỷ lục mới! Bạn đã nhặt được ${this.score} chai nhựa và vượt qua các bot!`);
        } else {
            alert(`🎮 Game kết thúc! Bạn đã nhặt được ${this.score} chai nhựa!`);
        }
        
        this.startButton.disabled = false;
        this.gameInstructions.style.display = 'block';
        this.gameInstructions.innerHTML = `
            <h4>Game đã kết thúc!</h4>
            <p>Bạn đã nhặt được ${this.score} chai nhựa</p>
            <p>Hãy cố gắng vượt qua các bot trong lần chơi tiếp theo!</p>
        `;
        
        this.updateLeaderboard();
    }
    
    resetGame() {
        this.gameActive = false;
        clearInterval(this.gameTimer);
        clearInterval(this.spawnTimer);
        clearInterval(this.botTimer);
        
        this.bottles.forEach(bottle => bottle.remove());
        this.bottles = [];
        
        this.score = 0;
        this.timeLeft = 60;
        this.startButton.disabled = false;
        this.resetButton.disabled = true;
        this.gameInstructions.style.display = 'block';
        this.gameInstructions.innerHTML = `
            <h4>Nhấn "Bắt Đầu" để chơi!</h4>
            <p>Click vào các chai nhựa để nhặt chúng và cạnh tranh với bot</p>
        `;
        
        // Reset bot scores to low values
        this.bots = [
            { name: 'Bot Alpha', score: 8 },
            { name: 'Bot Beta', score: 12 },
            { name: 'Bot Gamma', score: 6 },
            { name: 'Bot Delta', score: 15 },
            { name: 'Bot Echo', score: 9 }
        ];
        
        this.updateDisplay();
        this.updateLeaderboard();
    }
    
    updateDisplay() {
        this.scoreDisplay.textContent = this.score;
        this.timerDisplay.textContent = `Thời gian: ${this.timeLeft}s`;
    }
    
    updateLeaderboard() {
        const allPlayers = [
            { name: 'Bạn', score: this.score },
            ...this.bots
        ];
        
        // Sort by score descending
        allPlayers.sort((a, b) => b.score - a.score);
        
        let leaderboardHTML = '<h5>🏆 Bảng Xếp Hạng</h5><ol>';
        allPlayers.forEach((player, index) => {
            const isPlayer = player.name === 'Bạn';
            const className = isPlayer ? 'text-success fw-bold' : 'text-muted';
            leaderboardHTML += `<li class="${className}">${player.name}: ${player.score} chai</li>`;
        });
        leaderboardHTML += '</ol>';
        
        if (this.leaderboardDisplay) {
            this.leaderboardDisplay.innerHTML = leaderboardHTML;
        }
    }
    
    loadHighScore() {
        const highScore = localStorage.getItem('bottleGameHighScore') || '0';
        this.highScoreDisplay.textContent = highScore;
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    new BottleGame();
});

