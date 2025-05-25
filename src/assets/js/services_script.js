// Load header and footer
$(document).ready(function() {
    // Load header
    $("#header-placeholder").load("header.html", function() {
        // Activate the current page in navigation
        $('.nav-links a[href="services.html"]').addClass('active');
    });

    // Load footer
    $("#footer-placeholder").load("footer.html");

    // Initialize animations for service cards
    initServiceCardAnimations();

    // Initialize process step animations
    initProcessStepAnimations();

    // Initialize CTA button interaction
    initCTAButton();
});

// Service Card Animations
function initServiceCardAnimations() {
    const cards = document.querySelectorAll('.service-detail-card');
    
    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe each card
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Process Step Animations
function initProcessStepAnimations() {
    const steps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for each step
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });

    // Set initial state and observe each step
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.5s ease-out';
        observer.observe(step);
    });
}

// CTA Button Interaction
function initCTAButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll to contact form or open modal
            // For now, we'll just scroll to the contact section if it exists
            const contactSection = document.querySelector('.schedule-meeting-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Add hover animation
        ctaButton.addEventListener('mouseover', () => {
            ctaButton.style.transform = 'translateY(-3px)';
        });

        ctaButton.addEventListener('mouseout', () => {
            ctaButton.style.transform = 'translateY(0)';
        });
    }
}

// Service Icon Grid Animation
function initServiceIconGrid() {
    const iconItems = document.querySelectorAll('.service-icon-item');
    
    iconItems.forEach((item, index) => {
        // Add staggered animation on page load
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Initialize all animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initServiceCardAnimations();
    initProcessStepAnimations();
    initServiceIconGrid();
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 