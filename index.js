 // Auth Handling
 document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('signup-modal').classList.add('hide');
    document.getElementById('login-modal').classList.remove('hide');
  });
  
  // Signup Handler
  document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const userData = {
      name: document.getElementById('fullname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
  
    if (document.getElementById('password').value !== document.getElementById('confirm-password').value) {
      alert('Passwords do not match!');
      return;
    }
  
    localStorage.setItem('user', JSON.stringify(userData));
    alert('Registration successful! Please login.');

    // Check if User exists

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const enteredEmail = document.getElementById('login-email').value;

    if (storedUser.email === enteredEmail) {
        alert('User Already Exists! Please Log In');         
      }

  });
  
  // Login Handler
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const enteredEmail = document.getElementById('login-email').value;
    const enteredPassword = document.getElementById('login-password').value;
  
    if (storedUser && storedUser.email === enteredEmail && storedUser.password === enteredPassword) {
      alert('Login successful!');
      window.location.href = "budgetapp.html"
            
    } else {
      alert('Invalid credentials!');
    }
  });

//   Login Modal

  function view() {
    const form = document.getElementById("login-modal")
    form.style.display = "block"
}