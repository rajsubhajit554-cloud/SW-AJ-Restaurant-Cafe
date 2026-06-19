// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

// Close menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
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
window.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-fade-out');
            document.body.style.overflowY = 'auto'; // Re-enable vertical scrolling
        }, 1000); // 1 second duration
    }
});

// Food Bowl Click-to-Pour Soup Animation
const bowlContainer = document.querySelector('.hot-bowl-container');
if (bowlContainer) {
    bowlContainer.addEventListener('click', () => {
        if (!bowlContainer.classList.contains('pouring')) {
            bowlContainer.classList.add('pouring');
            setTimeout(() => {
                bowlContainer.classList.remove('pouring');
            }, 3000); // Reset pouring animation and empty the bowl after 3 seconds
        }
    });
}

// ============================================================
// SLIDE-OUT MESSAGE PANEL LOGIC
// ============================================================
const openMsgPanelBtn = document.getElementById('open-msg-panel-btn');
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
        document.body.style.overflow = 'hidden'; // Disable page scrolling
    }
}

function closeMessagePanel() {
    if (msgPanel && msgPanelOverlay) {
        msgPanel.classList.remove('active');
        msgPanelOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore page scrolling
        // Reset status message
        if (msgStatusContainer) {
            msgStatusContainer.style.display = 'none';
            msgStatusContainer.className = 'msg-status-container';
        }
    }
}

if (openMsgPanelBtn) {
    openMsgPanelBtn.addEventListener('click', openMessagePanel);
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
