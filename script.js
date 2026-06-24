// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Mobile & Desktop Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent document click handler from firing immediately
    navLinks.classList.toggle('nav-active');
});

// Close menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});

// Close menu when clicking anywhere outside the menu and hamburger button
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('nav-active')) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('nav-active');
        }
    }
});

// Close menu when user scrolls the page
window.addEventListener('scroll', () => {
    if (navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
    }
});

// Reveal Elements on Scroll
const revealElements = document.querySelectorAll('.reviews-slider-container, .vibe-text, .contact-container');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 0.8s ease-out';
        } else if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Banner Image Slider (Fade and Scale Effect)
const bannerImages = document.querySelectorAll('.hero-bg img');
let currentImageIndex = 0;

function updateBannerBg(imgElement) {
    const bannerContainer = document.querySelector('.hero-bg');
    if (bannerContainer && imgElement) {
        bannerContainer.style.setProperty('--bg-image', `url("${imgElement.src}")`);
    }
}

function rotateBanner() {
    if (bannerImages.length <= 1) return;
    
    const nextIndex = (currentImageIndex + 1) % bannerImages.length;
    
    // Remove states from all images first
    bannerImages.forEach(img => {
        img.classList.remove('active', 'prev');
    });
    
    // Set classes for smooth transition
    bannerImages[currentImageIndex].classList.add('prev');
    bannerImages[nextIndex].classList.add('active');
    
    updateBannerBg(bannerImages[nextIndex]);
    
    currentImageIndex = nextIndex;
}

if (bannerImages.length > 0) {
    // Ensure the first image is active on start
    bannerImages[0].classList.add('active');
    updateBannerBg(bannerImages[0]);
    if (bannerImages.length > 1) {
        setInterval(rotateBanner, 5000); // Change image every 5 seconds
    }
}

// Reviews Slider Animation
const reviewItems = document.querySelectorAll('.reviews-slider .review-slide');
const reviewDots = document.querySelectorAll('.slider-dots .dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentReviewIndex = 0;
let reviewInterval;

function showReview(index) {
    if (reviewItems.length === 0) return;
    
    // Wrap around index
    if (index >= reviewItems.length) {
        currentReviewIndex = 0;
    } else if (index < 0) {
        currentReviewIndex = reviewItems.length - 1;
    } else {
        currentReviewIndex = index;
    }
    
    // Update active classes for reviews
    reviewItems.forEach((item, i) => {
        if (i === currentReviewIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Update active classes for dots
    reviewDots.forEach((dot, i) => {
        if (i === currentReviewIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startReviewTimer() {
    stopReviewTimer();
    reviewInterval = setInterval(() => {
        showReview(currentReviewIndex + 1);
    }, 5000); // changes review every 5 seconds
}

function stopReviewTimer() {
    if (reviewInterval) {
        clearInterval(reviewInterval);
    }
}

// Event Listeners for controls
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showReview(currentReviewIndex + 1);
        startReviewTimer(); // reset timer on manual click
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showReview(currentReviewIndex - 1);
        startReviewTimer(); // reset timer on manual click
    });
}

if (reviewDots) {
    reviewDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            showReview(index);
            startReviewTimer(); // reset timer on manual click
        });
    });
}

// Initialize reviews slider
if (reviewItems.length > 0) {
    showReview(0);
    startReviewTimer();
}

// Preloader Screen Logic (Fades out after 1 second and restores scrolling)
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-fade-out');
            document.body.classList.remove('no-scroll'); // Re-enable vertical scrolling
        }, 1000); // 1 second duration
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initPreloader);
} else {
    initPreloader();
}

// FIFA 2026 Football Click-to-Shoot Goal Animation
const football = document.getElementById('interactive-football');
const pitchContainer = document.querySelector('.soccer-pitch-container');
if (football && pitchContainer) {
    football.addEventListener('click', () => {
        if (!pitchContainer.classList.contains('shooting')) {
            pitchContainer.classList.add('shooting');
            
            // Goal scored state shortly after (when ball hits the net)
            setTimeout(() => {
                pitchContainer.classList.add('goal-scored');
            }, 300); // 300ms matches the ball hitting the net in keyframes
            
            // Reset animations after 1.5 seconds (duration of shootBall)
            setTimeout(() => {
                pitchContainer.classList.remove('shooting', 'goal-scored');
            }, 1500);
        }
    });
}

// ============================================================
// SLIDE-OUT MESSAGE PANEL LOGIC
// ============================================================
// Quick Actions Panel Logic
const openQuickPanelBtn = document.getElementById('open-quick-panel-btn');
const closeQuickPanelBtn = document.getElementById('close-quick-panel-btn');
const quickPanel = document.getElementById('quick-panel');
const quickPanelOverlay = document.getElementById('quick-panel-overlay');
const openMsgPanelFromQuickBtn = document.getElementById('open-msg-panel-from-quick-btn');

function openQuickPanel() {
    if (quickPanel && quickPanelOverlay) {
        quickPanel.classList.add('active');
        quickPanelOverlay.classList.add('active');
        document.body.classList.add('no-scroll'); // Disable page scrolling
    }
}

function closeQuickPanel() {
    if (quickPanel && quickPanelOverlay) {
        quickPanel.classList.remove('active');
        quickPanelOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Restore page scrolling
    }
}

if (openQuickPanelBtn) {
    openQuickPanelBtn.addEventListener('click', openQuickPanel);
}

if (closeQuickPanelBtn) {
    closeQuickPanelBtn.addEventListener('click', closeQuickPanel);
}

if (quickPanelOverlay) {
    quickPanelOverlay.addEventListener('click', closeQuickPanel);
}

// Message Panel Logic
const closeMsgPanelBtn = document.getElementById('close-msg-panel-btn');
const msgPanel = document.getElementById('msg-panel');
const msgPanelOverlay = document.getElementById('msg-panel-overlay');
const msgPanelForm = document.getElementById('msg-panel-form');
const submitMsgBtn = document.getElementById('submit-msg-btn');
const msgStatusContainer = document.getElementById('msg-status-container');

// Google Sheet Web App URL provided by user
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwFRBfgECv4kyCOJCrjDmpbWn4oIkiCJOpGndOI_d3SCzTtWGuG14uJZ2xGtUIDEsL8/exec";

function openMessagePanel() {
    if (msgPanel && msgPanelOverlay) {
        msgPanel.classList.add('active');
        msgPanelOverlay.classList.add('active');
        document.body.classList.add('no-scroll'); // Disable page scrolling
    }
}

function closeMessagePanel() {
    if (msgPanel && msgPanelOverlay) {
        msgPanel.classList.remove('active');
        msgPanelOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Restore page scrolling
        // Reset status message
        if (msgStatusContainer) {
            msgStatusContainer.style.display = 'none';
            msgStatusContainer.className = 'msg-status-container';
        }
    }
}

if (openMsgPanelFromQuickBtn) {
    openMsgPanelFromQuickBtn.addEventListener('click', () => {
        closeQuickPanel();
        setTimeout(openMessagePanel, 350); // smooth panel change transition
    });
}

if (closeMsgPanelBtn) {
    closeMsgPanelBtn.addEventListener('click', closeMessagePanel);
}

if (msgPanelOverlay) {
    msgPanelOverlay.addEventListener('click', closeMessagePanel);
}

// Handle Form Submission
if (msgPanelForm) {
    msgPanelForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('msg-name');
        const emailInput = document.getElementById('msg-email');
        const contentInput = document.getElementById('msg-content');

        if (!nameInput || !emailInput || !contentInput) return;

        const payload = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: contentInput.value.trim()
        };

        // Disable button and show loading state
        submitMsgBtn.disabled = true;
        const originalBtnContent = submitMsgBtn.innerHTML;
        submitMsgBtn.innerHTML = '<div class="btn-loader"></div> Sending...';

        // Hide previous status
        if (msgStatusContainer) {
            msgStatusContainer.style.display = 'none';
        }

        // Send post request to Google Sheets script
        fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8' // Apps Script handles text/plain without triggering CORS preflight options blocks in some environments
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            // Apps script returns 200 or redirect
            submitMsgBtn.innerHTML = originalBtnContent;
            submitMsgBtn.disabled = false;
            
            if (msgStatusContainer) {
                msgStatusContainer.textContent = "Your message was sent successfully! Thank you.";
                msgStatusContainer.className = "msg-status-container success";
            }
            
            // Clear inputs
            msgPanelForm.reset();
            
            // Auto close after 3 seconds
            setTimeout(closeMessagePanel, 3000);
        })
        .catch((error) => {
            // Error response
            submitMsgBtn.innerHTML = originalBtnContent;
            submitMsgBtn.disabled = false;
            
            if (msgStatusContainer) {
                msgStatusContainer.textContent = "Something went wrong. Please try again.";
                msgStatusContainer.className = "msg-status-container error";
            }
            console.error("Error submitting contact form:", error);
        });
    });
}

// ============================================================
// REDEEM CODE PANEL LOGIC
// ============================================================
const openRedeemPanelBtn = document.getElementById('open-redeem-panel-from-quick-btn');
const closeRedeemPanelBtn = document.getElementById('close-redeem-panel-btn');
const redeemPanel = document.getElementById('redeem-panel');
const redeemPanelOverlay = document.getElementById('redeem-panel-overlay');
const redeemForm = document.getElementById('redeem-panel-form');
const submitRedeemBtn = document.getElementById('submit-redeem-btn');
const redeemStatusContainer = document.getElementById('redeem-status-container');

// Elements for success state (ticket)
const ticketContainer = document.getElementById('ticket-container');
const ticketTokenDisplay = document.getElementById('ticket-token-display');
const copyTokenBtn = document.getElementById('copy-token-btn');
const redeemAgainBtn = document.getElementById('redeem-again-btn');

// Elements for history state
const redeemHistoryContainer = document.getElementById('redeem-history-container');
const historyList = document.getElementById('history-list');
const historyBadge = document.getElementById('history-badge');
const toggleHistoryViewBtn = document.getElementById('toggle-history-view-btn');
const backToFormBtn = document.getElementById('back-to-form-btn');

// List of valid codes (case-insensitive)
const VALID_CODES = ["HZN-100", "HZN-VIP", "AJWELCOME", "AJCOFFEE", "SPECIAL20", "AJVIP", "DRIPZA2026"];

function openRedeemPanel() {
    if (redeemPanel && redeemPanelOverlay) {
        redeemPanel.classList.add('active');
        redeemPanelOverlay.classList.add('active');
        document.body.classList.add('no-scroll'); // Disable page scrolling
        renderRedeemHistory(); // Render up-to-date history
    }
}

function closeRedeemPanel() {
    if (redeemPanel && redeemPanelOverlay) {
        redeemPanel.classList.remove('active');
        redeemPanelOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll'); // Restore page scrolling
        
        // Reset states to form view
        resetRedeemViews();
    }
}

function resetRedeemViews() {
    if (redeemForm) redeemForm.style.display = 'flex';
    if (ticketContainer) ticketContainer.style.display = 'none';
    if (redeemHistoryContainer) redeemHistoryContainer.style.display = 'none';
    if (redeemStatusContainer) {
        redeemStatusContainer.style.display = 'none';
        redeemStatusContainer.className = 'redeem-status-container';
    }
}

const openRedeemPanelDirectBtn = document.getElementById('open-redeem-panel-direct-btn');

if (openRedeemPanelDirectBtn) {
    openRedeemPanelDirectBtn.addEventListener('click', () => {
        openRedeemPanel();
    });
}

if (openRedeemPanelBtn) {
    openRedeemPanelBtn.addEventListener('click', () => {
        closeQuickPanel();
        setTimeout(openRedeemPanel, 350); // smooth panel change transition
    });
}

if (closeRedeemPanelBtn) {
    closeRedeemPanelBtn.addEventListener('click', closeRedeemPanel);
}

if (redeemPanelOverlay) {
    redeemPanelOverlay.addEventListener('click', closeRedeemPanel);
}

// Generate unique token AJT-XXXXXX
function generateUniqueToken() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = 'AJT-';
    for (let i = 0; i < 6; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// LocalStorage helpers for History
function getRedeemedTokens() {
    return JSON.parse(localStorage.getItem('aj_redeemed_tokens') || '[]');
}

function saveRedeemedToken(code, token) {
    const tokens = getRedeemedTokens();
    const newToken = {
        code: code.toUpperCase(),
        token: token,
        date: new Date().toLocaleString()
    };
    tokens.unshift(newToken); // Add to beginning of array
    localStorage.setItem('aj_redeemed_tokens', JSON.stringify(tokens));
}

function renderRedeemHistory() {
    if (!historyList || !historyBadge) return;
    
    const tokens = getRedeemedTokens();
    historyBadge.textContent = tokens.length;
    
    if (tokens.length === 0) {
        historyList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No tokens claimed yet. Enter a code to get started!</div>';
        return;
    }
    
    let html = '';
    tokens.forEach((item) => {
        html += `
            <div class="history-card">
                <div class="history-details">
                    <span class="history-code-tag">${escapeHtml(item.code)}</span>
                    <span class="history-token">${escapeHtml(item.token)}</span>
                    <span class="history-date">${escapeHtml(item.date)}</span>
                </div>
                <button type="button" class="history-copy-btn" data-token="${escapeHtml(item.token)}" title="Copy Token">
                    <i class="far fa-copy"></i>
                </button>
            </div>
        `;
    });
    historyList.innerHTML = html;
    
    // Add copy event listeners to history items
    const copyBtns = historyList.querySelectorAll('.history-copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tokenToCopy = btn.getAttribute('data-token');
            const originalIcon = btn.innerHTML;
            navigator.clipboard.writeText(tokenToCopy).then(() => {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.style.borderColor = 'var(--accent-gold)';
                setTimeout(() => {
                    btn.innerHTML = originalIcon;
                    btn.style.borderColor = '';
                }, 2000);
            });
        });
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

// Handle Form Submission for Verification
if (redeemForm) {
    redeemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('redeem-name');
        const whatsappInput = document.getElementById('redeem-whatsapp');
        const codeInput = document.getElementById('redeem-code');
        
        if (!nameInput || !whatsappInput || !codeInput) return;
        
        const code = codeInput.value.trim().toUpperCase();
        
        // Hide previous status message
        if (redeemStatusContainer) {
            redeemStatusContainer.style.display = 'none';
        }
        
        // 1. Client side validation check
        if (!VALID_CODES.includes(code)) {
            if (redeemStatusContainer) {
                redeemStatusContainer.textContent = "Invalid Invitation Code! Please check your code and try again.";
                redeemStatusContainer.className = "redeem-status-container error";
            }
            return;
        }
        
        // 2. Code is valid, generate unique token
        const generatedToken = generateUniqueToken();
        
        // Disable button & show loading state
        submitRedeemBtn.disabled = true;
        const originalBtnText = submitRedeemBtn.textContent;
        submitRedeemBtn.innerHTML = '<div class="btn-loader" style="display:inline-block; margin-right:8px; vertical-align:middle; border: 2px solid rgba(255,255,255,0.2); border-top-color: #fff; width: 14px; height: 14px; border-radius: 50%; animation: spin 0.8s linear infinite;"></div> SUBMITTING...';
        
        // Map to existing Google Sheet schema (name, email, message) so no Apps Script change is needed
        const payload = {
            name: nameInput.value.trim(),
            email: whatsappInput.value.trim(), // sent in the email/phone field
            message: `REDEEM CODE - Code: ${code} | Token: ${generatedToken}`
        };
        
        // Send request to Google Sheet script
        fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            // Re-enable button
            submitRedeemBtn.innerHTML = originalBtnText;
            submitRedeemBtn.disabled = false;
            
            // Save to localStorage history
            saveRedeemedToken(code, generatedToken);
            
            // Show Success Ticket
            redeemForm.style.display = 'none';
            if (ticketContainer && ticketTokenDisplay) {
                ticketTokenDisplay.textContent = generatedToken;
                ticketContainer.style.display = 'flex';
            }
            
            // Reset form
            redeemForm.reset();
        })
        .catch(error => {
            console.error("Error submitting redeem request:", error);
            
            // Even if network fails or CORS blocks, we save it locally so the customer gets their token!
            submitRedeemBtn.innerHTML = originalBtnText;
            submitRedeemBtn.disabled = false;
            
            saveRedeemedToken(code, generatedToken);
            
            // Show success ticket anyway so user experience is not broken, but log warning
            redeemForm.style.display = 'none';
            if (ticketContainer && ticketTokenDisplay) {
                ticketTokenDisplay.textContent = generatedToken;
                ticketContainer.style.display = 'flex';
            }
            
            if (redeemStatusContainer) {
                redeemStatusContainer.textContent = "Token generated locally. (Offline Backup Saved)";
                redeemStatusContainer.className = "redeem-status-container success";
            }
            
            redeemForm.reset();
        });
    });
}

// Copy Token from success ticket
if (copyTokenBtn && ticketTokenDisplay) {
    copyTokenBtn.addEventListener('click', () => {
        const tokenText = ticketTokenDisplay.textContent;
        const originalHtml = copyTokenBtn.innerHTML;
        navigator.clipboard.writeText(tokenText).then(() => {
            copyTokenBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyTokenBtn.innerHTML = originalHtml;
            }, 2000);
        });
    });
}

// Redeem another code
if (redeemAgainBtn) {
    redeemAgainBtn.addEventListener('click', () => {
        resetRedeemViews();
    });
}

// Toggle History View
if (toggleHistoryViewBtn) {
    toggleHistoryViewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (redeemForm) redeemForm.style.display = 'none';
        if (ticketContainer) ticketContainer.style.display = 'none';
        if (redeemHistoryContainer) {
            renderRedeemHistory();
            redeemHistoryContainer.style.display = 'flex';
        }
    });
}

// Back to registration form from history view
if (backToFormBtn) {
    backToFormBtn.addEventListener('click', () => {
        resetRedeemViews();
    });
}

