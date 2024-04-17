	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/


(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
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

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

               
           
		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});


})(jQuery);

const surpriseButton = document.getElementById("SurpriseButton");
const ingredientsText = document.getElementById("ingredientsText");
const stepsText = document.getElementById("stepsText");

const dishName = document.getElementById("dishName");

if (surpriseButton && ingredientsText) {
	surpriseButton.addEventListener("click", function () {
		fetchRandomRecipe()
			.then(recipe => {
				// Extract recipe title from API response
				const recipeTitle = recipe.title;

				// Set recipe title as content of dishName element
				const smallElement = dishName.querySelector('small');
				if (smallElement) {
					smallElement.innerText = recipeTitle;
				}
				// Extract ingredients part of the recipe
				const ingredients = recipe.extendedIngredients;
				// Create a string to represent ingredients
				let ingredientsString = "Ingredients:\n";
				ingredients.forEach(ingredient => {
					ingredientsString += `${ingredient.original}\n`;
				});
				// Replace ingredients text with new content
				ingredientsText.innerText = ingredientsString;

				// Extract image URL from the recipe
				const imageUrl = recipe.image;

				const recipeImage = document.getElementById("dishImage").querySelector("img");
				// Set image src attribute to recipe image URL
				recipeImage.src = imageUrl;

				// Get cooking steps and concatenate into a string
				const steps = recipe.analyzedInstructions[0].steps;
				const stepsHtml = steps.map(step => `<li>${step.step}</li>`).join('');

				// Set cooking steps string as innerHTML of stepsText element
				stepsText.innerHTML = `<ol>${stepsHtml}</ol>`;

				
			})
			.catch(error => {
				console.error('Error fetching random recipe:', error);
			});
	});
}

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
			// Return a single recipe object
			return data.recipes[0];
		});
}

document.addEventListener("DOMContentLoaded", function () {
	const generateButton = document.getElementById("generateButton");
	// Ensure button element exists before binding event
	if (generateButton) {
		generateButton.addEventListener("click", function (event) {
			event.preventDefault();

			const checkboxes = document.querySelectorAll('input[type="checkbox"]');

			// Check if any checkbox is checked
			let anyCheckboxChecked = false;
			checkboxes.forEach(checkbox => {
				if (checkbox.checked) {
					anyCheckboxChecked = true;
					return; // Break the loop if any checkbox is checked
				}
			});

			// If no checkbox is checked, show alert
			if (!anyCheckboxChecked) {
				alert('Please select at least one checkbox before generating.');
				return;
			}




			// Get values of checked checkboxes
			var ingredients = [];
			$("input[type=checkbox]:checked").each(function () {
				ingredients.push($(this).attr("id"));
			});

			// Construct API link
			var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients.join(",+") + "&number=3&apiKey=e445f97d26c346a0b8b8410e437af6b5";

			// Show apiUrl in alert
			//alert(apiUrl);

			// Redirect to dishes.html page with API link as parameter
			window.location.href = "dishes.html?apiUrl=" + encodeURIComponent(apiUrl);
		});
	}

	// Perform actions when dishes.html page is loaded
	if (window.location.pathname.includes("dishes.html")) {
		// Get parameters from URL
		const urlParams = new URLSearchParams(window.location.search);
		const apiUrl = urlParams.get('apiUrl');

		if (apiUrl) {
			// Fetch recipe JSON data
			fetch(apiUrl)
				.then(response => response.json())
				.then(data => {
					// Check if recipe data exists
					if (data && data.length > 0) {
						// Extract information of the first recipe
						const recipe = data[0];
						// Update content on the page
						document.getElementById('dish_1').innerText = recipe.title; // Replace dish name
						document.getElementById('recipe_1').innerText = recipe.missedIngredients.map(ingredient => ingredient.original).join(', '); // Replace ingredients
						const recipeImage = document.getElementById("dishImage_1").querySelector("img");
						// Set image src attribute to recipe image URL
						recipeImage.src = recipe.image; // Replace image link

						const recipe_2 = data[1];
						// Update content on the page
						document.getElementById('dish_2').innerText = recipe_2.title; // Replace dish name
						document.getElementById('recipe_2').innerText = recipe_2.missedIngredients.map(ingredient => ingredient.original).join(', '); // Replace ingredients
						const recipeImage_2 = document.getElementById("dishImage_2").querySelector("img");
						// Set image src attribute to recipe image URL
						recipeImage_2.src = recipe_2.image; // Replace image link

						const recipe_3 = data[2];
						// Update content on the page
						document.getElementById('dish_3').innerText = recipe_3.title; // Replace dish name
						document.getElementById('recipe_3').innerText = recipe_3.missedIngredients.map(ingredient => ingredient.original).join(', '); // Replace ingredients
						const recipeImage_3 = document.getElementById("dishImage_3").querySelector("img");
						// Set image src attribute to recipe image URL
						recipeImage_3.src = recipe_3.image; // Replace image link
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
});



document.addEventListener("DOMContentLoaded", function () {
	// Perform actions when dishes.html page is loaded
	if (window.location.pathname.includes("recipe.html")) {
		// Get parameters from URL
		const urlParams = new URLSearchParams(window.location.search);
		const apiUrl = urlParams.get('apiUrl');

		if (apiUrl) {
			// Fetch recipe JSON data
			fetch(apiUrl)
				.then(response => response.json())
				.then(data => {
					// Check if recipe data exists
					if (data && data.length > 0) {
						// Extract information of the first recipe
						const recipe = data[0];
						// Update content on the page
						// Extract recipe title from API response
						const recipeTitle = recipe.title;

						// Set recipe title as content of dishName element
						const smallElement = dishName.querySelector('small');
						if (smallElement) {
							smallElement.innerText = recipeTitle;
						}

						const recipeImage = document.getElementById("dishImage").querySelector("img");
						// Set image src attribute to recipe image URL
						recipeImage.src = recipe.image; // Replace image link

						// Save recipe ID
						const recipeId = recipe.id;
						// Construct URL to get detailed cooking steps data
						const detailedInstructionsUrl = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=e445f97d26c346a0b8b8410e437af6b5`;

						// Send second request to get detailed cooking steps data
						fetch(detailedInstructionsUrl)
							.then(response => response.json())
							.then(detailedData => {
								// Handle returned detailed cooking steps data
								console.log('Detailed instructions data:', detailedData);
								// Here you can update the page or perform other actions based on the returned detailed cooking steps data

								// Initialize an empty string to store ingredients information
								let ingredientsString = "Ingredients:\n";

								// Loop through each step and add ingredients information to the string
								detailedData[0].steps.forEach(step => {
									step.ingredients.forEach(ingredient => {
										ingredientsString += `${ingredient.name}\n`;
									});
								});

								// Replace ingredients text with new content
								const ingredientsText = document.getElementById("ingredientsText");
								ingredientsText.innerText = ingredientsString;
								// Get cooking steps and concatenate into a string
								const steps = detailedData.length > 0 && detailedData[0].steps ? detailedData[0].steps : [];
								const stepsHtml = steps.map(step => `<li>${step.step}</li>`).join('');

								// Set cooking steps string as innerHTML of stepsText element
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

	// Perform actions when a link is clicked
	document.getElementById('dish_1').addEventListener('click', function (event) {
		// Prevent default link click behavior
		event.preventDefault();

		// Get current URL parameters containing API URL
		const apiUrl = new URLSearchParams(window.location.search).get('apiUrl');

		// Construct URL for recipe.html page with API URL as parameter
		const recipePageUrl = `recipe.html?apiUrl=${encodeURIComponent(apiUrl)}`;

		// Redirect to recipe.html page
		window.location.href = recipePageUrl;
	});
});


document.addEventListener("DOMContentLoaded", function () {
	// Add click event handler on clear button
	document.getElementById('clearButton').addEventListener('click', function () {
		// Get all checkbox elements on the page
		const checkboxes = document.querySelectorAll('input[type="checkbox"]');

		// Loop through checkbox elements and set their checked state to unchecked
		checkboxes.forEach(checkbox => {
			checkbox.checked = false;
		});
	});
});
