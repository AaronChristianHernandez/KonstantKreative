/* ========================================
   KONSTANT KREATIVE - INTERACTIVE SCRIPT
   ======================================== */

// Demo Modal Functions
const demoModal = document.getElementById('demoModal');
const demoForm = document.getElementById('demoForm');
let modalAutoOpened = false;
let sectionsViewedForModal = 0;
const pageSections = document.querySelectorAll('section');

function openDemoModal() {
    if (demoModal.classList.contains('is-open')) {
        return;
    }
    demoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    demoModal.classList.add('is-open');
    modalAutoOpened = true;
    // Add animation if modal is present
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'slideIn 0.3s ease';
    }
}

function closeDemoModal() {
    if (!demoModal.classList.contains('is-open')) {
        return;
    }
    demoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    if (demoForm) {
        demoForm.reset();
    }
    demoModal.classList.remove('is-open');
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === demoModal) {
        closeDemoModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeDemoModal();
    }
});

// Handle Form Submission
demoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        services: document.getElementById('services').value
    };
    
    // Validate form
    if (!formData.name || !formData.email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real application, you would send this data to a server
    console.log('Demo Booking Request:', formData);
    
    // Show success message
    showSuccessMessage();
    
    // Close modal after 2 seconds
    setTimeout(closeDemoModal, 2000);
});

function showSuccessMessage() {
    const modal = document.querySelector('.modal-content');
    const originalContent = modal.innerHTML;
    
    modal.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">✓</div>
            <h3 style="color: #1E40AF; margin-bottom: 1rem;">Strategy Session Scheduled</h3>
            <p style="color: #4B5563; margin-bottom: 1rem;">Thank you for reaching out. A Konstant Kreative engagement lead will confirm details and next steps within one business day.</p>
            <p style="color: #9CA3AF; font-size: 0.9rem;">You can close this window or continue exploring the site.</p>
        </div>
    `;
    
    setTimeout(() => {
        modal.innerHTML = originalContent;
    }, 2000);
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and testimonial cards
document.querySelectorAll('.feature-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    pageSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form validation with real-time feedback
document.getElementById('email').addEventListener('blur', function() {
    const email = this.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        this.style.borderColor = '#ff6b35';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    const phone = this.value;
    const phoneRegex = /^[\d\-\+\(\)\s]{0,}$/;
    
    if (phone && !phoneRegex.test(phone)) {
        this.style.borderColor = '#ff6b35';
    } else {
        this.style.borderColor = '#e0e0e0';
    }
});

// Simple image animation on load
window.addEventListener('load', () => {
    document.querySelectorAll('img[data-animate="fade"]').forEach((img, index) => {
        const delay = 100 + index * 80;
        setTimeout(() => {
            img.style.opacity = '1';
            img.style.transform = 'translateY(0) scale(1)';
        }, delay);
    });
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log(`Event: ${eventName}`, eventData);
    // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
}

// Track CTA button clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        const label = this.textContent.trim().toLowerCase();
        if (label.includes('book') || label.includes('demo') || label.includes('schedule')) {
            trackEvent('CTA_Click', { type: 'primary_cta', label: label });
        }
    });
});

// Track section views and trigger modal after five unique sections
function evaluateSectionViews() {
    pageSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !section.dataset.viewed) {
            section.dataset.viewed = 'true';
            const sectionId = section.getAttribute('id');
            if (sectionId) {
                trackEvent('Section_View', { section: sectionId });
            }
            sectionsViewedForModal += 1;
            if (!modalAutoOpened && sectionsViewedForModal >= 5) {
                openDemoModal();
            }
        }
    });
}

window.addEventListener('scroll', evaluateSectionViews);
window.addEventListener('load', evaluateSectionViews);

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('Konstant Kreative website loaded successfully');
});

// Prevent multiple form submissions
let formSubmitting = false;
demoForm.addEventListener('submit', function(e) {
    if (formSubmitting) {
        e.preventDefault();
        return;
    }
    formSubmitting = true;
    setTimeout(() => { formSubmitting = false; }, 2000);
});

// Accessibility: Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const focused = document.activeElement;
        if (focused.classList.contains('btn-primary')) {
            focused.click();
        }
    }
});
