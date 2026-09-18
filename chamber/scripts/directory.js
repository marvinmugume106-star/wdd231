// Directory page: Fetch members and manage grid/list view toggle

let members = [];
let currentView = 'grid'; // 'grid' or 'list'

// Fetch members from JSON
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    members = await response.json();
    renderMembers();
  } catch (error) {
    console.error('Error fetching members:', error);
    document.getElementById('members-container').innerHTML = 
      '<p class="error">Failed to load members. Please try again later.</p>';
  }
}

// Render members based on current view
function renderMembers() {
  const container = document.getElementById('members-container');
  container.innerHTML = '';

  members.forEach(member => {
    const memberElement = createMemberElement(member);
    container.appendChild(memberElement);
  });

  // Apply current view class
  container.className = currentView === 'grid' ? 'members-grid' : 'members-list';
}

// Create a member card/row
function createMemberElement(member) {
  const article = document.createElement('article');
  article.className = `member-card membership-${member.membership.toLowerCase()}`;
  
  if (currentView === 'grid') {
    // Grid view: card with image, name, contact
    article.innerHTML = `
      <img src="${member.image}" alt="${member.name}" class="member-image" onerror="this.src='images/logo.jpg'">
      <div class="member-info">
        <h3>${member.name}</h3>
        <p class="membership-badge">${member.membership}</p>
        <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><a href="${member.website}" target="_blank" class="website-link">Visit Website →</a></p>
      </div>
    `;
  } else {
    // List view: table-like row
    article.innerHTML = `
      <div class="member-list-row">
        <img src="${member.image}" alt="${member.name}" class="member-image-small" onerror="this.src='images/logo.jpg'">
        <div class="member-list-info">
          <h4>${member.name}</h4>
          <p class="membership-badge">${member.membership}</p>
        </div>
        <div class="member-list-contact">
          <p><a href="tel:${member.phone}">${member.phone}</a></p>
          <p><a href="${member.website}" target="_blank">Website</a></p>
        </div>
        <p class="member-list-address">${member.address}</p>
      </div>
    `;
  }

  return article;
}

// Toggle between grid and list view
function setupViewToggle() {
  const gridBtn = document.getElementById('grid-view-btn');
  const listBtn = document.getElementById('list-view-btn');

  gridBtn.addEventListener('click', () => {
    currentView = 'grid';
    gridBtn.classList.add('active');
    listBtn.classList.remove('active');
    renderMembers();
  });

  listBtn.addEventListener('click', () => {
    currentView = 'list';
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    renderMembers();
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setupViewToggle();
  fetchMembers();
});
