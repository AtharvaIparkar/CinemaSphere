import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard.jsx';
import Loading from '../components/Loading.jsx';

const Home = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [searchTerm, selectedGenre, selectedSource, movies]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('/api/movies');
      setMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };

  const filterMovies = () => {
    let filtered = movies;

    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    if (selectedSource) {
      filtered = filtered.filter(movie => movie.source === selectedSource);
    }

    setFilteredMovies(filtered);
  };

  const genres = [...new Set(movies.map(movie => movie.genre))];
  const sources = [...new Set(movies.map(movie => movie.source).filter(Boolean))];

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen">
      {/* Search Results Section */}
      {searchTerm && (
        <div className="bg-slate-900 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Search Results for "{searchTerm}"</h2>
              <p className="text-slate-300">{filteredMovies.length} movies found</p>
            </div>
            
            {filteredMovies.length === 0 ? (
              <div className="text-center text-slate-400 py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-2xl font-medium text-white">No movies found</p>
                <p className="text-lg text-slate-300">Try searching with different keywords</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      {!searchTerm && (
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-white">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              WHERE FUNCTIONALITY MEETS ELEGANCE.
            </h1>
            <p className="text-xl lg:text-2xl text-orange-100 mb-8 leading-relaxed">
              Discover a curated collection of entertainment that combines style, comfort, and functionality for every space.
            </p>
            <button 
              onClick={() => document.getElementById('featured-collection').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              EXPLORE NOW
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-2xl font-bold mb-2">Premium Streaming</h3>
                <p className="text-orange-100">Experience cinema-quality entertainment</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Movies Section */}
      {!searchTerm && (
        <div id="featured-collection" className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-500 mb-4">Featured Collection</h2>
            <p className="text-xl text-slate-600">Handpicked entertainment for every taste</p>
          </div>
          
          {/* API Source Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="text-white font-medium px-4 py-3">Filter by Source:</span>
            <button
              onClick={() => setSelectedSource('')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedSource === '' 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-purple-50 hover:text-purple-600 shadow-md'
              }`}
            >
              All Sources
            </button>
            {sources.map(source => (
              <button
                key={source}
                onClick={() => setSelectedSource(source)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedSource === source 
                    ? (source === 'TMDB' ? 'bg-blue-600 text-white shadow-lg' 
                       : source === 'OMDB' ? 'bg-yellow-600 text-white shadow-lg'
                       : 'bg-green-600 text-white shadow-lg')
                    : 'bg-white text-slate-600 hover:bg-gray-50 shadow-md'
                }`}
              >
                {source}
              </button>
            ))}
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="text-white font-medium px-4 py-3">Filter by Genre:</span>
            <button
              onClick={() => setSelectedGenre('')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedGenre === '' 
                  ? 'bg-orange-600 text-white shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 shadow-md'
              }`}
            >
              All Categories
            </button>
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedGenre === genre 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 shadow-md'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {filteredMovies.length === 0 ? (
            <div className="text-center text-slate-500 py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl font-medium">No items found</p>
              <p className="text-lg">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMovies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;