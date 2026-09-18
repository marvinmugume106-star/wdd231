import { validateEmail, validateName, saveUserPreference, getUserPreference } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("joinForm");
  const thankYouDiv = document.getElementById("thankYou");
  const citySelect = form.querySelector("select[name='city']");

  // Restore city preference from localStorage on page load
  const savedCity = getUserPreference("userCity");
  if (savedCity && citySelect) {
    citySelect.value = savedCity;
  }

  // Save city selection to localStorage when user changes it
  if (citySelect) {
    citySelect.addEventListener("change", (e) => {
      saveUserPreference("userCity", e.target.value);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("input[name='name']").value.trim();
      const email = form.querySelector("input[name='email']").value.trim();
      const city = form.querySelector("select[name='city']").value;
      const level = form.querySelector("input[name='level']:checked").value;

      if (name && email && city) {
        // Save city to localStorage when form is submitted
        saveUserPreference("userCity", city);
        
        // Collect form data
        const formData = new URLSearchParams();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("city", city);
        formData.append("level", level);

        // Get selected activities
        const activities = Array.from(
          form.querySelectorAll("input[name='activities']:checked")
        ).map((checkbox) => checkbox.value);
        formData.append("activities", activities.join(", ") || "None");

        // Redirect to form-action.html with query parameters
        const queryString = formData.toString();
        window.location.href = `form-action.html?${queryString}`;
      }
    });
  }
});
