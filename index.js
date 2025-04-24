// Signup Auth
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const userData = {
      name: document.getElementById('fullname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };
  
    if (userData.password !== document.getElementById('confirm-password').value) {
      alert('Passwords do not match!');
      return;
    }
  
    // Retrieve the existing users array or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if the email already exists
    const userExists = users.some(user => user.email === userData.email);
  
    if (userExists) {
      alert('User Already Exists!');
      return;
    }
  
    // Add the new user to the array and save it back to localStorage
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! Please login.');
  });


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
  
//   Login Modal

  function view() {
    const form = document.getElementById("login-modal")
    form.style.display = "block"
}