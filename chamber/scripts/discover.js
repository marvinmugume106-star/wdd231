document.addEventListener('DOMContentLoaded', () => {
  const lastVisitEl = document.getElementById('last-visit');

  try {
    const key = 'commerceCityLastVisit';
    const now = Date.now();
    const previous = Number(localStorage.getItem(key));

    if (previous) {
      const days = Math.floor((now - previous) / (1000 * 60 * 60 * 24));
      lastVisitEl.textContent = days === 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
      lastVisitEl.textContent = 'This is your first visit';
    }

    localStorage.setItem(key, String(now));
  } catch (error) {
    if (lastVisitEl) {
      lastVisitEl.textContent = 'Visit unavailable';
    }
  }

  const grid = document.getElementById('discovery-grid');

  async function loadDiscoveryCards() {
    try {
      const response = await fetch('data/discovery.json');
      if (!response.ok) throw new Error('Discovery data not found');
      const places = await response.json();

      if (!Array.isArray(places) || places.length === 0) {
        grid.innerHTML = '<p class="status-message">No locations available right now.</p>';
        return;
      }

      const cards = places.map((place, index) => `
        <article class="discovery-card card-${index + 1}">
          <img class="discovery-image" src="${place.image}" alt="${place.title}" loading="lazy">
          <div class="card-content">
            <h3>${place.title}</h3>
            <p class="card-address">${place.address}</p>
            <p class="card-description">${place.description}</p>
            <a href="${place.link}" target="_blank" rel="noopener noreferrer" class="learn-more-btn">Learn More</a>
          </div>
        </article>
      `).join('');

      grid.innerHTML = cards;
    } catch (error) {
      console.error(error);
      grid.innerHTML = '<p class="status-message">Unable to load local discovery cards.</p>';
    }
  }

  loadDiscoveryCards();
});
