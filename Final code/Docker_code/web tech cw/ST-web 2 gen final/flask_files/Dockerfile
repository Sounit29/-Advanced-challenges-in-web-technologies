# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /flask_files

# Copy the dependencies file to the working directory
COPY requirements.txt .

# Install Flask and other dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask application code to the container
COPY . .

# Expose the Flask app port
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "main_api.py"]
