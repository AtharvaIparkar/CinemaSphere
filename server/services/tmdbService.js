const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY
  }
});

const tmdbService = {
  getPopularMovies: async (page = 1) => {
    const response = await tmdbApi.get('/movie/popular', { params: { page } });
    return response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      genre: movie.genre_ids[0] || 'Unknown',
      releaseYear: new Date(movie.release_date).getFullYear(),
      director: 'N/A',
      description: movie.overview,
      thumbnail: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`,
      trailerUrl: '',
      movieUrl: '',
      rating: movie.vote_average
    }));
  },

  searchMovies: async (query) => {
    const response = await tmdbApi.get('/search/movie', { params: { query } });
    return response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      genre: movie.genre_ids[0] || 'Unknown',
      releaseYear: new Date(movie.release_date).getFullYear(),
      director: 'N/A',
      description: movie.overview,
      thumbnail: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`,
      trailerUrl: '',
      movieUrl: '',
      rating: movie.vote_average
    }));
  },

  getMovieDetails: async (movieId) => {
    const [movieResponse, videosResponse] = await Promise.all([
      tmdbApi.get(`/movie/${movieId}`),
      tmdbApi.get(`/movie/${movieId}/videos`)
    ]);

    const movie = movieResponse.data;
    const trailer = videosResponse.data.results.find(video => 
      video.type === 'Trailer' && video.site === 'YouTube'
    );

    return {
      id: movie.id,
      title: movie.title,
      genre: movie.genres[0]?.name || 'Unknown',
      releaseYear: new Date(movie.release_date).getFullYear(),
      director: 'N/A',
      description: movie.overview,
      thumbnail: `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`,
      trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
      movieUrl: '',
      rating: movie.vote_average,
      runtime: movie.runtime
    };
  }
};

module.exports = tmdbService;