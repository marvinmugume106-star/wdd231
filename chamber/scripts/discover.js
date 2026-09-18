// discover.js — lazy load images, track last visit, and fetch members.json
document.addEventListener('DOMContentLoaded', () => {
  // Lazy-load images using IntersectionObserver with fallback to loading="lazy"
  const lazyImages = document.querySelectorAll('img.lazy');
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src;
          if (src) img.src = src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '100px 0px' });

    lazyImages.forEach(img => imgObserver.observe(img));
  } else {
    // fallback: ensure lazy attr is present
    lazyImages.forEach(img => img.setAttribute('loading', 'lazy'));
  }

  // Track last visit
  const lastVisitEl = document.getElementById('last-visit');
  const key = 'discoverLastVisit';
  const now = Date.now();
  const prev = localStorage.getItem(key);
  if (prev) {
    const days = Math.floor((now - Number(prev)) / (1000 * 60 * 60 * 24));
    lastVisitEl.textContent = days === 0 ? 'Today' : `${days} day(s) ago`;
  } else {
    lastVisitEl.textContent = 'First time here';
  }
  localStorage.setItem(key, String(now));

  // Fetch members and render grid
  const membersGrid = document.getElementById('members-grid');
  async function loadMembers() {
    try {
      const res = await fetch('data/members.json');
      if (!res.ok) throw new Error('Members not found');
      const members = await res.json();
      renderMembers(members);
    } catch (err) {
      console.error(err);
      membersGrid.innerHTML = '<p class="loading">Unable to load members.</p>';
    }
  }

  function renderMembers(members) {
    if (!Array.isArray(members) || members.length === 0) {
      membersGrid.innerHTML = '<p class="loading">No members found.</p>';
      return;
    }

    const html = members.map(m => `
      <article class="member-card">
        <img class="member-logo lazy" data-src="${m.image}" src="images/logo.jpg" alt="${m.name} logo" loading="lazy">
        <div class="member-info">
          <h3>${m.name}</h3>
          <p class="membership">${m.membership}</p>
          <p class="member-contact">${m.phone}</p>
          <a href="${m.website}" target="_blank" rel="noopener" class="member-link">Visit</a>
        </div>
      </article>
    `).join('');

    membersGrid.innerHTML = html;

    // Observe newly inserted lazy images
    const newLazy = document.querySelectorAll('img.lazy');
    if ('IntersectionObserver' in window && newLazy.length) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '100px 0px' });
      newLazy.forEach(i => obs.observe(i));
    }
  }

  loadMembers();
});
