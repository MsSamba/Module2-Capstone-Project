// Slide Logic

const slides = document.getElementById('slides');
  const totalSlides = slides.children.length;
  let index = 0;

  function showSlide(i) {
    slides.style.transform = `translateX(-${i * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % totalSlides;
    showSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
  }

  function goToSlide(i) {
    index = i;
    showSlide(index);
  }

  setInterval(nextSlide, 4000);

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
    window.location.href = "login.html";
  });



  
