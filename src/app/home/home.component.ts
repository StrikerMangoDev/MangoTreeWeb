import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  currentHeroSlide = 0;
  currentStorySlide = 0;
  slideInterval: any;
  heroSlideInterval: any;
  private scriptLoaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScript();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSliders();
      this.initializeDropdowns();
      this.initializeHamburgerMenu();
      this.initializeScrollToTop();
      this.initializeScrollBehavior();
    }
  }

  private initializeScrollBehavior() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show header when:
      // 1. Scrolling up
      // 2. At the top of the page
      if (currentScroll < lastScrollTop || currentScroll <= 0) {
        header.classList.remove('header-hidden');
      } 
      // Hide header when:
      // 1. Scrolling down
      // 2. Not at the top
      // 3. Scrolled past 100px
      else if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add('header-hidden');
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
  }

  private initializeSliders() {
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-section .hero-slide');
    if (heroSlides.length > 1) {
      this.showHeroSlide(0);
      this.heroSlideInterval = setInterval(() => this.nextHeroSlide(), 4000);
    }

    // Story Slider
    const storySlides = document.querySelectorAll('.story-slide');
    const nextButton = document.querySelector('.next-story');
    const prevButton = document.querySelector('.prev-story');

    if (storySlides.length > 0 && nextButton && prevButton) {
      this.showStorySlide(0);
      this.startStorySlideInterval();

      nextButton.addEventListener('click', () => {
        this.nextStorySlide();
        this.resetStorySlideInterval();
      });

      prevButton.addEventListener('click', () => {
        this.prevStorySlide();
        this.resetStorySlideInterval();
      });

      const sliderContainer = document.querySelector('.stories-slider-container');
      if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => this.clearStorySlideInterval());
        sliderContainer.addEventListener('mouseleave', () => this.startStorySlideInterval());
      }
    }
  }

  private showHeroSlide(index: number) {
    const heroSlides = document.querySelectorAll('.hero-section .hero-slide');
    heroSlides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
    this.currentHeroSlide = index;
  }

  private nextHeroSlide() {
    const heroSlides = document.querySelectorAll('.hero-section .hero-slide');
    const newSlide = (this.currentHeroSlide + 1) % heroSlides.length;
    this.showHeroSlide(newSlide);
  }

  private showStorySlide(index: number) {
    const slides = document.querySelectorAll('.story-slide');
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
    this.currentStorySlide = index;
  }

  private nextStorySlide() {
    const slides = document.querySelectorAll('.story-slide');
    const newSlide = (this.currentStorySlide + 1) % slides.length;
    this.showStorySlide(newSlide);
  }

  private prevStorySlide() {
    const slides = document.querySelectorAll('.story-slide');
    const newSlide = (this.currentStorySlide - 1 + slides.length) % slides.length;
    this.showStorySlide(newSlide);
  }

  private startStorySlideInterval() {
    this.slideInterval = setInterval(() => this.nextStorySlide(), 5000);
  }

  private clearStorySlideInterval() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private resetStorySlideInterval() {
    this.clearStorySlideInterval();
    this.startStorySlideInterval();
  }

  private initializeDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parentLi = (toggle as HTMLElement).parentElement;
        const dropdown = toggle.nextElementSibling;
        
        if (!parentLi || !dropdown) return;

        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(item => {
          if (item !== parentLi) {
            item.classList.remove('active');
            const itemDropdown = item.querySelector('.offcanvas-dropdown');
            if (itemDropdown) {
              itemDropdown.classList.remove('active');
            }
          }
        });
        
        // Toggle current dropdown
        parentLi.classList.toggle('active');
        dropdown.classList.toggle('active');
      });
    });
  }

  private initializeHamburgerMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu-toggle');
    const offcanvasMenu = document.querySelector('.offcanvas-menu');
    const offcanvasOverlay = document.querySelector('.offcanvas-overlay');
    const closeBtn = document.querySelector('.offcanvas-close-btn');
    const body = document.body;

    if (!hamburgerMenu || !offcanvasMenu || !offcanvasOverlay || !closeBtn) {
        console.error('One or more menu elements not found');
        return;
    }

    const toggleMenu = (e?: Event) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        hamburgerMenu.classList.toggle('active');
        offcanvasMenu.classList.toggle('active');
        offcanvasOverlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    };

    const closeMenu = () => {
        hamburgerMenu.classList.remove('active');
        offcanvasMenu.classList.remove('active');
        offcanvasOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
    };

    // Remove any existing event listeners first
    const newHamburger = hamburgerMenu.cloneNode(true);
    hamburgerMenu.parentNode?.replaceChild(newHamburger, hamburgerMenu);
    
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode?.replaceChild(newCloseBtn, closeBtn);
    
    const newOverlay = offcanvasOverlay.cloneNode(true);
    offcanvasOverlay.parentNode?.replaceChild(newOverlay, offcanvasOverlay);

    // Add event listeners to new elements
    newHamburger.addEventListener('click', toggleMenu);
    newCloseBtn.addEventListener('click', closeMenu);
    newOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const target = e.target as Node;
        if (offcanvasMenu.classList.contains('active') &&
            !offcanvasMenu.contains(target) &&
            !newHamburger.contains(target)) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && offcanvasMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Initialize dropdown toggles in the menu
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = (toggle as HTMLElement).closest('.dropdown');
            const dropdown = toggle.nextElementSibling;
            
            if (!parent || !dropdown) return;

            // Close other dropdowns
            dropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    const otherParent = otherToggle.closest('.dropdown');
                    if (otherParent) {
                        otherParent.classList.remove('active');
                    }
                }
            });
            
            // Toggle current dropdown
            parent.classList.toggle('active');
            dropdown.classList.toggle('active');
        });
    });
  }

  private initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (!scrollToTopBtn) return;

    window.onscroll = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    };

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  private loadScript() {
    if (this.scriptLoaded) return;
    
    const script = document.createElement('script');
    script.src = 'assets/js/home_script.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      this.scriptLoaded = true;
      // Dispatch a custom event to trigger the orbit animation
      document.dispatchEvent(new Event('DOMContentLoaded'));
    };
    
    document.body.appendChild(script);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.slideInterval) {
        clearInterval(this.slideInterval);
      }
      if (this.heroSlideInterval) {
        clearInterval(this.heroSlideInterval);
      }
      // Remove the script when component is destroyed
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('home_script.js')) {
          scripts[i].remove();
          break;
        }
      }
      this.scriptLoaded = false;
    }
  }
}
