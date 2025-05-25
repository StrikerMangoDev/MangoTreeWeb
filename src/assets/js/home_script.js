// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Downscroll
        header.style.top = "-110px"; // Adjust this value to match header height
    } else {
        // Upscroll
        header.style.top = "0";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);

// Success Stories Slider
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.story-slide');
    const nextButton = document.querySelector('.next-story');
    const prevButton = document.querySelector('.prev-story');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        currentSlide = index;
    }

    function nextSlide() {
        let newSlide = (currentSlide + 1) % slides.length;
        showSlide(newSlide);
    }

    function prevSlide() {
        let newSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(newSlide);
    }

    if (slides.length > 0) {
        showSlide(0); // Show the first slide initially

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetSlideInterval();
            });

            prevButton.addEventListener('click', () => {
                prevSlide();
                resetSlideInterval();
            });
        }

        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }

        startSlideInterval();

        // Optional: Pause on hover
        const sliderContainer = document.querySelector('.stories-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', startSlideInterval);
        }
    } else {
        // console.log("No story slides found or next/prev buttons missing.");
        // Optionally hide nav buttons if no slides or only one slide
        if(slides.length <= 1 && nextButton && prevButton){
            nextButton.style.display = 'none';
            prevButton.style.display = 'none';
        }
    }
});

// Scroll to Top Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// Dropdown Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.parentElement;
            const dropdown = this.nextElementSibling;
            
            // Close other dropdowns
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== parentLi) {
                    item.classList.remove('active');
                    if (item.querySelector('.offcanvas-dropdown')) {
                        item.querySelector('.offcanvas-dropdown').classList.remove('active');
                    }
                }
            });
            
            // Toggle current dropdown
            parentLi.classList.toggle('active');
            dropdown.classList.toggle('active');
        });
    });
});

// Hamburger Menu and Offcanvas Functionality
const hamburgerMenu = document.querySelector('.hamburger-menu-toggle');
const offcanvasMenu = document.querySelector('.offcanvas-menu');
const offcanvasOverlay = document.querySelector('.offcanvas-overlay');
const closeBtn = document.querySelector('.offcanvas-close-btn');

function toggleMenu() {
    offcanvasMenu.classList.toggle('active');
    offcanvasOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

hamburgerMenu.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);
offcanvasOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (!offcanvasMenu.contains(e.target) && 
        !hamburgerMenu.contains(e.target) && 
        offcanvasMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Hero Section Slideshow
document.addEventListener('DOMContentLoaded', () => {
    const heroSlides = document.querySelectorAll('.hero-section .hero-slide');
    let currentHeroSlide = 0;

    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        currentHeroSlide = index;
    }

    function nextHeroSlide() {
        let newSlide = (currentHeroSlide + 1) % heroSlides.length;
        showHeroSlide(newSlide);
    }

    if (heroSlides.length > 1) {
        showHeroSlide(0); // Show the first slide initially
        setInterval(nextHeroSlide, 4000); // Change slide every 4 seconds
    }
});

// Recognized By Section - Orbiting Logos Animation
document.addEventListener('DOMContentLoaded', () => {
    const animationArea = document.querySelector('.recognition-animation-area');
    if (!animationArea) return;

    const centralLogo = animationArea.querySelector('.central-orbit-logo');
    const orbiters = animationArea.querySelectorAll('.orbiting-logo-container');

    if (!centralLogo || orbiters.length === 0) return;

    const radius = 150; // Increased radius for larger circle
    const speed = 0.002; // Slightly slower for smoother animation
    let angle = 0;

    function animateOrbit() {
        angle += speed;
        orbiters.forEach((orbiter, index) => {
            const orbitAngle = angle + (index * (2 * Math.PI / orbiters.length));
            const x = radius * Math.cos(orbitAngle);
            const y = radius * Math.sin(orbitAngle);
            orbiter.style.transform = `translate(${x}px, ${y}px)`;
        });
        requestAnimationFrame(animateOrbit);
    }

    animateOrbit();
});

// This file will contain your JavaScript code for the home component
document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code will be executed here
    console.log('Home script loaded successfully');
});

// Form Submission Handling
document.addEventListener('DOMContentLoaded', () => {
    const meetingForm = document.getElementById('meetingForm');
    const signupForm = document.getElementById('signupForm');
    
    if (meetingForm) {
        meetingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = document.getElementById('form-submission-message');
            message.textContent = 'Thank you! We will contact you shortly.';
            message.style.display = 'block';
            meetingForm.reset();
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = document.getElementById('signup-message');
            message.textContent = 'Account created successfully!';
            message.style.display = 'block';
            signupForm.reset();
        });
    }
}); 