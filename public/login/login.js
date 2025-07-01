async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const data = { username, password }; // ✅ Make sure this line exists

  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const result = await res.json(); // ✅ Parse response body
    localStorage.setItem('loggedInUser', result.username); // ✅ Save correct username
    localStorage.removeItem('signedUpUser');
    alert('Login successful!');
    window.location.href = '/dashboard/dashboard2.html'; 
  } else {
    const error = await res.text();
    alert('Login failed: ' + error);
  }
}

