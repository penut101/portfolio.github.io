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





// === Back Button Web Component with Hover Effect ===
class BackButton extends HTMLElement {
  static get observedAttributes() {
    return ["href", "label", "position"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._href = this.getAttribute("href") || "index.html";
    this._label = this.getAttribute("label") || "Back";
    this._position = this.getAttribute("position") || "top-left";
  }

  attributeChangedCallback(name, _, newVal) {
    if (name === "href") this._href = newVal || "index.html";
    if (name === "label") this._label = newVal || "Back";
    if (name === "position") this._position = newVal || "top-left";
    this._render();
  }

  connectedCallback() {
    this._render();
    this._bindKeyboard();
  }

  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKeyDown);
  }

  _bindKeyboard() {
    this._onKeyDown = (e) => {
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        this._goBack();
      }
    };
    window.addEventListener("keydown", this._onKeyDown);
  }

  _goBack() {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = this._href;
    }
  }

  _render() {
    if (!this.shadowRoot) return;

    const styles = `
      :host {
        position: fixed;
        z-index: 9999;
        top: ${this._position.includes("top") ? "14px" : "auto"};
        bottom: ${this._position.includes("bottom") ? "14px" : "auto"};
        left: ${this._position.includes("left") ? "14px" : "auto"};
        right: ${this._position.includes("right") ? "14px" : "auto"};
      }
      .btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 12px 18px;
        border-radius: 999px;
        background: transparent;
        border: 2px solid #00aaff;
        color: #00aaff;
        font-weight: 700;
        font-family: inherit;
        cursor: pointer;
        overflow: hidden;
        transition: color .3s ease, border-color .3s ease;
      }
      .btn:hover {
        color: #fff;
        border-color: #66d0ff;
      }
      .btn::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 100%;
        background: #00aaff;
        z-index: -1;
        transition: top .5s ease;
      }
      .btn:hover::before {
        top: 0;
      }
      .icon {
        width: 18px;
        height: 18px;
        display: inline-block;
      }
      .label {
        white-space: nowrap;
        font-size: 14px;
      }
      @media (max-width: 420px) {
        .label { display: none; }
        .btn { padding: 12px; }
      }
    `;

    const markup = `
      <button class="btn" aria-label="${this._label}">
        <span class="icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="label">${this._label}</span>
      </button>
    `;

    this.shadowRoot.innerHTML = `<style>${styles}</style>${markup}`;

    const btn = this.shadowRoot.querySelector(".btn");
    btn.onclick = () => this._goBack();
  }
}
customElements.define("back-button", BackButton);
