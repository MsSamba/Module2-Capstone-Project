// Login Auth
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const enteredEmail = document.getElementById('login-email').value;
    const enteredPassword = document.getElementById('login-password').value;
  
    // Find a user with matching email and password
    const matchedUser = users.find(user => user.email === enteredEmail && user.password === enteredPassword);
  
    if (matchedUser) {
      alert('Login successful!');
      window.location.href = "budgetapp.html";
    } else {
      alert('Invalid credentials!');
    }
  });