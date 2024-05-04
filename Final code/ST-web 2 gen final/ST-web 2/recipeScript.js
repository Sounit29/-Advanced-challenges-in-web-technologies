// Example data for testing
const recipesData = [
    { 
        name: 'Spaghetti Carbonara', 
        description: 'A classic Italian pasta dish made with eggs, cheese, bacon, and black pepper.', 
        ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan Cheese', 'Black Pepper'], 
        image: './food/Spaghetti Carbonara.jpg',
        steps: [
            'Boil water in a large pot.',
            'Cook the spaghetti.',
            'Prepare the bacon.',
            'Beat the eggs and cheese.',
            'Combine the ingredients.',
            'Serve and enjoy!'
        ]
    },
    { 
        name: 'Grilled Salmon', 
        description: 'Delicious grilled salmon fillets seasoned with herbs and lemon.', 
        ingredients: ['Salmon Fillets', 'Garlic', 'Thyme', 'Lemon', 'Olive Oil'], 
        image: './food/Grilled Salmon.jpg',
        steps: [
            'Preheat the grill.',
            'Season the salmon fillets.',
            'Grill the salmon fillets.',
            'Squeeze lemon juice over the grilled salmon.',
            'Serve and enjoy!'
        ]
    },
    { 
        name: 'Vegetable Stir-Fry', 
        description: 'Healthy and colorful vegetable stir-fry with soy sauce and ginger.', 
        ingredients: ['Broccoli', 'Carrot', 'Bell Peppers', 'Mushrooms', 'Soy Sauce'], 
        image: './food/Vegetable Stir Fry.jpg',
        steps: [
            'Prepare the vegetables.',
            'Heat oil in a pan or wok.',
            'Add vegetables and stir-fry.',
            'Season with soy sauce and ginger.',
            'Serve and enjoy!'
        ]
    },
    { 
        name: 'Chicken Caesar Salad', 
        description: 'A classic Caesar salad topped with grilled chicken breast, crunchy croutons, and savory Parmesan cheese.', 
        ingredients: ['Chicken Breast', 'Romaine Lettuce', 'Croutons', 'Parmesan Cheese', 'Caesar Dressing'], 
        image: './food/Chicken Caesar Salad.jpg',
        steps: [
            'Grill the chicken breast.',
            'Prepare the lettuce.',
            'Assemble the salad with croutons and Parmesan cheese.',
            'Toss with Caesar dressing.',
            'Serve and enjoy!'
        ]
    },
    { 
        name: 'Shrimp Scampi Pasta', 
        description: 'Succulent shrimp sautéed in garlic-infused butter, served over a bed of linguine pasta, and garnished with fresh parsley and a squeeze of lemon.', 
        ingredients: ['Shrimp', 'Linguine Pasta', 'Garlic', 'Butter', 'Lemon', 'Parsley'], 
        image: './food/Shrimp Scampi Pasta.jpg',
        steps: [
            'Cook linguine pasta al dente.',
            'Sauté shrimp with garlic-infused butter.',
            'Toss cooked linguine with shrimp.',
            'Garnish with parsley and lemon juice.',
            'Serve and enjoy!'
        ]
    },
    { 
        name: 'Vegetarian Pizza', 
        description: 'A delicious vegetarian pizza topped with tangy tomato sauce, gooey mozzarella cheese, and a colorful assortment of bell peppers, red onions, black olives, and mushrooms.', 
        ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella Cheese', 'Bell Peppers', 'Red Onion', 'Black Olives', 'Mushrooms'], 
        image: './food/Vegetarian Pizza.jpg',
        steps: [
            'Preheat oven to 475°F (245°C).',
            'Roll out pizza dough on a baking sheet.',
            'Spread tomato sauce over the dough.',
            'Top with mozzarella cheese and vegetables.',
            'Bake in preheated oven for 12-15 minutes.',
            'Slice and serve hot!'
        ]
    }
    // Add more recipe data as needed
];

document.addEventListener('DOMContentLoaded', function() {

    const recipesContainer = document.getElementById('recipes');

    function generateRecipeBoxes(recipes) {
        recipesContainer.innerHTML = '';
    
        if (recipes.length === 0) {
            alert("No recipes found.");
            window.location.href = "Menu_page.html";
        } else {
            recipes.forEach((recipe, index) => {
                const recipeBox = document.createElement('div');
                recipeBox.classList.add('recipe-box');
                recipeBox.dataset.recipeId = index + 1;
    
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

                const stepsDiv = document.createElement('div');
                stepsDiv.classList.add('steps');
                const stepsTitle = document.createElement('h3');
                stepsTitle.textContent = 'Steps:';
                stepsDiv.appendChild(stepsTitle);
                const stepsList = document.createElement('ol');
                recipe.steps.forEach((step, stepIndex) => {
                    const stepItem = document.createElement('li');
                    stepItem.textContent = step;
                    stepsList.appendChild(stepItem);
                });
                stepsDiv.appendChild(stepsList);
                recipeBox.appendChild(stepsDiv);

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

    function getFilteredRecipes(selectedIngredients) {
        return recipesData.filter(recipe => {
            return selectedIngredients.every(selectedIngredient => {
                return recipe.ingredients.some(recipeIngredient => {
                    const normalizedSelected = selectedIngredient.toLowerCase().trim();
                    const normalizedRecipe = recipeIngredient.toLowerCase().trim();
                    return normalizedRecipe.includes(normalizedSelected);
                });
            });
        });
    }
    
    function displayRecipes(recipes) {
        generateRecipeBoxes(recipes);
    
        const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const recipeIndex = parseInt(button.closest('.recipe-box').dataset.recipeId) - 1;
                const recipe = recipes[recipeIndex];
                const recipeName = encodeURIComponent(recipe.name);
                //const url = `Detail_page.html?name=${recipeName}`;
    
                const selectedIngredients = getSelectedIngredients();
                if (selectedIngredients.length > 0) {
                    const queryString = selectedIngredients.map(ingredient => encodeURIComponent(ingredient)).join(',');
                    window.location.href = `${url}&ingredients=${queryString}`;
                } else {
                    window.location.href = url;
                }
            });
        });
    }

    const selectedIngredients = getSelectedIngredients();
    if (selectedIngredients.length > 0) {
        const filteredRecipes = getFilteredRecipes(selectedIngredients);
        displayRecipes(filteredRecipes);
    } else {
        displayRecipes(recipesData);
    }
});
