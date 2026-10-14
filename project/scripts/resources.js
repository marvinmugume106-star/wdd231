document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("resources-container");
  if (!container) {
    console.warn('resources.js: #resources-container not found. Resources will not render.');
    return;
  }

  fetch("data/resources.json")
    .then(response => response.json())
    .then(resources => {
      resources.forEach(resource => {
        const article = document.createElement("article");
        article.className = "card";
        
        const isExternal = resource.url.startsWith("http") || resource.url.startsWith("https");
        
        if (isExternal) {
          article.classList.add("is-clickable");
          article.tabIndex = 0;
        }
        
        const titleContent = isExternal
          ? `<a class="resource-link" href="${resource.url}" target="_blank" aria-label="Open ${resource.title}">${resource.title}</a>`
          : resource.title;
        
        article.innerHTML = `
          <h2>${resource.icon} ${titleContent}</h2>
          <p>${resource.description}</p>
        `;
        
        if (isExternal) {
          const link = article.querySelector("a");
          
          article.addEventListener("click", (event) => {
            if (event.target.closest("a")) return;
            link.click();
          });
          
          article.addEventListener("keypress", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              link.click();
            }
          });
        }
        
        container.appendChild(article);
      });
    })
    .catch(error => console.error("Error loading resources:", error));
});
