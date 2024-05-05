from flask import Flask, render_template, jsonify, request
import requests


app = Flask(__name__)

@app.route('/')
def index():
    return "Hello Worlds"

@app.route('/random_recipe')
def random_recipe():
    # Call your function to fetch a random recipe here
    recipe = fetch_random_recipe()
    return jsonify(recipe)

# Function to fetch a random recipe (you need to implement this)

def fetch_random_recipe():
    api_key = '12390bea9249405f90362f4ed75ef5b7'
    url = f'https://api.spoonacular.com/recipes/random?apiKey={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for 4xx or 5xx status codes
        data = response.json()
        if 'recipes' in data:
            return data['recipes'][0]  # Return the first recipe from the fetched data
        else:
            return None
    except requests.exceptions.RequestException as e:
        # Handle exceptions if the request fails
        print('Error fetching random recipe:', e)
        return None


if __name__ == '__main__':
    app.run(debug=True,port=5000,host="0.0.0.0")
