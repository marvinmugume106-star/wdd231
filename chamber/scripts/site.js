
document.addEventListener('DOMContentLoaded', () => {
  
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

 
  const lastModEl = document.getElementById('last-modified');
  if (lastModEl) lastModEl.textContent = document.lastModified;

  
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

 
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

 
  const currentDateEl = document.getElementById('current-date');
  if (currentDateEl) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);
    currentDateEl.textContent = today;
  }

  // If a hidden timestamp field exists (join page), fill it with ISO string
  const tsEl = document.getElementById('timestamp');
  if (tsEl && !tsEl.value) {
    tsEl.value = new Date().toISOString();
  }

  // If on thankyou page, populate output fields from query params
  const outFirst = document.getElementById('out-first');
  if (outFirst) {
    const params = new URLSearchParams(window.location.search);
    document.getElementById('out-first').textContent = params.get('first') || '';
    document.getElementById('out-last').textContent = params.get('last') || '';
    document.getElementById('out-email').textContent = params.get('email') || '';
    document.getElementById('out-mobile').textContent = params.get('mobile') || '';
    document.getElementById('out-business').textContent = params.get('business') || '';
    const ts = params.get('timestamp');
    document.getElementById('out-timestamp').textContent = ts ? new Date(ts).toString() : '';
  }
});
