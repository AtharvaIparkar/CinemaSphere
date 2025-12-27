# 🎬 CinemaSphere

> A modern, full-stack movie streaming platform built with the MERN stack

CinemaSphere is a comprehensive movie streaming application that provides users with an immersive cinema experience. Browse, search, and discover movies with a sleek, responsive interface powered by modern web technologies.

---

## 📋 Project Overview

CinemaSphere is designed for movie enthusiasts who want a seamless streaming experience. The platform combines powerful search capabilities, user authentication, and a beautiful interface to create the perfect movie discovery platform.

**Target Audience:** Movie lovers, streaming enthusiasts, and anyone looking for a modern movie browsing experience.

**Key Purpose:** Provide an intuitive platform for discovering, browsing, and managing movie collections with real-time search and personalized watchlists.

---

## ✨ Features

### 🔐 **User Authentication**
- Secure sign-in/sign-up with Clerk authentication
- Google OAuth integration
- Protected routes and user sessions
- Personalized user profiles

### 🎭 **Movie Browsing & Discovery**
- Browse extensive movie collections
- Real-time search functionality
- Filter by genre and source (TMDB, OMDB)
- Movie ratings and detailed information
- High-quality movie posters and thumbnails

### 📱 **Movie Details**
- Comprehensive movie information pages
- Movie trailers and streaming links
- Release year, director, and cast details
- User ratings and reviews

### 📚 **Watchlist Management**
- Add/remove movies from personal watchlist
- Persistent watchlist across sessions
- Quick access to saved movies

### 🎨 **Responsive UI/UX**
- Modern, dark-themed interface
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Intuitive navigation and search

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### **Authentication**
- **Clerk** - Complete authentication solution
- **JWT** - JSON Web Tokens for session management
- **bcryptjs** - Password hashing

### **External APIs**
- **TMDB API** - Movie database and information
- **OMDB API** - Additional movie metadata

### **Development Tools**
- **ESLint** - Code linting and formatting
- **Concurrently** - Run multiple commands simultaneously
- **Nodemon** - Auto-restart development server

---

## 📸 Screenshots / Demo

> **Note:** Screenshots will be added here to showcase the application's interface and features.

*Placeholder for:*
- Homepage with movie grid
- Movie detail page
- Search functionality
- User authentication flow
- Mobile responsive design

---

## 📁 Folder Structure

```
Movies App/
├── client-vite/              # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Page components (Home, Profile, etc.)
│   │   ├── context/          # React context for state management
│   │   └── assets/           # Static assets
│   └── public/               # Public assets
├── server/                   # Node.js backend application
│   ├── models/               # MongoDB data models
│   ├── routes/               # Express route handlers
│   ├── middleware/           # Custom middleware functions
│   └── services/             # Business logic services
├── .env.example              # Environment variables template
└── package.json              # Root package configuration
```

---

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# External APIs
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

# Server Configuration
NODE_ENV=development
PORT=4000
```

### 📝 **Environment Variables Explained:**
- `MONGODB_URI`: MongoDB connection string (MongoDB Atlas or local)
- `JWT_SECRET`: Secret key for JWT token generation
- `REACT_APP_CLERK_PUBLISHABLE_KEY`: Clerk authentication public key
- `TMDB_API_KEY`: The Movie Database API key for fetching movie data
- `NODE_ENV`: Application environment (development/production)
- `PORT`: Server port (default: 4000)

---

## 🚀 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB Atlas account or local MongoDB installation
- TMDB API account
- Clerk account for authentication

### **Step-by-Step Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Movies App"
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client-vite
   npm install
   cd ..
   ```

4. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your actual values
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

7. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:4000`
   - Frontend development server on `http://localhost:5173`

### **Production Build**
```bash
npm run build
npm start
```

---

## 🎯 Usage

### **Getting Started**
1. **Browse Movies**: Visit the homepage to explore the movie collection
2. **Search**: Use the search bar to find specific movies by title
3. **Filter**: Apply genre and source filters to narrow down results
4. **Sign In**: Create an account or sign in to access full features

### **User Features**
- **Movie Discovery**: Browse through curated movie collections
- **Detailed Information**: Click on any movie to view comprehensive details
- **Watchlist Management**: Sign in to add movies to your personal watchlist
- **Responsive Experience**: Enjoy seamless browsing on any device

### **Search & Filter**
- **Real-time Search**: Type in the search bar for instant results
- **Genre Filtering**: Filter movies by categories (Action, Comedy, Drama, etc.)
- **Source Filtering**: Filter by data source (TMDB, OMDB)
- **Combined Filters**: Use multiple filters simultaneously for precise results

---

## 🔮 Future Enhancements

### **Planned Features**
- 🎬 **Video Streaming**: Direct movie streaming capabilities
- 🤖 **AI Recommendations**: Personalized movie suggestions based on viewing history
- ⭐ **User Reviews**: Community-driven movie ratings and reviews
- 📱 **Mobile App**: Native iOS and Android applications
- 🔔 **Notifications**: New movie alerts and watchlist updates

### **Technical Improvements**
- 🚀 **Performance Optimization**: Implement lazy loading and caching
- 🔍 **Advanced Search**: Fuzzy search, filters by year, rating, cast
- 🎨 **Theme Customization**: Multiple UI themes and color schemes
- 📊 **Analytics Dashboard**: User engagement and movie popularity metrics
- 🌐 **Internationalization**: Multi-language support

---

## 🤝 Contributing

We welcome contributions to CinemaSphere! Here's how you can help:

### **How to Contribute**
1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### **Contribution Guidelines**
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation as needed
- Ensure all tests pass before submitting

### **Areas for Contribution**
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🧪 Test coverage expansion

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **TMDB** for providing comprehensive movie data
- **Clerk** for seamless authentication solutions
- **MongoDB** for reliable database services
- **Tailwind CSS** for beautiful, responsive styling
- **React Community** for excellent documentation and support

---

## 📞 Support

If you encounter any issues or have questions:

1. **Check existing issues** in the repository
2. **Create a new issue** with detailed information
3. **Join our community discussions**

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by the CinemaSphere team

</div>