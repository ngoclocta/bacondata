// Enhanced PWA JavaScript

class EnhancedPWA {
    constructor() {
        this.isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        this.deferredPrompt = null;
        this.isOnline = navigator.onLine;
        
        this.init();
    }
    
    init() {
        this.showSplashScreen();
        this.setupInstallPrompt();
        this.setupOfflineDetection();
        this.setupServiceWorker();
        this.setupAppLikeFeatures();
    }
    
    showSplashScreen() {
        // Only show splash screen in standalone mode or first visit
        if (this.isStandalone || !localStorage.getItem('visited')) {
            const splash = document.createElement('div');
            splash.className = 'splash-screen';
            splash.innerHTML = `
                <div class="splash-logo">
                    <i class="fas fa-leaf"></i>
                </div>
                <div class="splash-title">Web Xanh</div>
                <div class="splash-subtitle">Chung tay vì môi trường xanh</div>
                <div class="splash-loader"></div>
            `;
            
            document.body.appendChild(splash);
            
            // Hide splash screen after 2.5 seconds
            setTimeout(() => {
                splash.classList.add('fade-out');
                setTimeout(() => {
                    splash.remove();
                }, 500);
            }, 2500);
            
            localStorage.setItem('visited', 'true');
        }
    }
    
    setupInstallPrompt() {
        // Listen for install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Don't show if already installed
            if (!this.isStandalone) {
                this.showInstallPrompt();
            }
        });
        
        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.hideInstallPrompt();
        });
    }
    
    showInstallPrompt() {
        // Don't show if user dismissed recently
        const dismissed = localStorage.getItem('installPromptDismissed');
        if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) {
            return; // Wait 7 days before showing again
        }
        
        const prompt = document.createElement('div');
        prompt.className = 'install-prompt';
        prompt.innerHTML = `
            <button class="close-btn" onclick="this.parentElement.remove()">&times;</button>
            <div class="d-flex align-items-center">
                <i class="fas fa-mobile-alt fa-2x text-success me-3"></i>
                <div>
                    <h6 class="mb-1">Cài đặt ứng dụng</h6>
                    <p class="mb-2 text-muted small">Thêm Web Xanh vào màn hình chính để truy cập nhanh hơn</p>
                    <button class="btn btn-success btn-sm me-2" id="installBtn">Cài đặt</button>
                    <button class="btn btn-outline-secondary btn-sm" onclick="this.closest('.install-prompt').remove()">Để sau</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(prompt);
        
        // Show with animation
        setTimeout(() => prompt.classList.add('show'), 100);
        
        // Handle install button click
        prompt.querySelector('#installBtn').addEventListener('click', () => {
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    this.deferredPrompt = null;
                });
            }
            prompt.remove();
        });
        
        // Handle close button
        prompt.querySelector('.close-btn').addEventListener('click', () => {
            localStorage.setItem('installPromptDismissed', Date.now().toString());
            prompt.remove();
        });
    }
    
    hideInstallPrompt() {
        const prompt = document.querySelector('.install-prompt');
        if (prompt) {
            prompt.remove();
        }
    }
    
    setupOfflineDetection() {
        const offlineIndicator = document.createElement('div');
        offlineIndicator.className = 'offline-indicator';
        offlineIndicator.innerHTML = `
            <i class="fas fa-wifi me-2"></i>
            Không có kết nối internet - Một số tính năng có thể bị hạn chế
        `;
        document.body.appendChild(offlineIndicator);
        
        const updateOnlineStatus = () => {
            this.isOnline = navigator.onLine;
            if (this.isOnline) {
                offlineIndicator.classList.remove('show');
            } else {
                offlineIndicator.classList.add('show');
            }
        };
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        
        // Initial check
        updateOnlineStatus();
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/static/sw.js')
                .then((registration) => {
                    console.log('SW registered: ', registration);
                })
                .catch((registrationError) => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }
    
    setupAppLikeFeatures() {
        // Add app-like header in standalone mode
        if (this.isStandalone) {
            document.body.classList.add('standalone-app');
            
            // Add status bar overlay for iOS
            if (this.isIOS()) {
                const statusBar = document.createElement('div');
                statusBar.className = 'status-bar-overlay';
                document.body.prepend(statusBar);
            }
        }
        
        // Add page transition effects
        this.setupPageTransitions();
        
        // Enhanced touch interactions
        this.setupTouchInteractions();
        
        // Prevent zoom on double tap
        this.preventDoubleTabZoom();
    }
    
    setupPageTransitions() {
        // Add transition class to main content
        const main = document.querySelector('main');
        if (main) {
            main.classList.add('page-transition');
        }
    }
    
    setupTouchInteractions() {
        // Add touch feedback to interactive elements
        const interactiveElements = document.querySelectorAll('.card, .btn, .solution-option');
        interactiveElements.forEach(element => {
            element.classList.add('interactive-card');
        });
    }
    
    preventDoubleTabZoom() {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
    
    // Utility method to show loading states
    showLoading(element) {
        element.classList.add('loading-skeleton');
    }
    
    hideLoading(element) {
        element.classList.remove('loading-skeleton');
    }
}

// Initialize Enhanced PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedPWA();
});

// Export for use in other scripts
window.EnhancedPWA = EnhancedPWA;

