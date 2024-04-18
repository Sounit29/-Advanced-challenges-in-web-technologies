const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box");

      toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close");
      });

      searchBtn.addEventListener("click", () =>{
        sidebar.classList.remove("close");
      });

      function clearCheckboxes(){
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(function(checkbox){
            checkbox.checked = false;
        });
      }

document.addEventListener("DOMContentLoaded", function () {
  var clearButton = document.querySelector(".clear");
  var generateButton = document.querySelector(".generate");
  var homeLink = document.getElementById("home-link");

  clearButton.addEventListener("click", clearCheckboxes);

  generateButton.addEventListener("click", function () {
    var selectedIngredients = getSelectedIngredients();
    if (selectedIngredients.length > 0) {
      window.location.href = "recipes.html?ingredients=" + selectedIngredients.join(',');
    } else {
      alert("Please select at least one ingredient.");
    }
  });

  // Check if on index.html page before adding event listener to home link
  if (window.location.pathname.includes("/index.html")) {
    homeLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = "index.html";
    });
  }
  const viewDetailsButtons = document.querySelectorAll('.view-details-btn');

  viewDetailsButtons.forEach(button => {
      button.addEventListener('click', function() {
          const recipeId = button.closest('.recipe-box').dataset.recipeId;
          window.location.href = `details.html?recipeId=${recipeId}`;
      });
  });
});

function getSelectedIngredients() {
  var selectedIngredients = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        
  checkboxes.forEach(function(checkbox) {
    selectedIngredients.push(checkbox.nextElementSibling.textContent);
  });
        
  return selectedIngredients;
}
