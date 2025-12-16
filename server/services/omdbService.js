const axios = require('axios');

const OMDB_API_KEY = process.env.OMDB_API_KEY || '8265bd1c';
const OMDB_BASE_URL = process.env.OMDB_BASE_URL || 'http://www.omdbapi.com';

const omdbService = {
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          s: query,
          type: 'movie',
          page: page
        }
      });

      if (response.data.Response === 'True') {
        return response.data.Search.map(movie => ({
          _id: movie.imdbID,
          tmdbId: movie.imdbID,
          title: movie.Title,
          genre: 'Unknown',
          releaseYear: parseInt(movie.Year),
          director: 'N/A',
          description: 'Click to view details',
          thumbnail: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image',
          trailerUrl: '',
          movieUrl: ''
        }));
      }
      return [];
    } catch (error) {
      console.error('OMDB API Error:', error);
      return [];
    }
  },

  getMovieDetails: async (imdbId) => {
    try {
      const response = await axios.get(OMDB_BASE_URL, {
        params: {
          apikey: OMDB_API_KEY,
          i: imdbId,
          plot: 'full'
        }
      });

      if (response.data.Response === 'True') {
        const movie = response.data;
        return {
          _id: movie.imdbID,
          tmdbId: movie.imdbID,
          title: movie.Title,
          genre: movie.Genre ? movie.Genre.split(',')[0].trim() : 'Unknown',
          releaseYear: parseInt(movie.Year),
          director: movie.Director || 'N/A',
          description: movie.Plot || 'No description available',
          thumbnail: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image',
          trailerUrl: '',
          movieUrl: '',
          rating: parseFloat(movie.imdbRating) || 0,
          runtime: movie.Runtime ? parseInt(movie.Runtime) : null
        };
      }
      return null;
    } catch (error) {
      console.error('OMDB API Error:', error);
      return null;
    }
  },

  getPopularMovies: async () => {
    const popularTitles = [
      'Avengers Endgame', 'Avatar', 'Titanic', 'Spider-Man', 'Batman',
      'Iron Man', 'The Dark Knight', 'Inception', 'Interstellar', 'Joker'
    ];
    
    const movies = [];
    for (const title of popularTitles) {
      const results = await omdbService.searchMovies(title);
      if (results.length > 0) {
        movies.push(results[0]);
      }
    }
    return movies;
  }
};

module.exports = omdbService;