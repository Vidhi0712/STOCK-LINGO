// Generate stars
function generateStars() {
  const starField = document.getElementById("starField");
  const numStars = 150;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = Math.random() * 2 + 1 + "px";
    star.style.height = star.style.width;
    star.style.opacity = Math.random() * 0.8 + 0.2;
    star.style.animationDelay = Math.random() * 2 + "s";
    starField.appendChild(star);
  }
}
document.addEventListener("DOMContentLoaded", generateStars);

// Example for your signup.js
async function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = {
    username: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Sign up successful!');
      window.location.href = '/login/index.html';  // REDIRECT TO LOGIN PAGE
    } else {
      const errorText = await response.text();
      alert('Something went wrong: ' + errorText);
    }
  } catch (error) {
    console.error(error);
    alert('Request failed!');
  }
}


