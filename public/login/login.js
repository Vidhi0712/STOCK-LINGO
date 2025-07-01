async function handleLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  const res = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    const { username } = data; // we know what they typed
    localStorage.setItem('loggedInUser', username);  // ✅ save it
    alert('Login successful!');
    window.location.href = '/dashboard/dashboard2.html'; // Or wherever you want to go
  } else {
    const error = await res.text();
    alert('Login failed: ' + error);
  }
}
