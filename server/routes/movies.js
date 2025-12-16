const express = require('express');
const tempMovies = require('../tempData');
const router = express.Router();

// GET /api/movies - Fetch all movies
router.get('/', (req, res) => {
  res.json(tempMovies);
});

// GET /api/movies/search - Search movies by title
router.get('/search', (req, res) => {
  const { title } = req.query;
  const filteredMovies = tempMovies.filter(movie => 
    movie.title.toLowerCase().includes(title.toLowerCase())
  );
  res.json(filteredMovies);
});

// GET /api/movies/:id - Fetch single movie
router.get('/:id', (req, res) => {
  const movie = tempMovies.find(m => m._id === req.params.id);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(movie);
});

module.exports = router;