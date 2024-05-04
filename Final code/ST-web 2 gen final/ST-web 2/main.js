
const surpriseButton = document.getElementById("surpriseButton");
const ingredientsText = document.getElementById("ingredientsText");
const stepsText = document.getElementById("stepsText");
const dishName = document.getElementById("dishName");

// Add event listener to the button if it exists
if (surpriseButton && ingredientsText) {
  surpriseButton.addEventListener("click", () => {
    fetchRandomRecipeFromJsFile();
  });
}


// Define the function using arrow function syntax
const fetchRandomRecipeFromJsFile = () => {
  // Replace the placeholder with the actual API key
  const apiKey = "your_api_key_here";
  const friendsApiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

  fetch(friendsApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((recipe) => {
      const recipeTitle = recipe.title || recipe.name;

      const smallElement = dishName.querySelector("small");
      if (smallElement) {
        smallElement.innerText = recipeTitle;
      }

      const ingredients = recipe.extendedIngredients || recipe.ingredients;
      let ingredientsString = "Ingredients:\n";
      if (ingredients) {
        ingredients.forEach((ingredient) => {
          ingredientsString += `${ingredient.original}\n`;
        });
      } else {
        ingredientsString = "No ingredients available.";
      }
      ingredientsText.innerText = ingredientsString;

      const imageUrl = recipe.image || recipe.imageUrl;
      const recipeImage = document.getElementById("dishImage").querySelector("img");
      recipeImage.src = imageUrl || "";

      const steps = recipe.analyzedInstructions[0]?.steps || recipe.steps;
      const stepsHtml = steps?.map((step) => `<li>${step.step}</li>`).join("") || "";
      stepsText.innerHTML = `<ol>${stepsHtml}</ol>`;
    })
    .catch((error) => {
      console.error("Error fetching random recipe:", error);
    });
};

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

