document.addEventListener('DOMContentLoaded', function() {
    const recipesContainer = document.getElementById('recipes');
    
    // Example data for testing
    const recipesData = [
        { 
            name: 'Spaghetti Carbonara', 
            description: 'A classic Italian pasta dish made with eggs, cheese, bacon, and black pepper.', 
            ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese', 'Black Pepper'], 
            image: './food/Spaghetti Carbonara.jpg'
        },
        { 
            name: 'Grilled Salmon', 
            description: 'Delicious grilled salmon fillets seasoned with herbs and lemon.', 
            ingredients: ['Salmon Fillets', 'Garlic', 'Thyme', 'Lemon', 'Olive Oil'], 
            image: './food/Grilled Salmon.jpg' 
        },
        { 
            name: 'Vegetable Stir-Fry', 
            description: 'Healthy and colorful vegetable stir-fry with soy sauce and ginger.', 
            ingredients: ['Broccoli', 'Carrot', 'Bell Peppers', 'Mushrooms', 'Soy Sauce'], 
            image: './food/Vegetable Stir Fry.jpg'
        }
        // Add more recipe data as needed
    ];

    function generateRecipeBoxes(recipes) {
        recipesContainer.innerHTML = '';
    
        if (recipes.length === 0) {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No recipes found.';
            recipesContainer.appendChild(noResultsMessage);
        } else {
            recipes.forEach((recipe, index) => {
                const recipeBox = document.createElement('div');
                recipeBox.classList.add('recipe-box');
                recipeBox.dataset.recipeId = index + 1; // Assigning recipe ID
    
                const h2 = document.createElement('h2');
                h2.textContent = recipe.name;
                recipeBox.appendChild(h2);
    
                const img = document.createElement('img');
                img.src = recipe.image;
                img.alt = recipe.name;
                recipeBox.appendChild(img);
    
                const p = document.createElement('p');
                p.textContent = recipe.description;
                recipeBox.appendChild(p);
    
                const ul = document.createElement('ul');
                recipe.ingredients.forEach(ingredient => {
                    const li = document.createElement('li');
                    li.textContent = ingredient;
                    ul.appendChild(li);
                });
                recipeBox.appendChild(ul);
    
                const button = document.createElement('button');
                button.textContent = 'View Recipe';
                button.classList.add('view-details-btn')
                recipeBox.appendChild(button);
    
                recipesContainer.appendChild(recipeBox);
            });
        }
    }
    

    function getSelectedIngredients() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const ingredients = urlParams.get('ingredients');
        return ingredients ? ingredients.split(',') : [];
    }
      

    function displayRecipes() {
        const selectedIngredients = getSelectedIngredients();
        const filteredRecipes = recipesData.filter(recipe => {
            return selectedIngredients.every(ingredient => recipe.ingredients.includes(ingredient));
        });
        generateRecipeBoxes(filteredRecipes);
    
        const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const recipeId = button.closest('.recipe-box').dataset.recipeId;
                window.location.href = `details.html?recipeId=${recipeId}`;
            });
        });
    }    
    
    displayRecipes();
});
