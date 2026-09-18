# Quick Feature Reference Guide

## 🎯 All Required Features Implemented

### 1️⃣ RESPONSIVE MENU WITH HAMBURGER
**Location:** `styles/main.css` + `scripts/menu.js` + All HTML files
```javascript
// Hamburger appears on mobile (< 640px)
@media (max-width: 640px) {
  .hamburger { display: flex; }
}

// Desktop uses CSS Flex
.nav-menu { display: flex; }

// Active link highlighting
.nav a[aria-current="page"] { background: var(--navy); }
```

---

### 2️⃣ FORM ACTION PAGE
**Location:** `form-action.html` + `scripts/form-action.js`
```javascript
// Extracts data from URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get("name");  // Gets submitted form data

// Displays with template literals
<span>${escapeHtml(name)}</span>
```

**How it works:**
1. User fills Join form
2. Form submits to `form-action.html?name=...&email=...&city=...`
3. Page displays submitted data using URLSearchParams

---

### 3️⃣ DYNAMIC EVENTS DATA
**Location:** `data/events.json` (16 events) + `scripts/events.js`

**Event properties (11 fields):**
```json
{
  "id": 1,
  "title": "Arsenal vs Spurs — Screening (Kampala)",
  "date": "2025-12-20",
  "time": "19:30",
  "timezone": "EAT",
  "location": "Acacia View Lounge",
  "city": "Kampala",
  "type": "Screening",
  "description": "Watch the Gunners...",
  "capacity": 50,
  "venue_contact": "+256-701-234567",
  "image": "https://..."
}
```

**Array methods used:**
- `events.forEach()` - Loop through 16 events
- `Array.from(...).map()` - Convert checkboxes to array
- `activities.join(", ")` - Join array to string

---

### 4️⃣ LOCAL STORAGE
**Location:** `scripts/join.js` + `scripts/utils.js`

```javascript
// Save city preference when form loads
const savedCity = getUserPreference("userCity");
citySelect.value = savedCity;

// Save when user changes selection
citySelect.addEventListener("change", (e) => {
  saveUserPreference("userCity", e.target.value);
});

// Utils functions (exported as ES Module)
export const saveUserPreference = (key, value) => {
  localStorage.setItem(key, value);
};

export const getUserPreference = (key) => {
  return localStorage.getItem(key);
};
```

---

### 5️⃣ MODAL DIALOG
**Location:** `scripts/events.js`

```javascript
// Create modal with ARIA attributes
const modalHTML = `
  <div id="rsvpModal" 
       role="dialog" 
       aria-labelledby="modalTitle" 
       aria-hidden="true">
    <h2 id="modalTitle">RSVP Confirmation</h2>
    <p id="modalMessage"></p>
    <button id="confirmBtn">Confirm RSVP</button>
    <button id="closeModalBtn">Cancel</button>
  </div>
`;

// Show modal on RSVP click
showRSVPModal(name, email, eventTitle, form, button);

// Close on Escape or Cancel
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRSVPModal();
});
```

---

### 6️⃣ ASYNC/AWAIT & FETCH
**Location:** `scripts/events.js`

```javascript
// Async function with try/catch
async function loadEvents() {
  try {
    const response = await fetch("data/events.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const events = await response.json();
    
    // Process events...
    
  } catch (error) {
    console.error("Error loading events:", error);
  }
}
```

---

### 7️⃣ ES MODULES
**Location:** `scripts/menu.js` + `scripts/utils.js`

**menu.js - Exported functions:**
```javascript
// Export function for menu toggle
export const initMenu = () => {
  const hamburger = document.getElementById("hamburger");
  // Menu toggle logic...
};

// Import in events.html
<script type="module" src="scripts/menu.js"></script>
```

**utils.js - 9 exported utilities:**
```javascript
export const validateEmail = (email) => {...};
export const validatePhone = (phone) => {...};
export const validateName = (name) => {...};
export const formatDate = (dateString) => {...};
export const escapeHtml = (text) => {...};
export const validateFormData = (formData) => {...};
export const saveUserPreference = (key, value) => {...};
export const getUserPreference = (key) => {...};
export const debounce = (func, delay) => {...};
```

**Used in:**
- `events.js`: `import { validateEmail } from "./utils.js"`
- `join.js`: `import { saveUserPreference, getUserPreference } from "./utils.js"`

---

### 8️⃣ TEMPLATE LITERALS
**Used throughout:**
```javascript
// Events rendering
const eventHTML = `
  <article class="card" aria-label="${event.title}">
    <img src="${event.image}" alt="${event.title}" />
    <h3>${event.title}</h3>
    <p>${dayName}, ${event.time} ${event.timezone} • ${event.location}</p>
  </article>
`;

// Modal messages
message.textContent = `Are you ready to RSVP for "${eventTitle}"?`;

// URL construction
window.location.href = `form-action.html?${queryString}`;

// Form-action display
<span>${escapeHtml(name)}</span>
```

---

### 9️⃣ DOM MANIPULATION
**Techniques used:**
```javascript
// Insert dynamic HTML
container.insertAdjacentHTML("beforeend", eventHTML);

// Get elements
const modal = document.getElementById("rsvpModal");
const form = e.target.closest(".form");

// Modify attributes
hamburger.setAttribute("aria-expanded", true);
modal.setAttribute("aria-hidden", false);

// Event delegation
container.addEventListener("click", handleRSVPClick);

// Query within context
const inputs = form.querySelectorAll("input");

// Text content manipulation
message.textContent = `Welcome ${name}!`;
```

---

## 📊 File Structure Summary

| File | Purpose | Type |
|------|---------|------|
| `index.html` | Home page | HTML |
| `events.html` | Events listing | HTML |
| `join.html` | Join form | HTML |
| `form-action.html` | **NEW** - Form results | HTML |
| `resources.html` | Resources | HTML |
| `plan.html` | Project plan | HTML |
| `styles/main.css` | Styles + hamburger | CSS |
| `scripts/menu.js` | **NEW** - Menu module | JS Module |
| `scripts/utils.js` | **NEW** - Utilities | JS Module |
| `scripts/events.js` | Events + modal | JS (imports modules) |
| `scripts/join.js` | Form + localStorage | JS (imports modules) |
| `scripts/form-action.js` | **NEW** - URLSearchParams | JS |
| `scripts/home.js` | Home page logic | JS |
| `scripts/resources.js` | Resources logic | JS |
| `data/events.json` | Events data (16 items) | JSON |

---

## ✅ Testing Checklist

- [ ] Open site on mobile - hamburger menu appears
- [ ] Click hamburger - menu toggles open/closed
- [ ] Click menu link - menu closes and page navigates
- [ ] Fill Join form - city preference saves
- [ ] Reload Join page - city preference restores
- [ ] Submit Join form - redirects to form-action.html
- [ ] Check form-action page - shows all submitted data
- [ ] Open Events page - 16 events load from JSON
- [ ] Click RSVP button - modal appears with event title
- [ ] Close modal with Cancel button - modal closes
- [ ] Press Escape key - modal closes
- [ ] Open browser console - no errors (check imports working)

---

**All features complete and ready for submission! 🎉**
