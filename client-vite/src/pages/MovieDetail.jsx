import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import axios from 'axios';
import Loading from '../components/Loading.jsx';

const MovieDetail = () => {
  const { id } = useParams();
  const { isSignedIn } = useUser();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`/api/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToPlayer = () => {
    document.getElementById('movie-player')?.scrollIntoView({ behavior: 'smooth' });
  };

  const changeServer = (serverUrl) => {
    const iframe = document.querySelector('#movie-player iframe');
    if (iframe) iframe.src = serverUrl;
  };

  const navigateHome = (e) => {
    e.preventDefault();
    window.location.href = '/';
    setTimeout(() => {
      document.getElementById('featured-collection')?.scrollIntoView({ behavior: 'smooth' });
    }, 5000);
  };

  if (loading) return <Loading />;
  if (!movie) return <div className="text-center text-white py-12">Movie not found</div>;

  // Component definitions
  const MetadataPill = ({ color, children }) => (
    <span className={`bg-${color}-600/20 border border-${color}-600/30 text-${color}-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-1`}>
      {children}
    </span>
  );

  const ServerButton = ({ onClick, color, children }) => (
    <button 
      onClick={onClick}
      className={`bg-${color}-600 text-white px-3 py-1 rounded text-sm hover:bg-${color}-700 transition-colors`}
    >
      {children}
    </button>
  );

  const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-slate-600/30 rounded-xl p-6 border border-slate-500/30">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="text-white font-medium">{title}</p>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Poster */}
        <div className="lg:col-span-1">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        {/* Movie Information */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          
          <div className="text-white space-y-6">
            {/* Metadata Pills */}
            <div className="flex flex-wrap gap-3">
              <MetadataPill color="orange">{movie.releaseYear}</MetadataPill>
              {movie.runtime && <MetadataPill color="blue">{movie.runtime} min</MetadataPill>}
              <MetadataPill color="purple">{movie.genre}</MetadataPill>
              {movie.rating && <MetadataPill color="yellow">⭐ {movie.rating.toFixed(1)}</MetadataPill>}
            </div>

            {/* Overview */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-200">Overview</h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl pb-5">
                {movie.description}
              </p>
            </div>

            {/* Watch Button */}
            {isSignedIn && (
              <div className="flex flex-wrap gap-4 pb-8">
                <button
                  onClick={scrollToPlayer}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7"/>
                  </svg>
                  Watch Now
                </button>
              </div>
            )}
          </div>

          {/* Movie Player */}
          {isSignedIn && (
            <div id="movie-player" className="bg-slate-800 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">🎬 Watch Full Movie</h3>
              <div className="aspect-video">
                <iframe
                  src={`https://multiembed.mov/?video_id=${movie.tmdbId || movie._id}&tmdb=1`}
                  title={`Watch ${movie.title}`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  referrerPolicy="origin"
                />
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <ServerButton 
                  onClick={() => changeServer(`https://multiembed.mov/?video_id=${movie.tmdbId || movie._id}&tmdb=1`)}
                  color="blue"
                >
                  Server 1
                </ServerButton>
                <ServerButton 
                  onClick={() => changeServer(`https://vidsrc.to/embed/movie/${movie.tmdbId || movie._id}`)}
                  color="green"
                >
                  Server 2
                </ServerButton>
                <ServerButton 
                  onClick={() => changeServer(`https://www.2embed.cc/embed/${movie.tmdbId || movie._id}`)}
                  color="purple"
                >
                  Server 3
                </ServerButton>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Try different servers if one doesn't work. Enjoying the movie? Add it to your watchlist!
              </p>
            </div>
          )}
          {/* Trailer Section */}
          {movie.trailerUrl && (
            <div className="bg-slate-800 rounded-xl p-4 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Watch Trailer</h3>
              <div className="aspect-video">
                <iframe
                  src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            </div>
          )}
          {/* Login Prompt */}
          {!isSignedIn && (
            <div className="bg-slate-800 py-6 rounded-xl">
              <div className="max-w-4xl mx-auto px-6">
                <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-600/50">
                  <div className="text-6xl mb-4">🎬</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Premium Streaming Experience</h3>
                  <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                    Login to stream {movie.title} and thousands of other movies instantly in HD quality
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <FeatureCard icon="✨" title="HD Quality" description="Crystal clear streaming" />
                    <FeatureCard icon="🚫" title="No Ads" description="Uninterrupted viewing" />
                    <FeatureCard icon="📱" title="Any Device" description="Watch anywhere" />
                  </div>
                  <SignInButton mode="modal">
                    <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      Start Watching Now
                    </button>
                  </SignInButton>
                </div>
              </div>
            </div>
          )}
          {/* Navigation */}
          <div className="py-8">
            <div className="px-0">
              <a
                href="/"
                onClick={navigateHome}
                className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium backdrop-blur-sm transition-all duration-300 inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Browse
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;