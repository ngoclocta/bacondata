// Danh sách video DIY
const videoDatabase = [
    {
        id: 1,
        title: "Tái chế chai nhựa thành chậu hoa con voi đơn giản",
        description: "Hướng dẫn chi tiết cách biến chai nhựa thành chậu hoa hình con voi dễ thương",
        embedId: "4Zmom8aHnyY",
        category: "plastic",
        duration: "medium", // 5-15 phút
        difficulty: "easy",
        materials: ["Chai nhựa lớn", "Kéo", "Màu acrylic", "Cọ vẽ"],
        tags: ["chai nhựa", "chậu hoa", "con voi", "trang trí"]
    },
    {
        id: 2,
        title: "Cách làm bình hoa từ chai nhựa thật đơn giản",
        description: "Biến chai nhựa thành bình hoa đẹp mắt cho không gian sống",
        embedId: "HuaJRnpx0Yw",
        category: "plastic",
        duration: "short", // < 5 phút
        difficulty: "easy",
        materials: ["Chai nhựa", "Kéo", "Giấy màu", "Keo dán"],
        tags: ["chai nhựa", "bình hoa", "trang trí", "đơn giản"]
    },
    {
        id: 3,
        title: "CÔNG DỤNG HAY TỪ CHAI NHỰA - TÁI CHẾ CHAI NHỰA THÀNH ĐỒ VẬT",
        description: "Những công dụng thông minh từ chai nhựa mà ít ai biết",
        embedId: "AGKZ6NFWdJs",
        category: "plastic",
        duration: "long", // > 15 phút
        difficulty: "medium",
        materials: ["Chai nhựa", "Kéo", "Băng keo", "Dụng cụ cắt"],
        tags: ["chai nhựa", "tái chế", "đồ vật", "thông minh"]
    },
    {
        id: 4,
        title: "Handmade sáng tạo từ chai nhựa tái chế",
        description: "Ý tưởng xanh cho không gian sống từ chai nhựa cũ",
        embedId: "2Y1BPexeGC8",
        category: "plastic",
        duration: "medium",
        difficulty: "medium",
        materials: ["Chai nhựa", "Màu sơn", "Cọ", "Dây trang trí"],
        tags: ["chai nhựa", "handmade", "sáng tạo", "không gian sống"]
    },
    {
        id: 5,
        title: "38 Creative Ideas With Plastic Bottles",
        description: "38 ý tưởng sáng tạo để tái sử dụng và tái chế chai nhựa cũ",
        embedId: "xEAOvFG1AmM",
        category: "plastic",
        duration: "long",
        difficulty: "medium",
        materials: ["Chai nhựa", "Kéo", "Màu sơn", "Keo nóng", "Dụng cụ cắt"],
        tags: ["chai nhựa", "sáng tạo", "38 ý tưởng", "tái chế"]
    },
    {
        id: 6,
        title: "Easy Plastic Bottle Craft Ideas - Best Out of Waste",
        description: "Ý tưởng thủ công dễ dàng từ chai nhựa - tận dụng rác thải tốt nhất",
        embedId: "cJ857wjVBrk",
        category: "plastic",
        duration: "medium",
        difficulty: "easy",
        materials: ["Chai nhựa", "Kéo", "Giấy màu", "Keo dán"],
        tags: ["chai nhựa", "thủ công", "dễ dàng", "best out of waste"]
    },
    {
        id: 7,
        title: "6 Gorgeous Crafts Made from Plastic Bottles",
        description: "6 tác phẩm thủ công tuyệt đẹp được làm từ chai nhựa",
        embedId: "kiaXmRWlEVI",
        category: "plastic",
        duration: "medium",
        difficulty: "medium",
        materials: ["Chai nhựa", "Màu acrylic", "Cọ", "Kéo", "Keo nóng"],
        tags: ["chai nhựa", "thủ công đẹp", "6 ý tưởng", "sáng tạo"]
    },
    {
        id: 8,
        title: "Recycle Plastic Bottles Into Hanging Lantern Flower Pots",
        description: "Tái chế chai nhựa thành chậu hoa đèn lồng treo cho tường cũ",
        embedId: "NdxuTQUztJY",
        category: "plastic",
        duration: "medium",
        difficulty: "medium",
        materials: ["Chai nhựa", "Dây treo", "Đất trồng", "Cây con", "Kéo"],
        tags: ["chai nhựa", "chậu treo", "đèn lồng", "vườn thẳng đứng"]
    },
    {
        id: 9,
        title: "30 Smart Ways to Recycle Plastic Bottles",
        description: "30 cách thông minh để tái chế chai nhựa thành đồ dùng hữu ích",
        embedId: "GwCU0rW--S0",
        category: "plastic",
        duration: "long",
        difficulty: "medium",
        materials: ["Chai nhựa", "Kéo", "Keo nóng", "Màu sơn", "Dụng cụ khoan"],
        tags: ["chai nhựa", "30 cách", "thông minh", "tái chế"]
    },
    {
        id: 10,
        title: "Amazing Cardboard Crafts - Best Out of Waste",
        description: "Những tác phẩm thủ công tuyệt vời từ thùng carton",
        embedId: "peHoTbbkjTo",
        category: "paper",
        duration: "medium",
        difficulty: "medium",
        materials: ["Thùng carton", "Kéo", "Keo dán", "Màu sơn"],
        tags: ["carton", "thủ công", "tuyệt vời", "best out of waste"]
    },
    {
        id: 11,
        title: "DIY 6 Cardboard Ideas - Craft Ideas with Paper",
        description: "6 ý tưởng DIY từ carton - Ý tưởng thủ công với giấy",
        embedId: "gbePZHXHfZA",
        category: "paper",
        duration: "medium",
        difficulty: "easy",
        materials: ["Carton", "Giấy màu", "Keo dán", "Thước kẻ"],
        tags: ["carton", "6 ý tưởng", "DIY", "giấy"]
    },
    {
        id: 12,
        title: "Amazing Crafts from Regular Cardboard",
        description: "Những tác phẩm thủ công tuyệt vời từ carton thông thường",
        embedId: "f7kwb5LAz_g",
        category: "paper",
        duration: "medium",
        difficulty: "medium",
        materials: ["Carton", "Giấy màu", "Keo dán", "Kéo"],
        tags: ["carton", "tuyệt vời", "thủ công", "thông thường"]
    },
    {
        id: 13,
        title: "DIY 5 Low Cost Cardboard Crafts",
        description: "5 tác phẩm thủ công từ carton chi phí thấp",
        embedId: "mF6xMLbrJ3k",
        category: "paper",
        duration: "medium",
        difficulty: "easy",
        materials: ["Carton", "Kéo", "Keo dán", "Màu sơn"],
        tags: ["carton", "chi phí thấp", "5 ý tưởng", "DIY"]
    },
    {
        id: 14,
        title: "18 Brilliant Tin Can Upcycling Hacks",
        description: "18 mẹo tái chế lon thiếc thông minh biến rác thành kho báu",
        embedId: "7gAQzBSqNkA",
        category: "metal",
        duration: "long",
        difficulty: "medium",
        materials: ["Lon thiếc", "Kéo", "Màu sơn", "Khoan", "Dây"],
        tags: ["lon thiếc", "18 mẹo", "thông minh", "upcycling"]
    },
    {
        id: 15,
        title: "29 Amazing Tin Can Upcycled Crafts",
        description: "29 tác phẩm tái chế lon thiếc tuyệt vời - DIY nhanh và dễ",
        embedId: "rFJUwlPZ54M",
        category: "metal",
        duration: "long",
        difficulty: "medium",
        materials: ["Lon thiếc", "Sơn xịt", "Keo nóng", "Dụng cụ khoan"],
        tags: ["lon thiếc", "29 ý tưởng", "tuyệt vời", "nhanh chóng"]
    },
    {
        id: 16,
        title: "Tin Can Crafts - Upcycled Trash",
        description: "Thủ công từ lon thiếc - Tái chế rác thải thành đồ hữu ích",
        embedId: "XCg90Yb_yZw",
        category: "metal",
        duration: "medium",
        difficulty: "easy",
        materials: ["Lon thiếc", "Nến", "Dây tim", "Kéo"],
        tags: ["lon thiếc", "tái chế", "rác thải", "hữu ích"]
    },
    {
        id: 17,
        title: "Recycle Soda Cans Into Fun Aluminum Crafts",
        description: "Tái chế lon nước ngọt thành đồ thủ công nhôm thú vị",
        embedId: "vCypOfwl3xs",
        category: "metal",
        duration: "medium",
        difficulty: "medium",
        materials: ["Lon nhôm", "Kéo", "Kìm", "Màu sơn"],
        tags: ["lon nhôm", "nước ngọt", "thú vị", "tái chế"]
    },
    {
        id: 18,
        title: "Làm hộp đựng bút từ hộp carton cũ",
        description: "Tái chế hộp carton thành hộp đựng bút xinh xắn",
        embedId: "demoCarton1", // Demo ID
        category: "paper",
        duration: "short",
        difficulty: "easy",
        materials: ["Hộp carton", "Giấy màu", "Keo dán", "Thước kẻ"],
        tags: ["carton", "hộp đựng", "bút", "văn phòng phẩm"]
    },
    {
        id: 19,
        title: "Túi xách từ áo thun cũ",
        description: "Biến áo thun cũ thành túi xách thời trang và bền đẹp",
        embedId: "demoFabric1", // Demo ID
        category: "fabric",
        duration: "long",
        difficulty: "medium",
        materials: ["Áo thun cũ", "Kéo", "Kim chỉ", "Máy khâu"],
        tags: ["áo thun", "túi xách", "thời trang", "may vá"]
    },
    {
        id: 20,
        title: "Gối ôm từ vải thừa",
        description: "Tạo gối ôm mềm mại từ những mảnh vải thừa",
        embedId: "demoFabric2", // Demo ID
        category: "fabric",
        duration: "long",
        difficulty: "hard",
        materials: ["Vải thừa", "Bông gòn", "Kim chỉ", "Máy khâu"],
        tags: ["vải thừa", "gối ôm", "nội thất", "handmade"]
    }
];

class VideoSearch {
    constructor() {
        this.currentFilters = {
            category: 'all',
            duration: 'all',
            difficulty: 'all',
            search: ''
        };
        
        this.initEventListeners();
        this.renderVideos(videoDatabase);
    }
    
    initEventListeners() {
        // Tìm kiếm
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        searchBtn.addEventListener('click', () => this.performSearch());
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        // Bộ lọc
        const filterButtons = document.querySelectorAll('.category-filter');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
    }
    
    performSearch() {
        const searchInput = document.getElementById('searchInput');
        this.currentFilters.search = searchInput.value.toLowerCase().trim();
        this.applyFilters();
    }
    
    handleFilter(event) {
        const btn = event.target;
        const filterType = btn.dataset.category || btn.dataset.duration || btn.dataset.difficulty;
        
        // Xác định loại filter
        if (btn.dataset.category) {
            this.currentFilters.category = filterType;
            // Cập nhật active state cho category buttons
            document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
        } else if (btn.dataset.duration) {
            this.currentFilters.duration = filterType;
            // Cập nhật active state cho duration buttons
            document.querySelectorAll('[data-duration]').forEach(b => b.classList.remove('active'));
        } else if (btn.dataset.difficulty) {
            this.currentFilters.difficulty = filterType;
            // Cập nhật active state cho difficulty buttons
            document.querySelectorAll('[data-difficulty]').forEach(b => b.classList.remove('active'));
        }
        
        btn.classList.add('active');
        this.applyFilters();
    }
    
    applyFilters() {
        let filteredVideos = videoDatabase.filter(video => {
            // Lọc theo danh mục
            if (this.currentFilters.category !== 'all' && video.category !== this.currentFilters.category) {
                return false;
            }
            
            // Lọc theo thời gian
            if (this.currentFilters.duration !== 'all' && video.duration !== this.currentFilters.duration) {
                return false;
            }
            
            // Lọc theo độ khó
            if (this.currentFilters.difficulty !== 'all' && video.difficulty !== this.currentFilters.difficulty) {
                return false;
            }
            
            // Lọc theo từ khóa tìm kiếm
            if (this.currentFilters.search) {
                const searchTerm = this.currentFilters.search;
                return video.title.toLowerCase().includes(searchTerm) ||
                       video.description.toLowerCase().includes(searchTerm) ||
                       video.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            }
            
            return true;
        });
        
        this.renderVideos(filteredVideos);
    }
    
    renderVideos(videos) {
        const resultsContainer = document.getElementById('videoResults');
        const noResultsDiv = document.getElementById('noResults');
        
        if (videos.length === 0) {
            resultsContainer.innerHTML = '';
            noResultsDiv.classList.remove('d-none');
            return;
        }
        
        noResultsDiv.classList.add('d-none');
        
        const videosHTML = videos.map(video => this.createVideoCard(video)).join('');
        resultsContainer.innerHTML = videosHTML;
    }
    
    createVideoCard(video) {
        const difficultyColors = {
            easy: 'success',
            medium: 'warning',
            hard: 'danger'
        };
        
        const difficultyLabels = {
            easy: 'Dễ',
            medium: 'Trung bình',
            hard: 'Khó'
        };
        
        const durationLabels = {
            short: '< 5 phút',
            medium: '5-15 phút',
            long: '> 15 phút'
        };
        
        const categoryLabels = {
            plastic: 'Chai nhựa',
            paper: 'Giấy/Carton',
            metal: 'Kim loại',
            fabric: 'Vải cũ'
        };
        
        // Kiểm tra xem có phải video thật từ YouTube không
        const isRealVideo = !video.embedId.startsWith('demo');
        const videoHTML = isRealVideo ? 
            `<iframe src="https://www.youtube.com/embed/${video.embedId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` :
            `<div class="d-flex align-items-center justify-content-center bg-light" style="height: 100%;">
                <div class="text-center">
                    <i class="fas fa-video fa-3x text-muted mb-2"></i>
                    <p class="text-muted">Video Demo</p>
                </div>
            </div>`;
        
        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card video-card">
                    <div class="video-thumbnail">
                        ${videoHTML}
                        <span class="badge bg-${difficultyColors[video.difficulty]} difficulty-badge">
                            ${difficultyLabels[video.difficulty]}
                        </span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <p class="card-text text-muted">${video.description}</p>
                        
                        <div class="mb-3">
                            <span class="badge bg-primary me-1">${categoryLabels[video.category]}</span>
                            <span class="badge bg-info me-1">${durationLabels[video.duration]}</span>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="small text-muted mb-1">Nguyên liệu cần:</h6>
                            <div class="d-flex flex-wrap gap-1">
                                ${video.materials.map(material => 
                                    `<span class="badge bg-light text-dark">${material}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        ${isRealVideo ? 
                            `<a href="https://www.youtube.com/watch?v=${video.embedId}" target="_blank" class="btn btn-success btn-sm">
                                <i class="fab fa-youtube me-1"></i>Xem trên YouTube
                            </a>` :
                            `<button class="btn btn-secondary btn-sm" disabled>
                                <i class="fas fa-video me-1"></i>Video Demo
                            </button>`
                        }
                    </div>
                </div>
            </div>
        `;
    }
}

// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    new VideoSearch();
});

