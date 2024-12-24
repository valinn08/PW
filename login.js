document.addEventListener('DOMContentLoaded', () => {
  const API_URL = "http://localhost:3000"; // Backend server URL

  // Select forms and inputs
  const signUpForm = document.querySelector('.sign-up form');
  const signInForm = document.querySelector('.sign-in form');
  const nameInput = signUpForm.querySelector('input[placeholder="Name"]');
  const emailInputSignUp = signUpForm.querySelector('input[placeholder="Email"]');
  const passwordInputSignUp = signUpForm.querySelector('input[placeholder="Password"]');
  const emailInputSignIn = signInForm.querySelector('input[placeholder="Email"]');
  const passwordInputSignIn = signInForm.querySelector('input[placeholder="Password"]');

  const registerBtn = document.getElementById('register');
  const container = document.getElementById('container');
  const loginBtn = document.getElementById('login');

  // Toggle between Sign In and Sign Up forms
  registerBtn.addEventListener('click', () => {
    container.classList.add("active");
  });
  loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
  });

  // Sign Up Logic
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const name = nameInput.value.trim();
    const email = emailInputSignUp.value.trim();
    const password = passwordInputSignUp.value.trim();

    if (!name || !email || !password) {
      alert('Please fill in all the fields.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, isSignup: true }), // Pass isSignup flag
      });

      const result = await response.json();
      if (response.ok) {
        alert('Sign Up successful! Redirecting to homepage...');
        window.location.href = 'home.html'; // Redirect to homepage
      } else {
        alert(`Sign Up failed: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during Sign Up:', error);
      alert('An error occurred. Please try again later.');
    }
  });

  // Sign In Logic
  signInForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = emailInputSignIn.value.trim();
    const password = passwordInputSignIn.value.trim();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, isSignup: false }), // Pass isSignup flag
      });

      const result = await response.json();
      if (response.ok) {
        const { isAdmin, name } = result;

        if (isAdmin) {
          alert('Welcome, Admin! Redirecting to Admin Dashboard...');
          window.location.href = './admin/index.html'; // Redirect to admin dashboard
        } else {
          alert(`Welcome back, ${name}! Redirecting to homepage...`);
          window.location.href = 'home.html'; // Redirect to homepage
        }
      } else {
        alert(`Sign In failed: ${result.error || 'Invalid email or password'}`);
      }
    } catch (error) {
      console.error('Error during Sign In:', error);
      alert('An error occurred. Please try again later.');
    }
  });
});
