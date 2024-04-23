Editorial by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

(function($) {

    var $window = $(window),
        $head = $('head'),
        $body = $('body');

    // Setup responsive breakpoints for various screen sizes.
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ],
        'xlarge-to-max':    '(min-width: 1681px)',
        'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
    });

    // Pause animations/transitions until the page is fully loaded or resized.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    var resizeTimeout;
    $window.on('resize', function() {
        $body.addClass('is-resizing');
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            $body.removeClass('is-resizing');
        }, 100);
    });

    // Adjustments for object-fit images, with fallbacks for Safari.
    if (!browser.canUse('object-fit') || browser.name == 'safari') {
        $('.image.object').each(function() {
            var $this = $(this),
                $img = $this.children('img');
            $img.css('opacity', '0');
            $this.css('background-image', 'url("' + $img.attr('src') + '")')
                .css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
                .css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');
        });
    }

    // Sidebar management for different breakpoints.
    var $sidebar = $('#sidebar'),
        $sidebar_inner = $sidebar.children('.inner');
    breakpoints.on('<=large', function() {
        $sidebar.addClass('inactive');
    });
    breakpoints.on('>large', function() {
        $sidebar.removeClass('inactive');
    });

    // Fix for Chrome/Android scrollbar position bug.
    if (browser.os == 'android' && browser.name == 'chrome') {
        $('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
            .appendTo($head);
    }

    // Sidebar toggle button.
    $('<a href="#sidebar" class="toggle">Toggle</a>')
        .appendTo($sidebar)
        .on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $sidebar.toggleClass('inactive');
        });

    // Handle sidebar events.
    $sidebar.on('click', 'a', function(event) {
        if (breakpoints.active('>large'))
            return;
        event.preventDefault();
        event.stopPropagation();
        var $a = $(this),
            href = $a.attr('href'),
            target = $a.attr('target');
        if (!href || href == '#' || href == '')
            return;
        $sidebar.addClass('inactive');
        setTimeout(function() {
            if (target == '_blank')
                window.open(href);
            else
                window.location.href = href;
        }, 500);
    });

    $sidebar.on('click touchend touchstart touchmove', function(event) {
        if (breakpoints.active('>large'))
            return;
        event.stopPropagation();
    });

    $body.on('click touchend', function(event) {
        if (breakpoints.active('>large'))
            return;
        $sidebar.addClass('inactive');
    });

    // Scroll lock functionality to keep sidebar content synchronized.
    $window.on('load.sidebar-lock', function() {
        var sh, wh, st;
        if ($window.scrollTop() == 1)
            $window.scrollTop(0);
        $window.on('scroll.sidebar-lock', function() {
            var x, y;
            if (breakpoints.active('<=large')) {
                $sidebar_inner.data('locked', 0)
                              .css('position', '')
                              .css('top', '');
                return;
            }
            x = Math.max(sh - wh, 0);
            y = Math.max(0, $window.scrollTop() - x);
            if ($sidebar_inner.data('locked') == 1) {
                if (y <= 0) {
                    $sidebar_inner.data('locked', 0)
                                  .css('position', '')
                                  .css('top', '');
                } else {
                    $sidebar_inner.css('top', -1 * x);
                }
            } else {
                if (y > 0) {
                    $sidebar_inner.data('locked', 1)
                                  .css('position', 'fixed')
                                  .css('top', -1 * x);
                }
            }
        }).on('resize.sidebar-lock', function() {
            wh = $window.height();
            sh = $sidebar_inner.outerHeight() + 30;
            $window.trigger('scroll.sidebar-lock');
        }).trigger('resize.sidebar-lock');
    });

    // Menu management, especially for nested menus in smaller screens.
    var $menu = $('#menu'),
        $menu_openers = $menu.children('ul').find('.opener');
    $menu_openers.each(function() {
        var $this = $(this);
        $this.on('click', function(event) {
            event.preventDefault();
            $menu_openers.not($this).removeClass('active');
            $this.toggleClass('active');
            $window.triggerHandler('resize.sidebar-lock');
        });
    });
})(jQuery);


// Get necessary DOM elements by their IDs for further manipulation.
const surpriseButton = document.getElementById("SurpriseButton");
const ingredientsText = document.getElementById("ingredientsText");
const stepsText = document.getElementById("stepsText");
const dishName = document.getElementById("dishName");

// Attach event listener to the surprise button if it exists.
if (surpriseButton && ingredientsText) {
    surpriseButton.addEventListener("click", function () {
        // Fetch a random recipe from the API and handle the response.
        fetchRandomRecipe()
            .then(recipe => {
                // Set the recipe title in the dishName element.
                const recipeTitle = recipe.title;
                const smallElement = dishName.querySelector('small');
                if (smallElement) {
                    smallElement.innerText = recipeTitle;
                }

                // Format and display the ingredients from the recipe.
                const ingredients = recipe.extendedIngredients;
                let ingredientsString = "Ingredients:\n";
                ingredients.forEach(ingredient => {
                    ingredientsString += `${ingredient.original}\n`;
                });
                ingredientsText.innerText = ingredientsString;

                // Update the image for the recipe.
                const imageUrl = recipe.image;
                const recipeImage = document.getElementById("dishImage").querySelector("img");
                recipeImage.src = imageUrl;

                // Format and display the steps for preparing the recipe.
                const steps = recipe.analyzedInstructions[0].steps;
                const stepsHtml = steps.map(step => `<li>${step.step}</li>`).join('');
                stepsText.innerHTML = `<ol>${stepsHtml}</ol>`;
            })
            .catch(error => {
                // Log any errors that occur during the fetch.
                console.error('Error fetching random recipe:', error);
            });
    });
}

// Function to fetch a random recipe using an API key and endpoint.
function fetchRandomRecipe() {
    const apiKey = 'e445f97d26c346a0b8b8410e437af6b5';
    const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Return the first recipe from the fetched data.
            return data.recipes[0];
        });
}

// Ensure actions are set up after the document is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    if (generateButton) {
        // Handle button clicks for generating results based on selected options.
        generateButton.addEventListener("click", function (event) {
            event.preventDefault();
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            let anyCheckboxChecked = false;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    anyCheckboxChecked = true;
                    return;
                }
            });

            // Alert if no options are selected when attempting to generate results.
            if (!anyCheckboxChecked) {
                alert('Please select at least one checkbox before generating.');
                return;
            }

            // Compile a list of checked checkboxes and build an API URL with those parameters.
            var ingredients = [];
            $("input[type=checkbox]:checked").each(function () {
                ingredients.push($(this).attr("id"));
            });
            var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients.join(",+") + "&number=3&apiKey=e445f97d26c346a0b8b8410e437af6b5";

            // Redirect to a new page with the API URL as a query parameter.
            window.location.href = "dishes.html?apiUrl=" + encodeURIComponent(apiUrl);
        });
    }

    // Additional code to handle fetching recipes and updating the webpage when the dishes.html page is loaded.
    if (window.location.pathname.includes("dishes.html")) {
        const urlParams = new URLSearchParams(window.location.search);
        const apiUrl = urlParams.get('apiUrl');

        if (apiUrl) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data && data.length > 0) {
                        // Update page content with fetched recipe data.
                        const recipe = data[0];
                        document.getElementById('dish_1').innerText = recipe.title;
                        document.getElementById('recipe_1').innerText = recipe.missedIngredients.map(ingredient => ingredient.original).join(', ');
                        const recipeImage = document.getElementById("dishImage_1").querySelector("img");
                        recipeImage.src = recipe.image;

                        // Handling additional recipes similarly.
                        const recipe_2 = data[1];
                        document.getElementById('dish_2').innerText = recipe_2.title;
                        document.getElementById('recipe_2').innerText = recipe_2.missedIngredients.map(ingredient => ingredient.original).join(', ');
                        const recipeImage_2 = document.getElementById("dishImage_2").querySelector("img");
                        recipeImage_2.src = recipe_2.image;

                        const recipe_3 = data[2];
                        document.getElementById('dish_3').innerText = recipe_3.title;
                        document.getElementById('recipe_3').innerText = recipe_3.missedIngredients.map(ingredient => ingredient.original).join(', ');
                        const recipeImage_3 = document.getElementById("dishImage_3").querySelector("img");
                        recipeImage_3.src = recipe_3.image;
                    } else {
                        // Handle cases where no recipes are found.
                        console.error('No recipes found in the response.');
                        alert('No recipes found. Please try again later.');
                    }
                })
                .catch(error => {
                    // Log and alert on errors during fetch.
                    console.error('Error fetching recipes:', error);
                    alert('Error fetching recipes. Please try again later.');
                });
        } else {
            // Handle cases where the API URL parameter is missing.
            console.error('API URL not found in URL parameters.');
            alert('API URL not found. Please try again.');
        }
    }
});


// This block is executed after the document is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
    // Actions specific to when the 'recipe.html' page is loaded.
    if (window.location.pathname.includes("recipe.html")) {
        // Retrieve URL parameters.
        const urlParams = new URLSearchParams(window.location.search);
        const apiUrl = urlParams.get('apiUrl');

        // Check if the API URL parameter is provided.
        if (apiUrl) {
            // Fetch recipe data from the API URL.
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Check if data was returned.
                    if (data && data.length > 0) {
                        const recipe = data[0];  // Use the first recipe in the array.

                        // Display the recipe title.
                        const recipeTitle = recipe.title;
                        const smallElement = dishName.querySelector('small');
                        if (smallElement) {
                            smallElement.innerText = recipeTitle;
                        }

                        // Display the recipe image.
                        const recipeImage = document.getElementById("dishImage").querySelector("img");
                        recipeImage.src = recipe.image;

                        // Save the recipe ID for further requests.
                        const recipeId = recipe.id;
                        // Construct URL for fetching detailed cooking instructions.
                        const detailedInstructionsUrl = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=e445f97d26c346a0b8b8410e437af6b5`;

                        // Fetch detailed cooking instructions.
                        fetch(detailedInstructionsUrl)
                            .then(response => response.json())
                            .then(detailedData => {
                                // Process detailed cooking instructions.
                                let ingredientsString = "Ingredients:\n";
                                detailedData[0].steps.forEach(step => {
                                    step.ingredients.forEach(ingredient => {
                                        ingredientsString += `${ingredient.name}\n`;
                                    });
                                });

                                // Update ingredients display.
                                const ingredientsText = document.getElementById("ingredientsText");
                                ingredientsText.innerText = ingredientsString;

                                // Format and display cooking steps.
                                const steps = detailedData.length > 0 && detailedData[0].steps ? detailedData[0].steps : [];
                                const stepsHtml = steps.map(step => `<li>${step.step}</li>`).join('');
                                const stepsText = document.getElementById("stepsText");
                                stepsText.innerHTML = `<ol>${stepsHtml}</ol>`;
                            })
                            .catch(error => {
                                console.error('Error fetching detailed instructions:', error);
                                alert('Error fetching detailed instructions. Please try again later.');
                            });
                    } else {
                        console.error('No recipes found in the response.');
                        alert('No recipes found. Please try again later.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching recipes:', error);
                    alert('Error fetching recipes. Please try again later.');
                });
        } else {
            console.error('API URL not found in URL parameters.');
            alert('API URL not found. Please try again.');
        }
    }

    // Setup event listener for handling clicks on a specific link.
    document.getElementById('dish_1').addEventListener('click', function (event) {
        event.preventDefault();  // Prevent the default link behavior.

        // Retrieve API URL from the current URL parameters.
        const apiUrl = new URLSearchParams(window.location.search).get('apiUrl');

        // Construct URL for redirecting to the recipe page with API details.
        const recipePageUrl = `recipe.html?apiUrl=${encodeURIComponent(apiUrl)}`;

        // Redirect to the specified recipe page.
        window.location.href = recipePageUrl;
    });
});

// Another block to handle clear button functionality after the document is loaded.
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to clear all checkbox selections.
    document.getElementById('clearButton').addEventListener('click', function () {
        // Get all checkbox elements on the page.
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Uncheck all checkboxes.
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    });
});
