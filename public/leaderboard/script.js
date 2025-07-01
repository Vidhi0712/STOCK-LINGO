// Toggle dropdown on avatar click
const profileIcon = document.getElementById('profile-icon');
const profileMenu = document.getElementById('profile-menu');

profileIcon.addEventListener('click', () => {
  profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', (e) => {
  if (!profileIcon.contains(e.target)) {
    profileMenu.style.display = 'none';
  }
});
