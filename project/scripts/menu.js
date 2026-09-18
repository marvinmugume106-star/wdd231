// Export menu utilities as ES Module
export const initMenu = () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = navMenu?.querySelectorAll("a");

  if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active", !isExpanded);
    });

    // Close menu when a link is clicked
    navLinks?.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      });
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hamburger.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("active");
      }
    });
  }
};

// Initialize menu on load
document.addEventListener("DOMContentLoaded", initMenu);
