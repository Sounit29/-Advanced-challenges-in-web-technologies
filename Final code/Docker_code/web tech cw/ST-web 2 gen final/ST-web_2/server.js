const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Define a route to serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Define a route to handle incoming requests to the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'Menu_page.html')); // Send the intro_page.html file from the 'public' directory
});

// Start the server
app.listen(PORT, () => {
  console.log(`Fiver server is running on http://localhost:${PORT}`);
});
