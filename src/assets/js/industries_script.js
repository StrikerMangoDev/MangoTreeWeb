// Load header and footer
$(document).ready(function() {
    // Load header
    $("#header-placeholder").load("header.html", function() {
        // Activate the current page in navigation
        $('.nav-links a[href="industries.html"]').addClass('active');
    });

    // Load footer
    $("#footer-placeholder").load("footer.html");

    // Initialize animations
    initIndustryCardAnimations();
    initStatCounters();
    initExpertiseAnimations();
    initCaseStudyAnimations();
});

// Industry Card Animations
function initIndustryCardAnimations() {
    const cards = document.querySelectorAll('.industry-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// Stat Counter Animation
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Divide animation into 50 steps
    const duration = 1500; // Animation duration in milliseconds
    const stepTime = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, stepTime);
}

// Expertise Section Animations
function initExpertiseAnimations() {
    const expertiseItems = document.querySelectorAll('.expertise-list li');
    const stats = document.querySelectorAll('.expertise-stat');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    expertiseItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease-out';
        observer.observe(item);
    });

    stats.forEach(stat => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease-out';
        observer.observe(stat);
    });
}

// Case Study Card Animations
function initCaseStudyAnimations() {
    const cards = document.querySelectorAll('.case-study-card');
    
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

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

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

// CTA Button Interaction
document.querySelector('.cta-button')?.addEventListener('click', () => {
    // Scroll to contact form or open modal
    const contactSection = document.querySelector('.schedule-meeting-section');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}); 