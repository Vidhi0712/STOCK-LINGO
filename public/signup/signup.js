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

async function handleSubmit(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const data = { username, email, password };

  try {
    const response = await fetch('/signup', {  // Same origin → so `/signup` works
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { username } = data;  // we know what they submitted
      localStorage.setItem('signedUpUser', username);
      localStorage.removeItem('loggedInUser');  // 
      alert('User created!');

  // Redirect to dashboard1
  window.location.href = '/dashboard/dashboard1.html'; 
  } else {
      const text = await response.text();
      alert('Signup failed: ' + text);
    }
  } catch (err) {
    console.error(err);
    alert('Signup error!');
  }
}





