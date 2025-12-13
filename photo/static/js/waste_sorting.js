document.addEventListener('DOMContentLoaded', function() {
    const analyzeButton = document.getElementById('analyzeWaste');
    const wasteImageInput = document.getElementById('wasteImage');
    const resultDiv = document.getElementById('wasteResult');

    if (analyzeButton) {
        analyzeButton.addEventListener('click', function() {
            const file = wasteImageInput.files[0];
            if (!file) {
                resultDiv.innerHTML = '<div class="alert alert-warning">Vui lòng chọn một hình ảnh trước!</div>';
                return;
            }

            // Simulate AI analysis (in real implementation, this would call an AI API)
            resultDiv.innerHTML = '<div class="spinner-border text-info" role="status"><span class="visually-hidden">Đang phân tích...</span></div>';
            
            setTimeout(() => {
                // Mock AI result based on common waste types
                const wasteTypes = [
                    {
                        type: 'Chai nhựa',
                        category: 'Rác Tái Chế',
                        color: 'primary',
                        icon: 'recycle',
                        instruction: 'Rửa sạch chai và bỏ vào thùng rác tái chế màu xanh dương.'
                    },
                    {
                        type: 'Vỏ chuối',
                        category: 'Rác Hữu Cơ',
                        color: 'success',
                        icon: 'leaf',
                        instruction: 'Có thể làm phân compost hoặc bỏ vào thùng rác hữu cơ màu xanh lá.'
                    },
                    {
                        type: 'Pin cũ',
                        category: 'Rác Độc Hại',
                        color: 'danger',
                        icon: 'exclamation-triangle',
                        instruction: 'Cần mang đến điểm thu gom pin cũ chuyên dụng, không bỏ vào thùng rác thông thường.'
                    }
                ];
                
                const randomResult = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
                
                resultDiv.innerHTML = `
                    <div class="alert alert-${randomResult.color} border-${randomResult.color}">
                        <h6><i class="fas fa-${randomResult.icon} me-2"></i>Kết quả phân tích:</h6>
                        <p><strong>Loại rác:</strong> ${randomResult.type}</p>
                        <p><strong>Phân loại:</strong> ${randomResult.category}</p>
                        <p><strong>Hướng dẫn:</strong> ${randomResult.instruction}</p>
                    </div>
                `;
            }, 2000);
        });
    }
});

