const tmdbService = require('./services/tmdbService');
require('dotenv').config();

async function testFetchAllMovies() {
  console.log('=== Testing TMDB All Movies Fetch ===\n');
  
  try {
    // Test with a small number of pages first
    console.log('Testing with 5 pages...');
    const movies = await tmdbService.getAllMovies(5);
    
    console.log(`\n=== RESULTS ===`);
    console.log(`Total movies fetched: ${movies.length}`);
    console.log(`Expected: ~100 movies (5 pages × 20 movies per page)`);
    
    if (movies.length > 0) {
      console.log(`\nSample movie:`);
      console.log(`Title: ${movies[0].title}`);
      console.log(`Genre: ${movies[0].genre}`);
      console.log(`Year: ${movies[0].releaseYear}`);
      console.log(`Rating: ${movies[0].rating}`);
      console.log(`Popularity: ${movies[0].popularity}`);
    }
    
    // Show genre distribution
    const genreCount = {};
    movies.forEach(movie => {
      genreCount[movie.genre] = (genreCount[movie.genre] || 0) + 1;
    });
    
    console.log(`\nGenre distribution:`);
    Object.entries(genreCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([genre, count]) => {
        console.log(`${genre}: ${count} movies`);
      });
    
  } catch (error) {
    console.error('Error testing all movies fetch:', error);
  }
}

async function testAPIEndpoints() {
  console.log('\n=== Testing API Endpoints ===\n');
  
  const axios = require('axios');
  const baseURL = 'http://localhost:4000/api/movies';
  
  try {
    // Test regular movies endpoint
    console.log('Testing /api/movies...');
    const regularResponse = await axios.get(baseURL);
    console.log(`Regular endpoint returned ${regularResponse.data.length} movies`);
    
    // Test TMDB specific endpoint
    console.log('Testing /api/movies/tmdb?pages=3...');
    const tmdbResponse = await axios.get(`${baseURL}/tmdb?pages=3`);
    console.log(`TMDB endpoint returned ${tmdbResponse.data.length} movies`);
    
    // Test all movies endpoint (small test)
    console.log('Testing /api/movies/all?pages=2...');
    const allResponse = await axios.get(`${baseURL}/all?pages=2`);
    console.log(`All movies endpoint returned ${allResponse.data.totalMovies} movies`);
    
  } catch (error) {
    console.error('Error testing API endpoints:', error.message);
    console.log('Make sure the server is running with: npm run server');
  }
}

// Run tests
async function runTests() {
  await testFetchAllMovies();
  
  console.log('\n' + '='.repeat(50));
  console.log('To test API endpoints, start the server and run:');
  console.log('node testAllMovies.js --api');
  
  if (process.argv.includes('--api')) {
    await testAPIEndpoints();
  }
}

runTests();