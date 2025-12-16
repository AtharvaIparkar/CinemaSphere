const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  director: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  trailerUrl: { type: String, required: true },
  movieUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);