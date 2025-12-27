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

  // Fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies when search term or filters change
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
    } finally {
      setLoading(false);
    }
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

  const FilterButton = ({ active, onClick, children, color = 'orange' }) => (
    <button
      onClick={onClick}
      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
        active
          ? `bg-${color}-600 text-white shadow-lg transform scale-105 border-2 border-orange-400`
          : 'bg-white text-slate-600 hover:bg-gray-50 hover:text-orange-600 shadow-md hover:shadow-lg border-2 border-transparent hover:border-orange-300'
      }`}
    >
      {children}
    </button>
  );

  const EmptyState = ({ icon, title, subtitle }) => (
    <div className="text-center text-slate-400 py-16 sm:py-20">
      <div className="text-4xl sm:text-6xl mb-4">{icon}</div>
      <p className="text-xl sm:text-2xl font-medium text-white mb-2">{title}</p>
      <p className="text-base sm:text-lg text-slate-300">{subtitle}</p>
    </div>
  );

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-900">
      
      {/* Search Results Section */}
      {searchTerm && (
        <div className="pt-20 sm:pt-28 pb-8 sm:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                Search Results for "{searchTerm}"
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                {filteredMovies.length} movies found
              </p>
            </div>
            
            {filteredMovies.length === 0 ? (
              <EmptyState 
                icon="🔍"
                title="No movies found"
                subtitle="Try searching with different keywords"
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
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
        <div className="relative min-h-screen flex items-center bg-gradient-to-br from-orange-600 via-orange-700 to-red-700 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              
              {/* Hero Content */}
              <div className="text-white text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6">
                  WHERE FUNCTIONALITY MEETS ELEGANCE
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-orange-100 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Discover a curated collection of entertainment that combines style, comfort, and functionality for every space.
                </p>
                <button 
                  onClick={() => document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-3 bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  EXPLORE NOW
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              
              {/* Hero Visual */}
              <div className="relative mt-8 lg:mt-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-4xl sm:text-6xl mb-4">🎬</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">Premium Streaming</h3>
                    <p className="text-orange-100 text-sm sm:text-base">Experience cinema-quality entertainment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Collection Section */}
      {!searchTerm && (
        <div id="featured-collection" className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Featured Collection
              </h2>
              <p className="text-lg sm:text-xl text-slate-300">
                Handpicked entertainment for every taste
              </p>
            </div>

            {/* Source Filter */}
            {sources.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <span className="text-white font-medium px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
                  Filter by Source:
                </span>
                <FilterButton
                  active={selectedSource === ''}
                  onClick={() => setSelectedSource('')}
                  color="purple"
                >
                  All Sources
                </FilterButton>
                {sources.map(source => (
                  <FilterButton
                    key={source}
                    active={selectedSource === source}
                    onClick={() => setSelectedSource(source)}
                    color={source === 'TMDB' ? 'blue' : source === 'OMDB' ? 'yellow' : 'green'}
                  >
                    {source}
                  </FilterButton>
                ))}
              </div>
            )}

            {/* Genre Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
              <span className="text-white font-medium px-2 sm:px-4 py-2 sm:py-3 text-sm sm:text-base">
                Filter by Genre:
              </span>
              <FilterButton
                active={selectedGenre === ''}
                onClick={() => setSelectedGenre('')}
              >
                All Categories
              </FilterButton>
              {genres.map(genre => (
                <FilterButton
                  key={genre}
                  active={selectedGenre === genre}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </FilterButton>
              ))}
            </div>

            {/* Movies Grid */}
            {filteredMovies.length === 0 ? (
              <EmptyState 
                icon="🔍"
                title="No items found"
                subtitle="Try adjusting your search criteria"
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
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