import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './services.component.html',
  styleUrls: ['../home/home.component.css', './services.component.css']
})
export class ServicesComponent implements OnInit, AfterViewInit {
  private lastScrollPosition = 0;
  private readonly SCROLL_THRESHOLD = 100;
  private scriptLoaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScript();
      this.loadStyles();
      this.initializeScrollToTop();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeScrollBehavior();
      this.initializeAnimations();
    }
  }

  private initializeScrollBehavior() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show header when:
      // 1. Scrolling up
      // 2. At the top of the page
      if (currentScroll < this.lastScrollPosition || currentScroll <= 0) {
        header.classList.remove('header-hidden');
      } 
      // Hide header when:
      // 1. Scrolling down
      // 2. Not at the top
      // 3. Scrolled past threshold
      else if (currentScroll > this.lastScrollPosition && currentScroll > this.SCROLL_THRESHOLD) {
        header.classList.add('header-hidden');
      }
      
      this.lastScrollPosition = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
  }

  private initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (!scrollToTopBtn) return;

    window.onscroll = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "flex";
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
    script.src = 'assets/js/services_script.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      this.scriptLoaded = true;
    };
    
    document.body.appendChild(script);
  }

  private loadStyles() {
    // Load Font Awesome if not already loaded
    if (!document.querySelector('link[href*="font-awesome"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
      document.head.appendChild(link);
    }

    // Add Google Fonts
    const googleFonts = document.createElement('link');
    googleFonts.rel = 'stylesheet';
    googleFonts.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap';
    document.head.appendChild(googleFonts);
  }

  private initializeAnimations() {
    // Initialize service card animations
    const cards = document.querySelectorAll('.service-detail-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    // Initialize process step animations
    const steps = document.querySelectorAll('.process-step');
    steps.forEach((step, index) => {
      (step as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Remove the script when component is destroyed
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('services_script.js')) {
          scripts[i].remove();
          break;
        }
      }
      this.scriptLoaded = false;
    }
  }
}
