const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: '../.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('Server starting without MongoDB - using temporary data');

// Routes
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client-vite/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client-vite/dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'CinemaSphere API is running! Start the React client on port 3000.' });
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});