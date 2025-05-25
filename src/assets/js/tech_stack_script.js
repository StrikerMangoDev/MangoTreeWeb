// Load header and footer
$(document).ready(function() {
    // Load header
    $("#header-placeholder").load("header.html", function() {
        // Activate the current page in navigation
        $('.nav-links a[href="tech_stack.html"]').addClass('active');
    });

    // Load footer
    $("#footer-placeholder").load("footer.html");

    // Initialize animations
    initTechCardAnimations();
    initProcessStepAnimations();
});

// Tech Card Animations
function initTechCardAnimations() {
    const cards = document.querySelectorAll('.tech-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for each card
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
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

    // Add hover effects for tech icons
    cards.forEach(card => {
        const icon = card.querySelector('img');
        if (icon) {
            card.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
}

// Process Step Animations
function initProcessStepAnimations() {
    const steps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
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
document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll to contact form or open modal
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