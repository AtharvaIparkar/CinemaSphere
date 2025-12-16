import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import axios from 'axios';
import Loading from '../components/Loading.jsx';

const MovieDetail = () => {
  const { id } = useParams();
  const { isSignedIn, user } = useUser();
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
    }
    setLoading(false);
  };

  const addToWatchlist = async () => {
    try {
      await axios.post(`/api/users/watchlist/${id}`);
      alert('Added to watchlist!');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  if (loading) return <Loading />;
  if (!movie) return <div className="text-center text-white py-12">Movie not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">{movie.genre}</span>
            <span className="text-gray-400">{movie.releaseYear}</span>
          </div>
          
          <p className="text-gray-300 text-lg mb-6">{movie.description}</p>
          
          <div className="flex items-center space-x-4 mb-6">
            {movie.rating && (
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-white">{movie.rating.toFixed(1)}</span>
              </div>
            )}
            {movie.runtime && (
              <span className="text-gray-400">{movie.runtime} min</span>
            )}
          </div>
          
          <div className="flex space-x-4 mb-8">
            {isSignedIn && (
              <>
                <button
                  onClick={() => document.getElementById('movie-player').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  ▶ Watch Now
                </button>
                <button
                  onClick={addToWatchlist}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  + Watchlist
                </button>
              </>
            )}
          </div>
          
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
                ></iframe>
              </div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <button 
                  onClick={() => document.querySelector('#movie-player iframe').src = `https://multiembed.mov/?video_id=${movie.tmdbId || movie._id}&tmdb=1`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Server 1
                </button>
                <button 
                  onClick={() => document.querySelector('#movie-player iframe').src = `https://vidsrc.to/embed/movie/${movie.tmdbId || movie._id}`}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Server 2
                </button>
                <button 
                  onClick={() => document.querySelector('#movie-player iframe').src = `https://www.2embed.cc/embed/${movie.tmdbId || movie._id}`}
                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
                >
                  Server 3
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2">Try different servers if one doesn't work. Enjoying the movie? Add it to your watchlist!</p>
            </div>
          )}
          
          {movie.trailerUrl && (
            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Watch Trailer</h3>
              <div className="aspect-video">
                <iframe
                  src={movie.trailerUrl.replace('watch?v=', 'embed/')}
                  title={`${movie.title} Trailer`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          
          {!isSignedIn && (
            <div className="bg-slate-800 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-4">🎬 Watch Full Movie</h3>
              <p className="text-gray-400 mb-4">Login to stream {movie.title} and thousands of other movies instantly</p>
              <div className="bg-slate-700 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-300">✓ HD Quality Streaming</p>
                <p className="text-sm text-gray-300">✓ No Ads</p>
                <p className="text-sm text-gray-300">✓ Personal Watchlist</p>
              </div>
              <SignInButton mode="modal">
                <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                  Start Watching Now
                </button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;