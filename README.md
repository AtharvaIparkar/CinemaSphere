# CinemaSphere - MERN Stack Movie Streaming Platform

A full-stack movie streaming website built with MongoDB, Express.js, React, and Node.js.

## Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Movie Browsing**: Browse movies with thumbnails and details
- **Search Functionality**: Real-time search by movie title
- **Genre Filtering**: Filter movies by genre
- **Movie Details**: Detailed movie pages with trailers and streaming
- **Watchlist**: Add movies to personal watchlist (authenticated users)
- **Responsive Design**: Modern UI with Tailwind CSS

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Project Structure

```
Movies App/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   │   └── App.js          # Main app component
├── models/                 # MongoDB models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── server.js              # Express server
├── seedData.js            # Database seeding script
└── package.json           # Dependencies and scripts
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Movies App"
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. **Seed the database**
   ```bash
   node seedData.js
   ```

6. **Run the application**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 5000) and React development server (port 3000).

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie by ID
- `GET /api/movies/search?title=...` - Search movies by title

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `POST /api/users/watchlist/:movieId` - Add movie to watchlist (protected)

## Database Schema

### Movie Model
```javascript
{
  title: String (required),
  genre: String (required),
  releaseYear: Number (required),
  director: String (required),
  description: String (required),
  thumbnail: String (required),
  trailerUrl: String (required),
  movieUrl: String (required)
}
```

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  watchlist: [ObjectId] (references Movie)
}
```

## Deployment

### For Replit:
1. Import this project to Replit
2. Set environment variables in Replit Secrets:
   - `MONGODB_URI`
   - `JWT_SECRET`
3. Run `npm install` in the shell
4. Run `cd client && npm install` in the shell
5. Run `npm run build` to build the React app
6. Click the "Run" button

### For Production:
1. Build the React app: `cd client && npm run build`
2. Set `NODE_ENV=production`
3. Deploy to your preferred hosting platform (Heroku, Vercel, etc.)

## Usage

1. **Browse Movies**: Visit the home page to see all available movies
2. **Search**: Use the search bar to find specific movies
3. **Filter**: Click genre buttons to filter movies by category
4. **Register/Login**: Create an account or login to access full features
5. **Watch Movies**: Click on a movie to view details and watch (login required)
6. **Watchlist**: Add movies to your personal watchlist

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.