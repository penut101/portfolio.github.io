// Script for the timeline functionality
// Ensure the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".timeline-button");
  const sections = document.querySelectorAll(".timeline-section");
  const movingRectangle = document.createElement("div");
  movingRectangle.classList.add("moving-rectangle");
  document.querySelector(".timeline-buttons").appendChild(movingRectangle);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");

      // Toggle sections
      sections.forEach((section) => {
        if (section.id === target) {
          section.classList.add("show");
        } else {
          section.classList.remove("show");
        }
      });

      // Toggle active button state
      buttons.forEach((btn) => {
        if (btn === button) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Move the rectangle
      const buttonRect = button.getBoundingClientRect();
      const containerRect = button.parentElement.getBoundingClientRect();
      movingRectangle.style.left = `${buttonRect.left - containerRect.left}px`;
      movingRectangle.style.width = `${buttonRect.width}px`;
    });
  });

  // Show the first section and set the first button as active by default
  sections[0].classList.add("show");
  buttons[0].classList.add("active");
  const firstButtonRect = buttons[0].getBoundingClientRect();
  const containerRect = buttons[0].parentElement.getBoundingClientRect();
  movingRectangle.style.left = `${firstButtonRect.left - containerRect.left}px`;
  movingRectangle.style.width = `${firstButtonRect.width}px`;
});

//Script for chatbot functionality
const toggleBtn = document.getElementById("chatbot-toggle");
const popup = document.getElementById("chatbot-popup");
const closeBtn = document.getElementById("chatbot-close");
const log = document.getElementById("chatbot-log");
const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");

toggleBtn.addEventListener("click", () => popup.classList.toggle("hidden"));
closeBtn.addEventListener("click", () => popup.classList.add("hidden"));
sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  log.innerHTML += `<div class="user"><strong>You:</strong> ${message}</div>`;
  input.value = "";
  log.scrollTop = log.scrollHeight;

  fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      const reply = data.response || "Oops, something went wrong.";
      log.innerHTML += `<div class="bot"><strong>Bot:</strong> ${reply}</div>`;
      log.scrollTop = log.scrollHeight;
    })
    .catch(() => {
      log.innerHTML += `<div class="bot"><strong>Bot:</strong> Error connecting to server.</div>`;
    });
}
