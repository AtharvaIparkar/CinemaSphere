const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_IMAGE_BASE_URL = process.env.TMDB_IMAGE_BASE_URL;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY }
});

const getGenreName = (genreId) => {
  const genreMap = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Science Fiction',
    10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
  };
  return genreMap[genreId] || 'Unknown';
};

// Static movies as fallback
const staticMovies = [
  { _id: 'static_1', tmdbId: 634649, title: 'Spider-Man: No Way Home', genre: 'Action', releaseYear: 2021, director: 'Jon Watts', description: 'Spider-Man seeks help from Doctor Strange to restore his secret identity.', thumbnail: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', trailerUrl: 'https://www.youtube.com/watch?v=JfVOs4VSpmA', movieUrl: '', rating: 8.2 },
  { _id: 'static_2', tmdbId: 299534, title: 'Avengers: Endgame', genre: 'Action', releaseYear: 2019, director: 'Russo Brothers', description: 'The Avengers assemble once more to reverse Thanos snap.', thumbnail: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg', trailerUrl: 'https://www.youtube.com/watch?v=TcMBFSGVi1c', movieUrl: '', rating: 8.4 },
  { _id: 'static_3', tmdbId: 414906, title: 'The Batman', genre: 'Action', releaseYear: 2022, director: 'Matt Reeves', description: 'Batman ventures into Gotham City underworld.', thumbnail: 'https://image.tmdb.org/t/p/w500/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg', trailerUrl: 'https://www.youtube.com/watch?v=mqqft2x_Aa4', movieUrl: '', rating: 7.8 },
  { _id: 'static_4', tmdbId: 361743, title: 'Top Gun: Maverick', genre: 'Action', releaseYear: 2022, director: 'Joseph Kosinski', description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.', thumbnail: 'https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg', trailerUrl: 'https://www.youtube.com/watch?v=qSqVVswa420', movieUrl: '', rating: 8.3 },
  { _id: 'static_5', tmdbId: 76600, title: 'Avatar: The Way of Water', genre: 'Adventure', releaseYear: 2022, director: 'James Cameron', description: 'Jake Sully lives with his newfound family formed on the planet of Pandora.', thumbnail: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg', trailerUrl: 'https://www.youtube.com/watch?v=d9MyW72ELq0', movieUrl: '', rating: 7.6 },
  { _id: 'static_6', tmdbId: 507086, title: 'Jurassic World Dominion', genre: 'Adventure', releaseYear: 2022, director: 'Colin Trevorrow', description: 'Four years after the destruction of Isla Nublar, dinosaurs now live alongside humans.', thumbnail: 'https://image.tmdb.org/t/p/w500/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg', trailerUrl: 'https://www.youtube.com/watch?v=fb5ELWi-ekk', movieUrl: '', rating: 7.0 },
  { _id: 'static_7', tmdbId: 438148, title: 'Minions: The Rise of Gru', genre: 'Animation', releaseYear: 2022, director: 'Kyle Balda', description: 'The untold story of one twelve-year-old\'s dream to become the world\'s greatest supervillain.', thumbnail: 'https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg', trailerUrl: 'https://www.youtube.com/watch?v=ZIGlqId_x5A', movieUrl: '', rating: 7.5 },
  { _id: 'static_8', tmdbId: 718789, title: 'Lightyear', genre: 'Animation', releaseYear: 2022, director: 'Angus MacLane', description: 'The story of Buzz Lightyear and his adventures to infinity and beyond.', thumbnail: 'https://image.tmdb.org/t/p/w500/ox4goZd956BxqJH6iLwhWPL9ct4.jpg', trailerUrl: 'https://www.youtube.com/watch?v=BwPL0Md_QFQ', movieUrl: '', rating: 7.1 },
  { _id: 'static_9', tmdbId: 675353, title: 'Sonic the Hedgehog 2', genre: 'Family', releaseYear: 2022, director: 'Jeff Fowler', description: 'When the manic Dr. Robotnik returns with a new partner, Knuckles, Sonic and his new friend Tails is all that stands in their way.', thumbnail: 'https://image.tmdb.org/t/p/w500/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg', trailerUrl: 'https://www.youtube.com/watch?v=G5kzUpWAusI', movieUrl: '', rating: 7.5 },
  { _id: 'static_10', tmdbId: 505642, title: 'Black Panther: Wakanda Forever', genre: 'Drama', releaseYear: 2022, director: 'Ryan Coogler', description: 'The people of Wakanda fight to protect their home from intervening world powers.', thumbnail: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', trailerUrl: 'https://www.youtube.com/watch?v=_Z3QKkl1WyM', movieUrl: '', rating: 7.3 },
  { _id: 'static_11', tmdbId: 453395, title: 'Doctor Strange in the Multiverse of Madness', genre: 'Fantasy', releaseYear: 2022, director: 'Sam Raimi', description: 'Doctor Strange teams up with a mysterious teenage girl who can travel across multiverses.', thumbnail: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg', trailerUrl: 'https://www.youtube.com/watch?v=aWzlQ2N6qqg', movieUrl: '', rating: 7.0 },
  { _id: 'static_12', tmdbId: 616037, title: 'Thor: Love and Thunder', genre: 'Comedy', releaseYear: 2022, director: 'Taika Waititi', description: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher.', thumbnail: 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg', trailerUrl: 'https://www.youtube.com/watch?v=Go8nTmfrQd8', movieUrl: '', rating: 6.8 },
  { _id: 'static_13', tmdbId: 109445, title: 'Frozen', genre: 'Animation', releaseYear: 2013, director: 'Chris Buck', description: 'When the newly crowned Queen Elsa accidentally uses her power to turn things into ice.', thumbnail: 'https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg', trailerUrl: 'https://www.youtube.com/watch?v=TbQm5doF_Uc', movieUrl: '', rating: 7.4 },
  { _id: 'static_14', tmdbId: 354912, title: 'Coco', genre: 'Animation', releaseYear: 2017, director: 'Lee Unkrich', description: 'Aspiring musician Miguel enters the Land of the Dead to find his great-great-grandfather.', thumbnail: 'https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg', trailerUrl: 'https://www.youtube.com/watch?v=Ga6RYejo6Hk', movieUrl: '', rating: 8.4 },
  { _id: 'static_15', tmdbId: 597, title: 'Titanic', genre: 'Drama', releaseYear: 1997, director: 'James Cameron', description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', thumbnail: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', trailerUrl: 'https://www.youtube.com/watch?v=2e-eXJ6HgkQ', movieUrl: '', rating: 7.9 },
  { _id: 'static_16', tmdbId: 475557, title: 'Joker', genre: 'Drama', releaseYear: 2019, director: 'Todd Phillips', description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.', thumbnail: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', trailerUrl: 'https://www.youtube.com/watch?v=zAGVQLHvwOY', movieUrl: '', rating: 8.2 },
  { _id: 'static_17', tmdbId: 420818, title: 'The Lion King', genre: 'Family', releaseYear: 2019, director: 'Jon Favreau', description: 'After the murder of his father, a young lion prince flees his kingdom.', thumbnail: 'https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg', trailerUrl: 'https://www.youtube.com/watch?v=7TavVZMewpY', movieUrl: '', rating: 6.8 },
  { _id: 'static_18', tmdbId: 155, title: 'The Dark Knight', genre: 'Crime', releaseYear: 2008, director: 'Christopher Nolan', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.', thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', trailerUrl: 'https://www.youtube.com/watch?v=EXeTwQWrcwY', movieUrl: '', rating: 9.0 },
  { _id: 'static_19', tmdbId: 27205, title: 'Inception', genre: 'Science Fiction', releaseYear: 2010, director: 'Christopher Nolan', description: 'A thief who steals corporate secrets through dream-sharing technology.', thumbnail: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', trailerUrl: 'https://www.youtube.com/watch?v=YoHD9XEInc0', movieUrl: '', rating: 8.8 },
  { _id: 'static_20', tmdbId: 274, title: 'The Shawshank Redemption', genre: 'Drama', releaseYear: 1994, director: 'Frank Darabont', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.', thumbnail: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', trailerUrl: 'https://www.youtube.com/watch?v=6hB3S9bIaco', movieUrl: '', rating: 9.3 }
];

// GET /api/movies - Fetch movies with fallback
router.get('/', async (req, res) => {
  try {
    let allMovies = [];
    
    // Try TMDB API first
    try {
      const response = await tmdbApi.get('/movie/popular', { params: { page: 1 }, timeout: 5000 });
      
      if (response.data && response.data.results) {
        const movies = response.data.results.map(movie => ({
          _id: `tmdb_${movie.id}`,
          tmdbId: movie.id,
          title: movie.title,
          genre: getGenreName(movie.genre_ids[0]),
          releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
          director: 'N/A',
          description: movie.overview || 'No description available',
          thumbnail: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image',
          trailerUrl: '',
          movieUrl: '',
          rating: movie.vote_average || 0
        }));
        allMovies = movies;
        console.log(`Fetched ${allMovies.length} movies from TMDB`);
      }
    } catch (tmdbError) {
      console.log('TMDB API failed, using static movies');
      allMovies = staticMovies;
    }
    
    // Remove duplicates and add static movies if TMDB failed
    if (allMovies.length === 0) {
      allMovies = staticMovies;
    } else {
      // Remove duplicates by title
      const uniqueMovies = new Map();
      [...allMovies, ...staticMovies].forEach(movie => {
        if (!uniqueMovies.has(movie.title)) {
          uniqueMovies.set(movie.title, movie);
        }
      });
      allMovies = Array.from(uniqueMovies.values());
    }
    
    res.json(allMovies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.json(staticMovies);
  }
});

// GET /api/movies/search - Search movies
router.get('/search', async (req, res) => {
  try {
    const { title } = req.query;
    const response = await tmdbApi.get('/search/movie', { params: { query: title } });
    
    if (response.data && response.data.results) {
      const movies = response.data.results.map(movie => ({
        _id: `tmdb_${movie.id}`,
        tmdbId: movie.id,
        title: movie.title,
        genre: getGenreName(movie.genre_ids[0]),
        releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
        director: 'N/A',
        description: movie.overview || 'No description available',
        thumbnail: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image',
        trailerUrl: '',
        movieUrl: '',
        rating: movie.vote_average || 0
      }));
      res.json(movies);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Error searching movies' });
  }
});

// GET /api/movies/:id - Fetch single movie
router.get('/:id', async (req, res) => {
  try {
    // Check if it's a static movie first
    const staticMovie = staticMovies.find(m => m._id === req.params.id);
    if (staticMovie) {
      return res.json(staticMovie);
    }
    
    // Try TMDB API
    const movieId = req.params.id.replace('tmdb_', '');
    const response = await tmdbApi.get(`/movie/${movieId}`, { timeout: 5000 });
    
    if (response.data) {
      const movie = response.data;
      const result = {
        _id: req.params.id,
        tmdbId: movie.id,
        title: movie.title,
        genre: movie.genres[0]?.name || 'Unknown',
        releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
        director: 'N/A',
        description: movie.overview || 'No description available',
        thumbnail: movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image',
        trailerUrl: '',
        movieUrl: '',
        rating: movie.vote_average || 0,
        runtime: movie.runtime
      };
      res.json(result);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ message: 'Error fetching movie details' });
  }
});

module.exports = router;