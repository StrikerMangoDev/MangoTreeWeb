import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  private scriptLoaded = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadScript();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMouseEffect();
    }
  }

  private loadScript() {
    if (this.scriptLoaded) return;
    
    const script = document.createElement('script');
    script.src = 'assets/js/contact_script.js';
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
        if (scripts[i].src.includes('contact_script.js')) {
          scripts[i].remove();
          break;
        }
      }
      this.scriptLoaded = false;
    }
  }

  private initializeMouseEffect(): void {
    const mouseFollowContainer = document.querySelector('.mouse-follow-container') as HTMLElement;
    const mouseFollowEffect = document.querySelector('.mouse-follow-effect') as HTMLElement;
    const sections = document.querySelectorAll('.section-hover-effect') as NodeListOf<HTMLElement>;

    if (!mouseFollowContainer || !mouseFollowEffect) return;

    let isMouseInContainer = false;
    let currentSection: HTMLElement | null = null;
    let rafId: number | null = null;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isMouseInContainer) return;
      
      const { clientX, clientY } = e;
      
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        mouseFollowEffect.style.left = `${clientX}px`;
        mouseFollowEffect.style.top = `${clientY}px`;

        if (currentSection) {
          const rect = currentSection.getBoundingClientRect();
          const x = ((clientX - rect.left) / rect.width) * 100;
          const y = ((clientY - rect.top) / rect.height) * 100;
          currentSection.style.setProperty('--mouse-x', `${x}%`);
          currentSection.style.setProperty('--mouse-y', `${y}%`);
        }
      });
    };

    mouseFollowContainer.addEventListener('mouseenter', () => {
      isMouseInContainer = true;
      mouseFollowEffect.classList.add('active');
    });

    mouseFollowContainer.addEventListener('mouseleave', () => {
      isMouseInContainer = false;
      mouseFollowEffect.classList.remove('active');
      if (currentSection) {
        currentSection.style.removeProperty('--mouse-x');
        currentSection.style.removeProperty('--mouse-y');
      }
    });

    sections.forEach(section => {
      section.addEventListener('mouseenter', () => {
        currentSection = section;
      });

      section.addEventListener('mouseleave', () => {
        if (currentSection === section) {
          currentSection = null;
        }
      });
    });

    document.addEventListener('mousemove', updateMousePosition);
  }
}
