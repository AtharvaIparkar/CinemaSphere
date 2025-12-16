const mongoose = require('mongoose');
const Movie = require('./models/Movie');
require('dotenv').config();

const movies = [
  {
    title: "The Shawshank Redemption",
    genre: "Drama",
    releaseYear: 1994,
    director: "Frank Darabont",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=6hB3S9bIaco",
    movieUrl: "https://www.youtube.com/embed/6hB3S9bIaco"
  },
  {
    title: "The Godfather",
    genre: "Crime",
    releaseYear: 1972,
    director: "Francis Ford Coppola",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA",
    movieUrl: "https://www.youtube.com/embed/sY1S34973zA"
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    releaseYear: 2008,
    director: "Christopher Nolan",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    movieUrl: "https://www.youtube.com/embed/EXeTwQWrcwY"
  },
  {
    title: "Pulp Fiction",
    genre: "Crime",
    releaseYear: 1994,
    director: "Quentin Tarantino",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    movieUrl: "https://www.youtube.com/embed/s7EdQ4FqbhY"
  },
  {
    title: "Forrest Gump",
    genre: "Drama",
    releaseYear: 1994,
    director: "Robert Zemeckis",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg",
    movieUrl: "https://www.youtube.com/embed/bLvqoHBptjg"
  },
  {
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "Christopher Nolan",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnail: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    movieUrl: "https://www.youtube.com/embed/YoHD9XEInc0"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cinemasphere');
    await Movie.deleteMany({});
    await Movie.insertMany(movies);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();