class PlasticReductionTracker {
    constructor() {
        this.bagsSavedDisplay = document.getElementById('bagsSaved');
        this.daysTrackedDisplay = document.getElementById('daysTracked');
        this.co2SavedDisplay = document.getElementById('co2Saved');
        this.oilSavedDisplay = document.getElementById('oilSaved');
        this.bagsInput = document.getElementById('bagsInput');
        this.addBagsButton = document.getElementById('addBags');
        
        this.loadData();
        this.initEventListeners();
        this.updateDisplay();
        this.createChart();
    }
    
    initEventListeners() {
        this.addBagsButton.addEventListener('click', () => this.addBags());
    }
    
    loadData() {
        this.data = JSON.parse(localStorage.getItem('plasticReductionData')) || {
            totalBagsSaved: 0,
            dailyData: {},
            startDate: new Date().toDateString()
        };
    }
    
    saveData() {
        localStorage.setItem('plasticReductionData', JSON.stringify(this.data));
    }
    
    addBags() {
        const bagsToAdd = parseInt(this.bagsInput.value) || 0;
        if (bagsToAdd <= 0) {
            alert('Vui lòng nhập số túi hợp lệ!');
            return;
        }
        
        const today = new Date().toDateString();
        this.data.totalBagsSaved += bagsToAdd;
        this.data.dailyData[today] = (this.data.dailyData[today] || 0) + bagsToAdd;
        
        this.saveData();
        this.updateDisplay();
        this.createChart();
        
        this.bagsInput.value = 1;
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'alert alert-success mt-2';
        successMsg.innerHTML = `<i class="fas fa-check-circle me-2"></i>Đã ghi nhận ${bagsToAdd} túi nilon tiết kiệm!`;
        this.addBagsButton.parentNode.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }
    
    updateDisplay() {
        const totalBags = this.data.totalBagsSaved;
        const daysTracked = Object.keys(this.data.dailyData).length;
        const co2Saved = totalBags * 6; // 6g CO2 per bag
        const oilSaved = totalBags * 0.5; // 0.5ml oil per bag
        
        this.bagsSavedDisplay.textContent = totalBags;
        this.daysTrackedDisplay.textContent = daysTracked;
        this.co2SavedDisplay.textContent = co2Saved;
        this.oilSavedDisplay.textContent = oilSaved.toFixed(1);
    }
    
    createChart() {
        const canvas = document.getElementById('chartCanvas');
        const ctx = canvas.getContext('2d');
        
        // Get last 7 days data
        const last7Days = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            last7Days.push(date.toDateString());
        }
        
        const chartData = last7Days.map(date => this.data.dailyData[date] || 0);
        const labels = last7Days.map(date => {
            const d = new Date(date);
            return `${d.getDate()}/${d.getMonth() + 1}`;
        });
        
        // Clear previous chart
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Simple bar chart
        const maxValue = Math.max(...chartData, 1);
        const barWidth = canvas.width / 7;
        const barMaxHeight = canvas.height - 40;
        
        chartData.forEach((value, index) => {
            const barHeight = (value / maxValue) * barMaxHeight;
            const x = index * barWidth;
            const y = canvas.height - barHeight - 20;
            
            // Draw bar
            ctx.fillStyle = value > 0 ? '#28a745' : '#e9ecef';
            ctx.fillRect(x + 10, y, barWidth - 20, barHeight);
            
            // Draw value
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(value, x + barWidth/2, y - 5);
            
            // Draw label
            ctx.fillText(labels[index], x + barWidth/2, canvas.height - 5);
        });
    }
}

// Initialize tracker when page loads
document.addEventListener('DOMContentLoaded', function() {
    new PlasticReductionTracker();
});

