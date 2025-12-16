import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
        <div className="relative">
          <img
            src={movie.thumbnail}
            alt={movie.title}
            className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <div className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold shadow-lg">
              ▶ Watch Now
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {movie.rating && (
              <div className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ {movie.rating.toFixed(1)}
              </div>
            )}
            {movie.source && (
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                movie.source === 'TMDB' 
                  ? 'bg-blue-500 text-white' 
                  : movie.source === 'OMDB'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-green-500 text-white'
              }`}>
                {movie.source}
              </div>
            )}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-800 mb-2 truncate group-hover:text-orange-600 transition-colors">{movie.title}</h3>
          <p className="text-slate-500 text-sm mb-3 font-medium">{movie.genre} • {movie.releaseYear}</p>
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{movie.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm text-emerald-600 font-semibold">
                🎬 Stream Ready
              </div>
              {movie.source && (
                <div className={`text-xs px-2 py-1 rounded font-medium ${
                  movie.source === 'TMDB' 
                    ? 'bg-blue-100 text-blue-700' 
                    : movie.source === 'OMDB'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {movie.source}
                </div>
              )}
            </div>
            <div className="text-orange-600 group-hover:translate-x-1 transition-transform duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;