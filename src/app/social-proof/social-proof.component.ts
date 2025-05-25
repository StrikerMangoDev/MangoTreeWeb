import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './social-proof.component.html',
  styleUrls: [
    '../home/home.component.css',
    './social-proof.component.css'
  ]
})
export class SocialProofComponent implements OnInit, AfterViewInit {
  private scriptLoaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScript();
      this.initializeScrollToTop();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeScrollBehavior();
      this.initializeHamburgerMenu();
      this.initializeDropdowns();
    }
  }

  private initializeScrollBehavior() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll < lastScrollTop || currentScroll <= 0) {
        header.classList.remove('header-hidden');
      } else if (currentScroll > lastScrollTop && currentScroll > 100) {
        header.classList.add('header-hidden');
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, { passive: true });
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
    script.src = 'assets/js/social_proof_script.js';
    script.type = 'text/javascript';
    script.async = true;
    
    script.onload = () => {
      this.scriptLoaded = true;
    };
    
    document.body.appendChild(script);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('social_proof_script.js')) {
          scripts[i].remove();
          break;
        }
      }
      this.scriptLoaded = false;
    }
  }
}
