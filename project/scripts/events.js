// Import validation utilities as ES Modules
import { validateEmail, formatDate } from "./utils.js";

// Modal Dialog Setup for RSVP confirmation
const createModal = () => {
  const modalHTML = `
    <div id="rsvpModal" class="rsvp-overlay" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
      <div class="rsvp-dialog">
        <h2 id="modalTitle">RSVP Confirmation</h2>
        <p id="modalMessage"></p>
        <div class="rsvp-actions">
          <button id="confirmBtn" class="btn">Confirm RSVP</button>
          <button id="closeModalBtn" class="btn secondary">Cancel</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
};

// Fetch events with async/await and try/catch
async function loadEvents() {
  const container = document.getElementById("events-container");
  
  if (!container) return;

  try {
    const response = await fetch("data/events.json");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const events = await response.json();

    // Display events using DOM creation so images can be rotated
    const imageRotations = {
      1: ["images/event1-img1.jpeg","images/event1-img2.jpeg","images/event1-img3.jpeg"],
      2: ["images/event2-img1.jpeg","images/event2-img2.jpeg","images/event2-img3.jpeg"],
      3: ["images/event3-img1.jpeg","images/event3-img2.jpeg","images/event3-img3.jpeg"],
      4: ["images/event4-img1.jpeg","images/event4-img2.jpeg","images/event4-img3.jpeg"],
      5: ["images/event5-img1.jpeg","images/event5-img2.jpeg","images/event5-img3.jpeg"],
      6: ["images/event6-img1.jpeg","images/event6-img2.jpeg","images/event6-img3.jpeg"]
    };

    events.forEach((event) => {
      const dateObj = new Date(event.date);
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

      const article = document.createElement("article");
      article.className = "card";
      article.tabIndex = 0;
      article.setAttribute("role", "article");
      article.setAttribute("aria-label", event.title);

      // Image element - use rotation set if available, otherwise single image
      const img = document.createElement("img");
      const imageSet = imageRotations[event.id] || [event.image];
      let currentIndex = 0;
      img.src = imageSet[currentIndex];
      img.alt = event.title;
      img.className = "event-image";
      img.onerror = function() { this.classList.add("is-hidden"); };

      // Content
      const h3 = document.createElement("h3"); h3.textContent = event.title;
      const typeP = document.createElement("p"); typeP.innerHTML = `<strong>Type:</strong> ${event.type || "Event"}`;
      const whenP = document.createElement("p"); whenP.textContent = `${dayName}, ${event.time} ${event.timezone} • ${event.location}`;
      const descP = document.createElement("p"); descP.textContent = event.description;
      const capP = document.createElement("p"); capP.innerHTML = `<small>Capacity: ${event.capacity} people</small>`;

      // Form
      const form = document.createElement("form");
      form.className = "form";
      form.setAttribute("aria-label", `RSVP for ${event.title}`);

      const nameInput = document.createElement("input"); nameInput.className = "input"; nameInput.type = "text"; nameInput.name = "name"; nameInput.placeholder = "Your name"; nameInput.setAttribute("aria-label","Your name"); nameInput.required = true;
      const emailInput = document.createElement("input"); emailInput.className = "input"; emailInput.type = "email"; emailInput.name = "email"; emailInput.placeholder = "Email address"; emailInput.setAttribute("aria-label","Email"); emailInput.required = true;
      const phoneInput = document.createElement("input"); phoneInput.className = "input"; phoneInput.type = "tel"; phoneInput.name = "phone"; phoneInput.placeholder = "Phone (for updates)"; phoneInput.setAttribute("aria-label","Phone"); phoneInput.required = true;
      const button = document.createElement("button"); button.className = "btn secondary"; button.type = "button"; button.textContent = "RSVP"; button.setAttribute("data-event-id", event.id); button.setAttribute("data-event-title", event.title);

      form.appendChild(nameInput);
      form.appendChild(emailInput);
      form.appendChild(phoneInput);
      form.appendChild(button);

      // Assembly
      article.appendChild(img);
      article.appendChild(h3);
      article.appendChild(typeP);
      article.appendChild(whenP);
      article.appendChild(descP);
      article.appendChild(capP);
      article.appendChild(form);

      container.appendChild(article);

      // Rotate images every 10 seconds when set has more than 1 image
      if (imageSet.length > 1) {
        setInterval(() => {
          currentIndex = (currentIndex + 1) % imageSet.length;
          img.classList.add("is-fading");
          setTimeout(() => {
            img.src = imageSet[currentIndex];
            img.classList.remove("is-fading");
          }, 250);
        }, 10000);
      }
    });

    // Attach RSVP listeners using event delegation
    container.addEventListener("click", handleRSVPClick);

  } catch (error) {
    console.error("Error loading events:", error);
    container.innerHTML = `<p class="error-message">Error loading events. Please try again later.</p>`;
  }
}

// Handle RSVP button clicks with modal
function handleRSVPClick(e) {
  if (e.target.tagName === "BUTTON" && e.target.classList.contains("secondary")) {
    e.preventDefault();
    
    const form = e.target.closest(".form");
    const eventId = e.target.getAttribute("data-event-id");
    const eventTitle = e.target.getAttribute("data-event-title");
    
    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const phone = form.querySelector("input[name='phone']").value.trim();
    
    // Validate email using imported utility
    const isValidEmail = validateEmail(email);
    
    if (!name || !email || !phone) {
      alert("Please fill in all fields.");
      return;
    }
    
    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }
    
    // Show RSVP confirmation modal
    showRSVPModal(name, email, eventTitle, form, e.target);
  }
}

// Display RSVP modal with confirmation
function showRSVPModal(name, email, eventTitle, form, button) {
  const modal = document.getElementById("rsvpModal");
  const message = document.getElementById("modalMessage");
  const confirmBtn = document.getElementById("confirmBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  
  if (!modal) return;
  
  message.textContent = `Are you ready to RSVP for "${eventTitle}"? A confirmation will be sent to ${email}.`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  confirmBtn.focus();
  
  // Clear previous listeners
  confirmBtn.replaceWith(confirmBtn.cloneNode(true));
  closeBtn.replaceWith(closeBtn.cloneNode(true));
  
  const newConfirmBtn = document.getElementById("confirmBtn");
  const newCloseBtn = document.getElementById("closeModalBtn");
  
  newConfirmBtn.addEventListener("click", () => {
    form.innerHTML = `<p class="success-message">Thanks ${name}! You're confirmed for this event. Confirmation sent to ${email}.</p>`;
    closeRSVPModal();
  });
  
  newCloseBtn.addEventListener("click", closeRSVPModal);
  
  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeRSVPModal();
    }
  });
}

function closeRSVPModal() {
  const modal = document.getElementById("rsvpModal");
  if (modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  createModal();
  loadEvents();
});