class AIConsultant {
    constructor() {
        this.chatContainer = document.getElementById('chatContainer');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.suggestionButtons = document.querySelectorAll('.suggestion-btn');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        this.suggestionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.messageInput.value = btn.textContent;
                this.sendMessage();
            });
        });
    }
    
    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        
        this.showTypingIndicator();
        
        // Simulate API call to AI
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateAIResponse(message);
            this.addMessage(response, 'ai');
            this.sendButton.disabled = false;
        }, 2000);
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `<i class="fas fa-robot me-2"></i>${content}`;
        } else {
            messageDiv.innerHTML = `<i class="fas fa-user me-2"></i>${content}`;
        }
        
        this.chatContainer.appendChild(messageDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = '<i class="fas fa-robot me-2"></i>AI đang suy nghĩ...';
        
        this.chatContainer.appendChild(typingDiv);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Simple keyword-based responses (in real implementation, this would call OpenAI API)
        if (lowerMessage.includes('rác') || lowerMessage.includes('thải')) {
            return `Để giảm rác thải, bạn có thể:
            <ul>
                <li>Phân loại rác tại nguồn</li>
                <li>Sử dụng túi vải thay vì túi nilon</li>
                <li>Tái sử dụng các vật dụng cũ</li>
                <li>Mua sắm có ý thức, tránh đồ dùng một lần</li>
            </ul>`;
        }
        
        if (lowerMessage.includes('điện') || lowerMessage.includes('năng lượng')) {
            return `Để tiết kiệm điện năng:
            <ul>
                <li>Tắt các thiết bị điện khi không sử dụng</li>
                <li>Sử dụng bóng đèn LED</li>
                <li>Điều chỉnh nhiệt độ điều hòa hợp lý (25-26°C)</li>
                <li>Sử dụng các thiết bị tiết kiệm năng lượng</li>
            </ul>`;
        }
        
        if (lowerMessage.includes('nhựa') || lowerMessage.includes('nilon')) {
            return `Để giảm rác thải nhựa:
            <ul>
                <li>Mang theo túi vải khi đi mua sắm</li>
                <li>Sử dụng bình nước cá nhân thay vì chai nhựa</li>
                <li>Chọn sản phẩm có bao bì tái chế</li>
                <li>Tham gia các chương trình thu gom chai nhựa</li>
            </ul>`;
        }
        
        if (lowerMessage.includes('tại sao') || lowerMessage.includes('lý do')) {
            return `Bảo vệ môi trường quan trọng vì:
            <ul>
                <li>Đảm bảo sức khỏe cho con người và các loài sinh vật</li>
                <li>Duy trì cân bằng hệ sinh thái</li>
                <li>Bảo tồn tài nguyên cho thế hệ tương lai</li>
                <li>Giảm thiểu biến đổi khí hậu</li>
            </ul>`;
        }
        
        if (lowerMessage.includes('nước') || lowerMessage.includes('tiết kiệm nước')) {
            return `Để tiết kiệm nước:
            <ul>
                <li>Sửa chữa các vòi nước bị rò rỉ</li>
                <li>Tắt vòi khi đánh răng, rửa mặt</li>
                <li>Sử dụng nước mưa để tưới cây</li>
                <li>Tắm nhanh thay vì ngâm trong bồn</li>
            </ul>`;
        }
        
        // Default response
        return `Cảm ơn bạn đã quan tâm đến môi trường! Đây là một chủ đề rất quan trọng. Để có thể tư vấn chính xác hơn, bạn có thể hỏi cụ thể về:
        <ul>
            <li>Cách giảm rác thải</li>
            <li>Tiết kiệm năng lượng</li>
            <li>Bảo vệ nguồn nước</li>
            <li>Sống xanh hàng ngày</li>
        </ul>
        Hãy đặt câu hỏi cụ thể để tôi có thể giúp bạn tốt hơn!`;
    }
}

// Initialize AI consultant when page loads
document.addEventListener('DOMContentLoaded', function() {
    new AIConsultant();
});

