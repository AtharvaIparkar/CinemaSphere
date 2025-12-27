import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={`/movie/${movie._id}`} className="group block h-full">
      <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/50 h-full flex flex-col">
        {/* Movie Poster */}
        <div className="relative aspect-[2.5/3] overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <img
            src={imageError ? 'https://via.placeholder.com/400x600/1f2937/9ca3af?text=No+Image' : movie.thumbnail}
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Rating Badge */}
          {movie.rating && (
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{movie.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <div className="bg-white/85 backdrop-blur-xl text-orange-600 px-6 py-3 rounded-full font-bold shadow-lg">
              ▶ Watch Now
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 group-hover:text-red-400 transition-colors duration-200">
            {movie.title}
          </h3>

          {/* Genre & Year */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 font-medium">{movie.genre}</span>
            <span className="text-gray-500">{movie.releaseYear}</span>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed flex-1">
            {movie.description}
          </p>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-2 mt-auto">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-semibold">Available</span>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl ring-2 ring-red-600/0 group-hover:ring-red-600/50 transition-all duration-300 pointer-events-none"></div>
      </div>
    </Link>
  );
};

export default MovieCard;