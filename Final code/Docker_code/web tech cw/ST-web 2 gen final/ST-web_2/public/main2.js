document.addEventListener('DOMContentLoaded', function () {
    var surpriseButton = document.getElementById('SurpriseButton');
    if (surpriseButton) {
        surpriseButton.click(); // Simulate clicking the 'SurpriseButton'
    }
});


// References to DOM elements
const surpriseButton = document.getElementById("SurpriseButton");
const ingredientsText = document.getElementById("ingredientsText");
const stepsText = document.getElementById("stepsText");
const dishName = document.getElementById("dishName");

// Setup event listener for 'SurpriseButton' click
if (surpriseButton && ingredientsText) {
    surpriseButton.addEventListener("click", function () {
        fetch('localhost:5000/random_recipe') // Call the Flask route to fetch a random recipe
            .then(response => response.json())
            .then(recipe => {
                // Update the dish name
                const recipeTitle = recipe.title;
                const smallElement = dishName.querySelector('small');
                if (smallElement) {
                    smallElement.innerText = recipeTitle;
                }

                // Format and display ingredients
                const ingredients = recipe.extendedIngredients;
                let ingredientsString = "Ingredients:\n";
                ingredients.forEach(ingredient => {
                    ingredientsString += `${ingredient.original}\n`;
                });
                ingredientsText.innerText = ingredientsString;

                // Set the image for the dish
                const imageUrl = recipe.image;
                const recipeImage = document.getElementById("dishImage").querySelector("img");
                recipeImage.src = imageUrl;

                // Display the cooking steps
                const steps = recipe.analyzedInstructions[0].steps;
                const stepsHtml = steps.map(step => `<li>${step.step}</li>`).join('');
                stepsText.innerHTML = `<ol>${stepsHtml}</ol>`;
            })
            .catch(error => {
                // Log any errors that occur during the fetch process
                console.error('Error fetching random recipe:', error);
            });
    });
}

// Function to fetch a random recipe from an API
function fetchRandomRecipe() {
    const apiKey = '12390bea9249405f90362f4ed75ef5b7'; // API key for the recipe service
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`; // URL to fetch data

    return fetch(apiUrl)
        .then(response => {
            // Check for a successful response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            return data.recipes[0]; // Return the first recipe from the fetched data
        });
}