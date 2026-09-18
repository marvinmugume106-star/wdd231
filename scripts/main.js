const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true, type: "WDD" },
  { code: "WDD 131", name: "JavaScript Basics", credits: 2, completed: true, type: "WDD" },
  { code: "WDD 231", name: "Frontend Development", credits: 3, completed: false, type: "WDD" },
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true, type: "CSE" },
  { code: "CSE 210", name: "Data Structures", credits: 3, completed: false, type: "CSE" }
];

const courseContainer = document.getElementById("courses");
const totalCredits = document.getElementById("totalCredits");
const filterAll = document.getElementById("filterAll");
const filterWDD = document.getElementById("filterWDD");
const filterCSE = document.getElementById("filterCSE");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.getElementById("primary-nav");

function getVisibleCourses() {
  const activeButton = document.querySelector(".filters button.active");
  const selectedFilter = activeButton ? activeButton.id.replace("filter", "") : "All";

  if (selectedFilter === "All") {
    return courses;
  }

  return courses.filter(course => course.type === selectedFilter);
}

function renderCourses() {
  const visibleCourses = getVisibleCourses();
  courseContainer.innerHTML = "";

  visibleCourses.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card" + (course.completed ? " completed" : "");
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
      <p>Status: ${course.completed ? "✅ Completed" : "❌ Not Completed"}</p>
    `;
    courseContainer.appendChild(card);
  });

  const total = visibleCourses.reduce((sum, course) => sum + course.credits, 0);
  totalCredits.textContent = `Total credits: ${total}`;
}

function setActive(button) {
  [filterAll, filterWDD, filterCSE].forEach(b => b.classList.remove("active"));
  button.classList.add("active");
  renderCourses();
}

filterAll.addEventListener("click", () => setActive(filterAll));
filterWDD.addEventListener("click", () => setActive(filterWDD));
filterCSE.addEventListener("click", () => setActive(filterCSE));

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Initial render
renderCourses();

// Footer dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;
