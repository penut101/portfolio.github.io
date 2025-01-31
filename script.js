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
