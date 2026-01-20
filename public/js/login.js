// Login page functionality
document.addEventListener('DOMContentLoaded', () => {
  const googleBtn = document.getElementById('googleSignIn');

  googleBtn.addEventListener('click', () => {
    // TODO: Implement Google OAuth
    // For now, redirect to dashboard
    window.location.href = '/home.html';
  });
});
