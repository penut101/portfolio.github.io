// projects.js - Written by Aiden Nemeroff
// This script dynamically generates a list of projects based on selected filters.

// List of projects with their details
// Each project has a title, description, languages used, and a GitHub link.
const projects = [
  {
    title: "Qwerty Discord Bot",
    description:
      "A feature-packed bot for KTP with role management, birthday reminders, and fun commands.",
    languages: ["Python"],
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

// Get currently selected filters
function getSelectedFilters() {
  const checkboxes = document.querySelectorAll(".filter-checkbox:checked");
  return Array.from(checkboxes).map((cb) => cb.value);
}

// Get current search query
function getSearchTerm() {
  const searchInput = document.getElementById("search-bar");
  return searchInput ? searchInput.value.toLowerCase() : "";
}

// Render project cards based on filters and search
function renderProjects() {
  const filters = getSelectedFilters();
  const search = getSearchTerm();
  const container = document.getElementById("projects-container");
  container.innerHTML = "";

  projects
    .filter((p) => {
      const matchesFilters =
        filters.length === 0 || filters.every((f) => p.languages.includes(f));
      const matchesSearch =
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search);
      return matchesFilters && matchesSearch;
    })
    .forEach((p) => {
      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <p><strong>Languages:</strong> ${p.languages.join(", ")}</p>
        ${p.github ? `<a href="${p.github}" target="_blank">🌐 GitHub</a>` : ""}
      `;

      container.appendChild(card);
    });
}

// Bind checkbox and search input listeners
document
  .querySelectorAll(".filter-checkbox")
  .forEach((cb) => cb.addEventListener("change", renderProjects));

document.getElementById("search-bar").addEventListener("input", renderProjects);

// Initial render
renderProjects();
