const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Set the port for your server

// Middleware to serve static files (e.g., HTML, CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Define your routes and their corresponding handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Example API route
app.get('/api/data', (req, res) => {
  // You can respond with JSON data
  res.json({ message: 'This is an example JSON response.' });
});

// Handle 404 errors (page not found)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
