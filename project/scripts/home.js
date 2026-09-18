document.addEventListener("DOMContentLoaded", () => {
  // Image rotation sets for preview cards
  const imageRotations = {
    4: ["images/event4-img1.jpeg", "images/event4-img2.jpeg", "images/event4-img3.jpeg"],
    3: ["images/event3-img1.jpeg", "images/event3-img2.jpeg", "images/event3-img3.jpeg"],
    5: ["images/event5-img1.jpeg", "images/event5-img2.jpeg", "images/event5-img3.jpeg"]
  };

  // Fetch events to map preview cards
  fetch("data/events.json")
    .then(response => response.json())
    .then(events => {
      const previewCards = document.querySelectorAll(".cards-3 .card");
      const eventIds = [4, 3, 5]; // Chelsea, Five-a-side, Women

      previewCards.forEach((card, index) => {
        const eventId = eventIds[index];
        const event = events.find(e => e.id === eventId);
        
        if (event) {
          const imageSet = imageRotations[eventId] || [];
          let currentImageIndex = 0;

          const img = document.createElement("img");
          img.alt = event.title;
          img.style.cssText = "width: 100%; height: 200px; object-fit: cover; border-radius: 6px; margin-bottom: 0.75rem; transition: opacity 0.5s ease; display: block;";
          
          if (imageSet.length > 0) {
            img.src = imageSet[currentImageIndex];
            // Insert image at the beginning of the card
            card.insertBefore(img, card.firstChild);

            // Rotate images every 10 seconds
            setInterval(() => {
              currentImageIndex = (currentImageIndex + 1) % imageSet.length;
              img.style.opacity = "0.5";
              setTimeout(() => {
                img.src = imageSet[currentImageIndex];
                img.style.opacity = "1";
              }, 250);
            }, 10000);
          }
        }
      });
    })
    .catch(error => console.error("Error loading events:", error));

  const cta = document.querySelector(".cta");
  const eventsSection = document.querySelector("section:nth-of-type(3)");

  if (cta && eventsSection) {
    cta.addEventListener("click", e => {
      e.preventDefault();
      eventsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach(link => {
    if (link.getAttribute("href") === window.location.pathname.split("/").pop()) {
      link.setAttribute("aria-current", "page");
    }
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.cursor = "pointer";
    
    card.addEventListener("click", () => {
      const link = card.querySelector("a");
      if (link) {
        link.click();
      }
    });
    
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  const announce = document.createElement("div");
  announce.className = "announce";
  announce.textContent = "Next match: Arsenal vs Chelsea — Sat 19:30 EAT!";
  document.body.insertBefore(announce, document.body.firstChild);
});