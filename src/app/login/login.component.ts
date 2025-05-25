import { Component, OnInit, PLATFORM_ID, Inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit() {
    // Component initialization if needed
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private showMessage(elementId: string, message: string, isError: boolean = false) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = message;
      element.classList.add('show');
      
      // Hide the other message if it's showing
      const otherElement = document.getElementById(isError ? 'loginSuccess' : 'loginError');
      if (otherElement) {
        otherElement.classList.remove('show');
      }

      // Auto-hide after 5 seconds
      setTimeout(() => {
        element.classList.remove('show');
      }, 5000);
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.isLoading = true;

    // Simulated login check
    if (this.username === 'user' && this.password === 'pass123') {
      const successMessage = document.getElementById('loginSuccess');
      if (successMessage) {
        successMessage.textContent = 'Login successful! Redirecting...';
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateX(0)';
      }

      // Redirect to home page after a short delay
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    } else {
      const errorMessage = document.getElementById('loginError');
      if (errorMessage) {
        errorMessage.textContent = 'Invalid username or password';
        errorMessage.style.opacity = '1';
        errorMessage.style.transform = 'translateX(0)';

        // Hide error message after 3 seconds
        setTimeout(() => {
          if (errorMessage) {
            errorMessage.style.opacity = '0';
            errorMessage.style.transform = 'translateX(100%)';
          }
        }, 3000);
      }
      this.isLoading = false;
    }
  }
}
