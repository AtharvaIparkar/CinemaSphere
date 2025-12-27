// Movie Service - API Layer
// Fetches from backend API with static fallback for reliability

import staticMovies from '../data/staticMovies';

// API base URL - uses Vite proxy in development, full URL in production
// In dev, Vite proxy forwards /api to http://localhost:5000
const API_BASE = '/api';

/**
 * Fetch all movies from API
 */
export const getAllMovies = async () => {
    try {
        const response = await fetch(`${API_BASE}/movies`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const movies = await response.json();

        if (movies && movies.length > 0) {
            return movies;
        }

        // Empty results, use fallback
        return staticMovies;
    } catch (error) {
        console.warn('API failed, using static movies:', error.message);
        return staticMovies;
    }
};

/**
 * Fetch a single movie by ID
 */
export const getMovieById = async (id) => {
    // Check static movies first for instant fallback
    const staticMovie = staticMovies.find(m => m._id === id);

    try {
        const response = await fetch(`${API_BASE}/movies/${id}`);

        if (!response.ok) {
            if (staticMovie) return staticMovie;
            throw new Error(`API error: ${response.status}`);
        }

        const movie = await response.json();

        if (movie && movie._id) {
            return movie;
        }

        return staticMovie || null;
    } catch (error) {
        console.warn('API movie fetch failed:', error.message);

        // Fallback: try to find by tmdbId in static movies
        if (!staticMovie) {
            const numericId = parseInt(id.replace('tmdb_', ''), 10);
            return staticMovies.find(m => m.tmdbId === numericId) || null;
        }

        return staticMovie;
    }
};

/**
 * Search movies by query
 */
export const searchMovies = async (query) => {
    if (!query || !query.trim()) {
        return getAllMovies();
    }

    try {
        const response = await fetch(`${API_BASE}/movies/search?q=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const movies = await response.json();

        if (movies && movies.length > 0) {
            return movies;
        }

        return [];
    } catch (error) {
        console.warn('API search failed, searching static movies:', error.message);
        const lowerQuery = query.toLowerCase();
        return staticMovies.filter(m =>
            m.title.toLowerCase().includes(lowerQuery)
        );
    }
};
