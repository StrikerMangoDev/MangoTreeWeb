import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <nav class="navbar">
        <div class="logo">
          <a routerLink="/home">
            <img src="assets/img/logo.png" alt="Company Logo">
          </a>
        </div>
        <ul class="desktop-nav-links">
          <li><a routerLink="/services" routerLinkActive="active">Services</a></li>
          <li><a routerLink="/industries" routerLinkActive="active">Industry We Serve</a></li>
          <li><a routerLink="/tech-stack" routerLinkActive="active">Tech Stack</a></li>
          <li><a routerLink="/social-proof" routerLinkActive="active">Social Proof</a></li>
        </ul>
        <div class="header-right-controls">
          <button class="contact-us-btn">Contact Us</button>
          <div class="hamburger-menu-toggle" id="hamburgerIcon">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  `,
  styleUrls: ['../../home/home.component.css']
})
export class HeaderComponent {
  constructor() {}
} 