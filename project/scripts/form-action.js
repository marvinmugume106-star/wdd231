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
    submissionData.innerHTML = `<p style="color: #d32f2f;">No submission data found. Please <a href="join.html">fill out the form</a> again.</p>`;
    return;
  }
  
  // Display submitted data using template literals and DOM manipulation
  const dataHTML = `
    <div style="display: grid; gap: 1rem;">
      <div>
        <strong>Name:</strong><br>
        <span style="color: var(--navy); font-size: 1.1rem;">${escapeHtml(name)}</span>
      </div>
      <div>
        <strong>Email:</strong><br>
        <span style="color: var(--navy); font-size: 1.1rem;">${escapeHtml(email)}</span>
      </div>
      <div>
        <strong>City:</strong><br>
        <span style="color: var(--navy); font-size: 1.1rem;">${escapeHtml(city)}</span>
      </div>
      <div>
        <strong>Membership Level:</strong><br>
        <span style="color: var(--navy); font-size: 1.1rem; text-transform: capitalize;">${escapeHtml(level)}</span>
      </div>
      <div>
        <strong>Preferred Activities:</strong><br>
        <span style="color: var(--navy); font-size: 1.1rem;">${activities && activities.length > 0 ? escapeHtml(activities) : "None selected"}</span>
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
