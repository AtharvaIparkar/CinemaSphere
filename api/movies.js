// Vercel Serverless Function: GET /api/movies
// Also handles: GET /api/movies?q=searchterm (search)

const movies = require('./_data/movies');

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
        const { q } = req.query;

        // Search functionality
        if (q && q.trim()) {
            const searchTerm = q.toLowerCase().trim();
            const results = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm)
            );
            return res.status(200).json(results);
        }

        // Return all movies
        return res.status(200).json(movies);
    } catch (error) {
        console.error('Error in /api/movies:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
