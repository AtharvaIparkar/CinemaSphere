const axios = require('axios');

const IMDB_BASE_URL = 'https://imdb.iamidiotareyoutoo.com';

const imdbService = {
  searchMovies: async (query) => {
    try {
      const response = await axios.get(`${IMDB_BASE_URL}/search`, {
        params: { q: query },
        timeout: 10000
      });

      if (response.data && Array.isArray(response.data)) {
        return response.data.map(movie => ({
          _id: movie.imdbID || movie.id || `imdb_${Date.now()}_${Math.random()}`,
          tmdbId: movie.imdbID,
          title: movie.title || movie.Title || 'Unknown Title',
          genre: movie.genre || movie.Genre || 'Unknown',
          releaseYear: movie.year || movie.Year || 'Unknown',
          director: movie.director || movie.Director || 'N/A',
          description: movie.plot || movie.Plot || movie.overview || 'No description available',
          thumbnail: movie.poster || movie.Poster || movie.image || 'https://via.placeholder.com/300x450?text=No+Image',
          trailerUrl: movie.trailer || '',
          movieUrl: movie.streamUrl || movie.url || '',
          rating: parseFloat(movie.rating || movie.imdbRating || movie.vote_average || 0),
          runtime: movie.runtime || movie.Runtime || null
        }));
      }
      return [];
    } catch (error) {
      console.error('IMDB API Search Error:', error.message);
      return [];
    }
  },

  getMovieByImdbId: async (imdbId) => {
    try {
      const response = await axios.get(`${IMDB_BASE_URL}/search`, {
        params: { tt: imdbId },
        timeout: 10000
      });

      if (response.data) {
        const movie = Array.isArray(response.data) ? response.data[0] : response.data;
        
        return {
          _id: movie.imdbID || imdbId,
          tmdbId: movie.imdbID || imdbId,
          title: movie.title || movie.Title || 'Unknown Title',
          genre: movie.genre || movie.Genre || 'Unknown',
          releaseYear: movie.year || movie.Year || 'Unknown',
          director: movie.director || movie.Director || 'N/A',
          description: movie.plot || movie.Plot || movie.overview || 'No description available',
          thumbnail: movie.poster || movie.Poster || movie.image || 'https://via.placeholder.com/300x450?text=No+Image',
          trailerUrl: movie.trailer || '',
          movieUrl: movie.streamUrl || movie.url || '',
          rating: parseFloat(movie.rating || movie.imdbRating || movie.vote_average || 0),
          runtime: movie.runtime || movie.Runtime || null
        };
      }
      return null;
    } catch (error) {
      console.error('IMDB API Details Error:', error.message);
      return null;
    }
  },

  getPopularMovies: async () => {
    const popularQueries = [
      'Spider-Man', 'Batman', 'Avengers', 'Star Wars', 'Iron Man',
      'Thor', 'Captain America', 'Wonder Woman', 'Superman', 'Joker',
      'Inception', 'Interstellar', 'The Dark Knight', 'Matrix', 'Avatar'
    ];
    
    const movies = [];
    
    try {
      // Search for popular movies concurrently
      const searchPromises = popularQueries.slice(0, 5).map(query => 
        imdbService.searchMovies(query)
      );
      
      const results = await Promise.all(searchPromises);
      
      results.forEach(movieList => {
        if (movieList.length > 0) {
          // Take the first movie from each search
          movies.push(movieList[0]);
        }
      });
      
      return movies;
    } catch (error) {
      console.error('Error fetching popular movies from IMDB API:', error);
      return [];
    }
  }
};

module.exports = imdbService;