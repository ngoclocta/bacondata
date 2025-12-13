// Ocean Cleanup Game JavaScript

class OceanCleanupGame {
    constructor() {
        this.gameState = {
            isPlaying: false,
            isPaused: false,
            score: 0,
            wasteCollected: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            currentStreak: 0,
            maxStreak: 0,
            difficulty: 'easy',
            sessionId: null,
            totalWasteItems: 15
        };
        
        this.currentQuestion = null;
        this.currentWasteType = null;
        this.questionTimer = null;
        this.questionTimeLimit = 30;
        this.selectedAnswer = null;
        this.wasteTypes = {};
        
        this.spawnInterval = null;
        this.bubbleInterval = null;
        this.fishInterval = null;
        
        this.init();
    }
    
    async init() {
        try {
            // Load waste types
            const response = await fetch('/api/ocean-cleanup/get-waste-types');
            const data = await response.json();
            if (data.success) {
                this.wasteTypes = data.waste_types;
            }
            
            this.setupEventListeners();
            this.startBackgroundAnimations();
        } catch (error) {
            console.error('Error initializing game:', error);
        }
    }
    
    setupEventListeners() {
        // Click outside modal to close (disabled for game)
        document.getElementById('question-modal').addEventListener('click', (e) => {
            if (e.target.id === 'question-modal') {
                // Don't close modal by clicking outside during game
                return;
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (this.gameState.isPlaying && !this.gameState.isPaused) {
                // Number keys for answers (1-4)
                if (e.key >= '1' && e.key <= '4') {
                    const optionIndex = parseInt(e.key) - 1;
                    this.selectOption(optionIndex);
                }
                
                // Enter to submit answer
                if (e.key === 'Enter' && this.selectedAnswer !== null) {
                    this.submitAnswer();
                }
                
                // Space to pause
                if (e.key === ' ') {
                    e.preventDefault();
                    this.pauseGame();
                }
            }
        });
    }
    
    startBackgroundAnimations() {
        // Create bubbles
        this.bubbleInterval = setInterval(() => {
            this.createBubble();
        }, 2000);
        
        // Create fish
        this.fishInterval = setInterval(() => {
            this.createFish();
        }, 8000);
    }
    
    createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        bubble.style.width = bubble.style.height = (Math.random() * 20 + 10) + 'px';
        bubble.style.animationDelay = Math.random() * 2 + 's';
        
        document.getElementById('ocean-scene').appendChild(bubble);
        
        // Remove bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.parentNode.removeChild(bubble);
            }
        }, 4000);
    }
    
    createFish() {
        const fishEmojis = ['🐠', '🐟', '🐡', '🦈', '🐙', '🦑', '🐢'];
        const fish = document.createElement('div');
        fish.className = 'fish';
        fish.textContent = fishEmojis[Math.floor(Math.random() * fishEmojis.length)];
        fish.style.top = (Math.random() * 60 + 20) + '%';
        fish.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        document.getElementById('ocean-scene').appendChild(fish);
        
        // Remove fish after animation
        setTimeout(() => {
            if (fish.parentNode) {
                fish.parentNode.removeChild(fish);
            }
        }, 10000);
    }
    
    async startGame() {
        try {
            // Check if user is logged in
            const userResponse = await fetch('/auth/api/user/current');
            if (!userResponse.ok) {
                alert('Bạn cần đăng nhập để chơi game này!');
                window.location.href = '/auth/login';
                return;
            }
            
            // Start game session
            const response = await fetch('/api/ocean-cleanup/start', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    difficulty: this.gameState.difficulty
                })
            });
            
            const data = await response.json();
            if (data.success) {
                this.gameState.sessionId = data.session_id;
                this.gameState.totalWasteItems = data.total_waste_items;
                this.gameState.isPlaying = true;
                this.gameState.isPaused = false;
                
                // Update UI
                document.getElementById('start-btn').style.display = 'none';
                document.getElementById('pause-btn').style.display = 'inline-block';
                
                // Start spawning waste
                this.startWasteSpawning();
                
                this.showNotification('Game bắt đầu! Hãy nhặt rác và trả lời câu hỏi!', 'success');
            } else {
                alert('Lỗi khởi tạo game: ' + data.message);
            }
        } catch (error) {
            console.error('Error starting game:', error);
            alert('Lỗi kết nối. Vui lòng thử lại.');
        }
    }
    
    pauseGame() {
        if (!this.gameState.isPlaying) return;
        
        this.gameState.isPaused = !this.gameState.isPaused;
        
        if (this.gameState.isPaused) {
            // Pause game
            if (this.spawnInterval) {
                clearInterval(this.spawnInterval);
                this.spawnInterval = null;
            }
            
            document.getElementById('pause-btn').innerHTML = '<i class="fas fa-play me-2"></i>Tiếp tục';
            this.showNotification('Game đã tạm dừng', 'info');
        } else {
            // Resume game
            this.startWasteSpawning();
            document.getElementById('pause-btn').innerHTML = '<i class="fas fa-pause me-2"></i>Tạm dừng';
            this.showNotification('Game tiếp tục!', 'success');
        }
    }
    
    startWasteSpawning() {
        const spawnRate = 3000; // 3 seconds
        
        this.spawnInterval = setInterval(() => {
            if (!this.gameState.isPaused) {
                this.spawnWaste();
            }
        }, spawnRate);
        
        // Spawn first waste immediately
        this.spawnWaste();
    }
    
    spawnWaste() {
        const wasteTypeKeys = Object.keys(this.wasteTypes);
        const randomType = wasteTypeKeys[Math.floor(Math.random() * wasteTypeKeys.length)];
        const wasteInfo = this.wasteTypes[randomType];
        
        const waste = document.createElement('div');
        waste.className = 'waste-item';
        waste.style.backgroundColor = wasteInfo.color;
        waste.style.left = Math.random() * 80 + 10 + '%';
        waste.style.top = Math.random() * 60 + 20 + '%';
        waste.innerHTML = wasteInfo.icon;
        waste.dataset.wasteType = randomType;
        
        // Add click handler
        waste.addEventListener('click', () => {
            this.collectWaste(randomType, waste);
        });
        
        document.getElementById('ocean-scene').appendChild(waste);
        
        // Remove waste after 8 seconds if not collected
        setTimeout(() => {
            if (waste.parentNode) {
                waste.parentNode.removeChild(waste);
            }
        }, 8000);
    }
    
    async collectWaste(wasteType, wasteElement) {
        if (!this.gameState.isPlaying || this.gameState.isPaused) return;
        
        // Remove waste element with animation
        wasteElement.style.transform = 'scale(0)';
        wasteElement.style.opacity = '0';
        setTimeout(() => {
            if (wasteElement.parentNode) {
                wasteElement.parentNode.removeChild(wasteElement);
            }
        }, 300);
        
        try {
            const response = await fetch('/api/ocean-cleanup/collect-waste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    waste_type: wasteType
                })
            });
            
            const data = await response.json();
            if (data.success) {
                this.currentWasteType = wasteType;
                this.currentQuestion = data.question;
                this.gameState.wasteCollected = data.waste_collected;
                
                // Update UI
                this.updateStats();
                
                // Show question modal
                this.showQuestionModal(data.waste_info, data.question);
            } else {
                console.error('Error collecting waste:', data.message);
            }
        } catch (error) {
            console.error('Error collecting waste:', error);
        }
    }
    
    showQuestionModal(wasteInfo, question) {
        // Pause waste spawning
        if (this.spawnInterval) {
            clearInterval(this.spawnInterval);
            this.spawnInterval = null;
        }
        
        // Update waste info
        document.getElementById('waste-icon').textContent = wasteInfo.icon;
        document.getElementById('waste-name').textContent = wasteInfo.name;
        document.getElementById('waste-description').textContent = wasteInfo.description;
        
        // Update question
        document.getElementById('question-text').textContent = question.question;
        
        // Create options
        const optionsContainer = document.getElementById('question-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = `${index + 1}. ${option}`;
            button.onclick = () => this.selectOption(index);
            button.dataset.optionIndex = index;
            optionsContainer.appendChild(button);
        });
        
        // Reset selection
        this.selectedAnswer = null;
        document.getElementById('submit-answer').disabled = true;
        
        // Show modal
        document.getElementById('question-modal').style.display = 'flex';
        
        // Start timer
        this.startQuestionTimer();
    }
    
    selectOption(optionIndex) {
        // Remove previous selection
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // Select new option
        const selectedBtn = document.querySelector(`[data-option-index="${optionIndex}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
            this.selectedAnswer = optionIndex;
            document.getElementById('submit-answer').disabled = false;
        }
    }
    
    startQuestionTimer() {
        this.questionTimeLimit = 30;
        let timeLeft = this.questionTimeLimit;
        
        const timerFill = document.getElementById('timer-fill');
        timerFill.style.width = '100%';
        
        this.questionTimer = setInterval(() => {
            timeLeft--;
            const percentage = (timeLeft / this.questionTimeLimit) * 100;
            timerFill.style.width = percentage + '%';
            
            if (timeLeft <= 0) {
                clearInterval(this.questionTimer);
                this.submitAnswer(); // Auto-submit when time runs out
            }
        }, 1000);
    }
    
    async submitAnswer() {
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
        }
        
        const responseTime = this.questionTimeLimit - Math.floor(document.getElementById('timer-fill').style.width.replace('%', '') / 100 * this.questionTimeLimit);
        
        try {
            const response = await fetch('/api/ocean-cleanup/answer-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question_id: this.currentQuestion.id,
                    selected_answer: this.selectedAnswer,
                    waste_type: this.currentWasteType,
                    response_time: responseTime
                })
            });
            
            const data = await response.json();
            if (data.success) {
                this.showAnswerResult(data);
                
                // Update game state
                this.gameState.score = data.total_score;
                this.gameState.questionsAnswered = data.game_stats.questions_answered;
                this.gameState.correctAnswers = data.game_stats.correct_answers;
                this.gameState.currentStreak = data.current_streak;
                
                // Check if game is completed
                if (data.is_completed) {
                    setTimeout(() => {
                        this.completeGame(data);
                    }, 3000);
                } else {
                    // Continue game after showing result
                    setTimeout(() => {
                        this.hideQuestionModal();
                        this.startWasteSpawning();
                    }, 3000);
                }
            } else {
                console.error('Error submitting answer:', data.message);
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    }
    
    showAnswerResult(data) {
        // Disable all options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });
        
        // Show correct/incorrect styling
        document.querySelectorAll('.option-btn').forEach((btn, index) => {
            if (index === this.selectedAnswer) {
                btn.classList.add(data.is_correct ? 'correct' : 'incorrect');
            }
            if (index === this.currentQuestion.options.indexOf(data.correct_answer)) {
                btn.classList.add('correct');
            }
        });
        
        // Show explanation
        const explanationDiv = document.createElement('div');
        explanationDiv.className = `alert ${data.is_correct ? 'alert-success' : 'alert-warning'} mt-3`;
        explanationDiv.innerHTML = `
            <h6><i class="fas ${data.is_correct ? 'fa-check-circle' : 'fa-info-circle'} me-2"></i>
            ${data.is_correct ? 'Chính xác!' : 'Đáp án đúng: ' + data.correct_answer}</h6>
            <p class="mb-0">${data.explanation}</p>
            <small class="text-muted">+${data.points_earned} điểm</small>
        `;
        
        document.querySelector('.question-content').appendChild(explanationDiv);
        
        // Update stats
        this.updateStats();
        
        // Hide submit button
        document.getElementById('submit-answer').style.display = 'none';
    }
    
    hideQuestionModal() {
        document.getElementById('question-modal').style.display = 'none';
        
        // Clean up
        document.querySelector('.question-content .alert')?.remove();
        document.getElementById('submit-answer').style.display = 'inline-block';
    }
    
    skipQuestion() {
        if (this.questionTimer) {
            clearInterval(this.questionTimer);
        }
        
        this.selectedAnswer = -1; // Invalid answer
        this.submitAnswer();
    }
    
    completeGame(data) {
        this.gameState.isPlaying = false;
        
        // Stop all intervals
        if (this.spawnInterval) clearInterval(this.spawnInterval);
        if (this.bubbleInterval) clearInterval(this.bubbleInterval);
        if (this.fishInterval) clearInterval(this.fishInterval);
        
        // Hide question modal
        this.hideQuestionModal();
        
        // Show completion modal
        this.showCompletionModal(data);
    }
    
    showCompletionModal(data) {
        document.getElementById('completion-title').textContent = 'Hoàn thành!';
        document.getElementById('completion-message').textContent = data.completion_message;
        document.getElementById('final-score').textContent = data.total_score;
        document.getElementById('final-waste-collected').textContent = data.game_stats.waste_collected;
        document.getElementById('final-accuracy').textContent = data.game_stats.accuracy + '%';
        
        // Animate progress ring
        const progressCircle = document.getElementById('progress-circle');
        const accuracy = data.game_stats.accuracy;
        const circumference = 2 * Math.PI * 40; // radius = 40
        const offset = circumference - (accuracy / 100) * circumference;
        progressCircle.style.strokeDasharray = `${circumference - offset} ${circumference}`;
        
        document.getElementById('completion-modal').style.display = 'flex';
        
        // Confetti effect (simple)
        this.createConfetti();
    }
    
    createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.zIndex = '9999';
                confetti.style.animation = 'confetti-fall 3s linear forwards';
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 100);
        }
    }
    
    updateStats() {
        document.getElementById('score').textContent = this.gameState.score;
        document.getElementById('waste-collected').textContent = this.gameState.wasteCollected;
        document.getElementById('questions-answered').textContent = this.gameState.questionsAnswered;
        document.getElementById('streak').textContent = this.gameState.currentStreak;
        
        const accuracy = this.gameState.questionsAnswered > 0 
            ? Math.round((this.gameState.correctAnswers / this.gameState.questionsAnswered) * 100)
            : 0;
        document.getElementById('accuracy').textContent = accuracy + '%';
    }
    
    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed`;
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.zIndex = '9999';
        notification.style.minWidth = '300px';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    playAgain() {
        // Reset game state
        this.gameState = {
            isPlaying: false,
            isPaused: false,
            score: 0,
            wasteCollected: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            currentStreak: 0,
            maxStreak: 0,
            difficulty: 'easy',
            sessionId: null,
            totalWasteItems: 15
        };
        
        // Clear ocean scene
        const oceanScene = document.getElementById('ocean-scene');
        oceanScene.querySelectorAll('.waste-item').forEach(item => item.remove());
        
        // Reset UI
        this.updateStats();
        document.getElementById('completion-modal').style.display = 'none';
        document.getElementById('start-btn').style.display = 'inline-block';
        document.getElementById('pause-btn').style.display = 'none';
        
        // Restart background animations
        this.startBackgroundAnimations();
    }
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize game when page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new OceanCleanupGame();
});

// Global functions for buttons
function startGame() {
    game.startGame();
}

function pauseGame() {
    game.pauseGame();
}

function submitAnswer() {
    game.submitAnswer();
}

function skipQuestion() {
    game.skipQuestion();
}

function playAgain() {
    game.playAgain();
}

