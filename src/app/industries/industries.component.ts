import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './industries.component.html',
  styleUrls: ['../home/home.component.css', './industries.component.css']
})
export class IndustriesComponent implements OnInit, AfterViewInit {
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
      this.initializeNumberCountAnimation();
    }
  }

  private initializeScrollBehavior() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll < this.lastScrollPosition || currentScroll <= 0) {
        header.classList.remove('header-hidden');
      } 
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

  private initializeNumberCountAnimation() {
    const numberElements = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          const element = entry.target as HTMLElement;
          const target = parseInt(element.getAttribute('data-target') || '0');
          element.classList.add('animated');
          
          // Add a small delay before starting the animation
          setTimeout(() => {
            this.animateNumber(element, target);
          }, 200);
          
          observer.unobserve(element);
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    numberElements.forEach(element => observer.observe(element));
  }

  private animateNumber(element: HTMLElement, target: number) {
    let startTime: number | null = null;
    const duration = 2500; // 2.5 seconds for smoother animation
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Improved easing function for smoother animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      const current = Math.floor(target * easedProgress);
      element.textContent = `${current}`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure we end up with the exact target number
        element.textContent = `${target}`;
      }
    };
    
    requestAnimationFrame(animate);
  }

  private loadScript() {
    if (this.scriptLoaded) return;
    
    const script = document.createElement('script');
    script.src = 'assets/js/industries_script.js';
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

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      // Remove the script when component is destroyed
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('industries_script.js')) {
          scripts[i].remove();
          break;
        }
      }
      this.scriptLoaded = false;
    }
  }
}
