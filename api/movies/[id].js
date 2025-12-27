// Vercel Serverless Function: GET /api/movies/[id]
// Dynamic route to get a single movie by ID

const movies = require('../_data/movies');

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: 'Movie ID is required' });
        }

        // Find movie by _id
        let movie = movies.find(m => m._id === id);

        // Try finding by tmdbId if not found
        if (!movie) {
            const numericId = parseInt(id.replace('tmdb_', ''), 10);
            movie = movies.find(m => m.tmdbId === numericId);
        }

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error('Error in /api/movies/[id]:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
