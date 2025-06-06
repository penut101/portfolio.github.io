// projects.js - Written by Aiden Nemeroff
// This script dynamically generates a list of projects based on selected filters.

// === Project Data ===
// Array of project objects. Each object contains metadata: title, description, languages used, and GitHub URL.
const projects = [
  {
    title: "Qwerty Discord Bot",
    description:
      "A feature-packed bot for KTP with role management, birthday reminders, and fun commands.",
    languages: ["Python", "Discord API", "Google Sheets API"],
    github: "https://github.com/penut101/Qwerty",
  },
  {
    title: "Fraternity Website",
    description:
      "A modern site for communication and events, built for Sigma Alpha Mu.",
    languages: ["HTML", "CSS", "JavaScript", "Web"],
    github: "https://penut101.github.io/SamPitt.github.io/",
  },
  {
    title: "Anagram Solver",
    description:
      "Java-based recursive anagram unscrambler with trie optimization.",
    languages: ["Java"],
    github: "https://github.com/penut101/Anagram-Unscrambler",
  },
  {
    title: "Arcade Machine",
    description:
      "Custom-built retro arcade machine using Raspberry Pi and RetroPie.",
    languages: ["Python", "Hardware"],
    github: "",
  },
];

// === Helper Function: Get selected filters ===
// Finds all checkboxes with the class "filter-checkbox" that are checked, and returns their values.
function getSelectedFilters() {
  const checkboxes = document.querySelectorAll(".filter-checkbox:checked");
  return Array.from(checkboxes).map((cb) => cb.value);
}

// === Helper Function: Get search term ===
// Retrieves the current value of the search input field, converts it to lowercase for case-insensitive matching.
function getSearchTerm() {
  const searchInput = document.getElementById("search-bar");
  if (searchInput) {
    return searchInput.value.toLowerCase();
  }
  return "";
}

// === Main Function: Render projects ===
// Filters and renders project cards based on current checkbox selections and search term.
function renderProjects() {
  const filters = getSelectedFilters(); // Get currently selected filters [JavaScript, Python, etc.]
  const search = getSearchTerm();
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  projects
    .filter((p) => {
      // A project passes the filter if:
      // - no filters are selected (show all), OR
      // - every selected filter matches a language in the project
      const matchesFilters =
        filters.length === 0 || filters.every((f) => p.languages.includes(f));

      // A project passes the search if:
      // - the search term is found in the title or description
      const matchesSearch =
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search);

      // Return true if both filters and search match
      return matchesFilters && matchesSearch;
    })
    .forEach((p) => {
      // Create a card for each project that matches the filters and search
      const card = document.createElement("div");
      card.className = "project-card"; // CSS class for styling

      // Build HTML content for the project card
      card.innerHTML = ` 
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <p><strong>Languages:</strong> ${p.languages.join(", ")}</p>
        ${p.github ? `<a href="${p.github}" target="_blank">🌐 GitHub</a>` : ""}
      `;

      // Append the card to the container in the DOM
      container.appendChild(card);
    });
}
// === Event Listeners ===
// Whenever a checkbox changes, re-render the project list
document
  .querySelectorAll(".filter-checkbox")
  .forEach((cb) => cb.addEventListener("change", renderProjects));

// Whenever the user types in the search bar, re-render the project list
document.getElementById("search-bar").addEventListener("input", renderProjects);

// === Initial Load ===
// Automatically render the full project list when the page first loads
renderProjects();
