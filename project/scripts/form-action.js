document.addEventListener("DOMContentLoaded", () => {
  const submissionData = document.getElementById("submissionData");
  
  // Parse URLSearchParams from the query string
  const urlParams = new URLSearchParams(window.location.search);
  
  // Extract form data
  const name = urlParams.get("name");
  const email = urlParams.get("email");
  const city = urlParams.get("city");
  const level = urlParams.get("level");
  const activities = urlParams.get("activities");
  
  // If no data present, show error
  if (!name || !email) {
    submissionData.innerHTML = `<p class="error-message">No submission data found. Please <a href="join.html">fill out the form</a> again.</p>`;
    return;
  }
  
  // Display submitted data using template literals and DOM manipulation
  const dataHTML = `
    <div class="submission-fields">
      <div class="submission-field">
        <strong>Name:</strong><br>
        <span class="submission-value">${escapeHtml(name)}</span>
      </div>
      <div class="submission-field">
        <strong>Email:</strong><br>
        <span class="submission-value">${escapeHtml(email)}</span>
      </div>
      <div class="submission-field">
        <strong>City:</strong><br>
        <span class="submission-value">${escapeHtml(city)}</span>
      </div>
      <div class="submission-field">
        <strong>Membership Level:</strong><br>
        <span class="submission-value membership-level">${escapeHtml(level)}</span>
      </div>
      <div class="submission-field">
        <strong>Preferred Activities:</strong><br>
        <span class="submission-value">${activities && activities.length > 0 ? escapeHtml(activities) : "None selected"}</span>
      </div>
    </div>
  `;
  
  submissionData.innerHTML = dataHTML;
  
  // Log data to console for debugging
  console.log("Form Submission Data:", {
    name,
    email,
    city,
    level,
    activities
  });
});

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
