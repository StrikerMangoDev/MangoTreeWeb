// Load header and footer
$(document).ready(function() {
    // Load header
    $("#header-placeholder").load("header.html", function() {
        // Activate the current page in navigation
        $('.nav-links a[href="social_proof.html"]').addClass('active');
    });

    // Load footer
    $("#footer-placeholder").load("footer.html");

    // Initialize animations
    initMetricCounters();
    initClientLogos();
    initTestimonialCards();
    initSuccessStories();
});

// Metric Counter Animation
function initMetricCounters() {
    const metrics = document.querySelectorAll('.metric-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.value);
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    metrics.forEach(metric => observer.observe(metric));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Divide animation into 50 steps
    const duration = 2000; // Animation duration in milliseconds
    const stepTime = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 100 ? '+' : '%');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (target > 100 ? '+' : '%');
        }
    }, stepTime);
}

// Client Logo Animations
function initClientLogos() {
    const logos = document.querySelectorAll('.logo-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '0.6';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    logos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'all 0.5s ease-out';
        observer.observe(logo);
    });
}

// Testimonial Card Animations
function initTestimonialCards() {
    const cards = document.querySelectorAll('.testimonial-card');
    
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

// Success Stories Animations
function initSuccessStories() {
    const stories = document.querySelectorAll('.story-card');
    
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

    stories.forEach(story => {
        story.style.opacity = '0';
        story.style.transform = 'translateY(30px)';
        story.style.transition = 'all 0.6s ease-out';
        observer.observe(story);
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

document.addEventListener('DOMContentLoaded', function() {
    // Sample testimonial data
    const testimonials = [
        {
            content: "Their expertise in digital transformation helped us achieve a 200% increase in online sales within six months. The team's dedication and innovative solutions exceeded our expectations.",
            author: "Sarah Johnson",
            position: "CEO, TechCorp Inc.",
            image: "https://via.placeholder.com/60x60"
        },
        {
            content: "The team's technical expertise and commitment to quality delivered a robust solution that transformed our business operations. They're more than just service providers; they're true partners.",
            author: "Michael Chen",
            position: "CTO, Innovation Labs",
            image: "https://via.placeholder.com/60x60"
        },
        {
            content: "Their innovative approach to problem-solving and attention to detail resulted in a seamless digital transformation that improved our efficiency by 150%.",
            author: "Emily Rodriguez",
            position: "COO, Global Solutions",
            image: "https://via.placeholder.com/60x60"
        }
    ];

    // Sample case studies data
    const caseStudies = [
        {
            title: "E-commerce Transformation",
            description: "How we helped a traditional retailer achieve 200% growth through digital transformation",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
            achievements: [
                "200% increase in online sales",
                "50% improvement in customer engagement",
                "35% reduction in operational costs"
            ]
        },
        {
            title: "Healthcare Innovation",
            description: "Revolutionizing patient care through digital health solutions",
            image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
            achievements: [
                "40% improvement in patient care efficiency",
                "60% reduction in wait times",
                "90% patient satisfaction rate"
            ]
        }
    ];

    // Populate testimonials
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (testimonialsGrid) {
        testimonials.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            testimonialCard.innerHTML = `
                <div class="testimonial-content">
                    <i class="fas fa-quote-left"></i>
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <img src="${testimonial.image}" alt="${testimonial.author}">
                    <div class="author-info">
                        <h4>${testimonial.author}</h4>
                        <p>${testimonial.position}</p>
                    </div>
                </div>
            `;
            testimonialsGrid.appendChild(testimonialCard);
        });
    }

    // Populate case studies
    const caseStudiesGrid = document.querySelector('.case-studies-grid');
    if (caseStudiesGrid) {
        caseStudies.forEach(study => {
            const caseStudyCard = document.createElement('div');
            caseStudyCard.className = 'case-study-card';
            caseStudyCard.innerHTML = `
                <div class="case-study-image">
                    <img src="${study.image}" alt="${study.title}">
                </div>
                <div class="case-study-content">
                    <h3>${study.title}</h3>
                    <p>${study.description}</p>
                    <ul class="achievement-list">
                        ${study.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                    </ul>
                    <a href="#" class="read-more">Read Full Story</a>
                </div>
            `;
            caseStudiesGrid.appendChild(caseStudyCard);
        });
    }

    // Add animation to stats
    const statCards = document.querySelectorAll('.stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    statCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
}); 