// Like button functionality
const likeButtons = document.querySelectorAll(".like-btn");
likeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const title = btn.parentElement.querySelector("h2").textContent;
    alert(`You liked the recipe: ${title}`);
  });
});

// Toggle ingredients functionality
const toggleButtons = document.querySelectorAll(".toggle-ingredients-btn");
toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const ingredientsDiv = btn.nextElementSibling;
    if (ingredientsDiv.style.display === "block") {
      ingredientsDiv.style.display = "none";
      btn.textContent = "Show Ingredients";
    } else {
      ingredientsDiv.style.display = "block";
      btn.textContent = "Hide Ingredients";
    }
  });
});
