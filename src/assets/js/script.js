document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.card-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-btn');
    const messageDiv = document.getElementById('message');
    const togglePassword = document.querySelector('.toggle-password');
    const rememberCheckbox = document.getElementById('remember');

    // Demo credentials (in a real app, this would be handled server-side)
    const validCredentials = [
        { username: 'user', password: 'pass123' },
        { username: 'admin', password: 'admin123' }
    ];

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });

    // Input animations
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        // Add placeholder for label animation
        input.setAttribute('placeholder', ' ');

        // Add focus effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (!input.value) {
                input.classList.remove('has-value');
            }
        });

        // Check initial value
        if (input.value) {
            input.classList.add('has-value');
        }
    });

    // Show message function
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        messageDiv.classList.add('show');
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 3000);
    }

    // Loading state
    function setLoadingState(loading) {
        if (loading) {
            loginButton.classList.add('loading');
            loginButton.disabled = true;
        } else {
            loginButton.classList.remove('loading');
            loginButton.disabled = false;
        }
    }

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Basic validation
        if (!username || !password) {
            showMessage('Please fill in all fields', 'error');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // For demo purposes, accept any login
            showMessage('Login successful!', 'success');
            
            // Save remember me preference
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }
            
            // Redirect after successful login (change URL as needed)
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1000);
            
        } catch (error) {
            showMessage('Login failed. Please try again.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = button.classList[1]; // google, github, or linkedin
            showMessage(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login coming soon!`, 'info');
        });
    });

    // Remember me functionality
    window.addEventListener('load', () => {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            usernameInput.value = rememberedUser;
            rememberCheckbox.checked = true;
            usernameInput.classList.add('has-value');
        }
    });

    // Background animation optimization
    const animatedBg = document.querySelector('.animated-background');
    if (animatedBg) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                animatedBg.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
            });
        });
    }

    // Prevent form submission on Enter key in input fields
    inputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                loginButton.click();
            }
        });
    });
}); 