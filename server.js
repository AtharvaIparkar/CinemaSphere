// Local development server - mimics Vercel serverless API
const express = require('express');
const cors = require('cors');
const movies = require('./api/_data/movies');

const app = express();
app.use(cors());
app.use(express.json());

// GET /api/movies - Get all movies or search
app.get('/api/movies', (req, res) => {
    const { q } = req.query;

    if (q && q.trim()) {
        const searchTerm = q.toLowerCase().trim();
        const results = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm)
        );
        return res.json(results);
    }

    res.json(movies);
});

// GET /api/movies/:id - Get movie by ID
app.get('/api/movies/:id', (req, res) => {
    const { id } = req.params;

    let movie = movies.find(m => m._id === id);

    if (!movie) {
        const numericId = parseInt(id.replace('tmdb_', ''), 10);
        movie = movies.find(m => m.tmdbId === numericId);
    }

    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
});

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'CinemaSphere API running locally' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Local API server running on http://localhost:${PORT}`);
});
