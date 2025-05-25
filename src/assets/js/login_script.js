// Login form handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Add your login validation logic here
    validateLogin(email, password);
}

function validateLogin(email, password) {
    // Basic validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    if (!isValidEmail(email)) {
        showError('Please enter a valid email');
        return;
    }
    
    // Here you would typically make an API call to your backend
    // For now, we'll just simulate a successful login
    simulateLogin(email, password);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateLogin(email, password) {
    // Simulate API call delay
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        // Redirect to dashboard or home page after successful login
        window.location.href = '/dashboard';
    }, 1500);
}

function showError(message) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
}

function showLoading() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Logging in...';
    }
}

function hideLoading() {
    const submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    }
} 