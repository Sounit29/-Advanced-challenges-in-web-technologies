# Use the official Node.js image as the base image
FROM node:14-slim

# Set the working directory in the container
WORKDIR /ST-web_2

# Copy the Fiver server application code to the container
COPY . .

# Expose the Fiver server port
EXPOSE 3000

RUN npm install express

# Command to run the Fiver server
CMD ["node", "server.js"]
