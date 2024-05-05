

// Clear button
function clearCheckboxes(){
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox){
      checkbox.checked = false;
  });
}

// Get selected ingredients
function getSelectedIngredients() {
  var selectedIngredients = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function(checkbox) {
      selectedIngredients.push(checkbox.nextElementSibling.textContent);
  });
  return selectedIngredients;
}

function filterRecipes(ingredients) {
  if (Array.isArray(ingredients)) {
      const queryString = ingredients.join(',');
      window.location.href = `Recipe_page.html?ingredients=${queryString}`;
  } else {
      window.location.href = `Recipe_page.html?ingredients=${ingredients}`;
  }
}

// Button handler
document.addEventListener("DOMContentLoaded", function () {
  var clearButton = document.querySelector(".clear");
  var generateButton = document.querySelector(".generate");

  if (clearButton) {
    clearButton.addEventListener("click", clearCheckboxes);
  }

  generateButton.addEventListener("click", function () {
    var selectedIngredients = getSelectedIngredients();
    if (selectedIngredients.length > 0) {
        window.location.href = "Recipe_page.html?ingredients=" + selectedIngredients.join(',');
    } else {
        alert("Please select at least one ingredient.");
    }
  });
});

