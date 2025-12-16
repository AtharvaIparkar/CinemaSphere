const axios = require('axios');
require('dotenv').config();

async function testTMDB() {
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = process.env.TMDB_BASE_URL;
  
  console.log('Testing TMDB API...');
  console.log('API Key:', API_KEY ? `${API_KEY.substring(0, 8)}...` : 'NOT FOUND');
  console.log('Base URL:', BASE_URL);
  
  try {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    console.log('Testing URL:', url);
    
    const response = await axios.get(url, { timeout: 10000 });
    
    console.log('✅ TMDB API working!');
    console.log('Status:', response.status);
    console.log('Movies found:', response.data.results?.length || 0);
    
    if (response.data.results && response.data.results.length > 0) {
      const movie = response.data.results[0];
      console.log('Sample movie:', {
        title: movie.title,
        year: movie.release_date?.substring(0, 4),
        rating: movie.vote_average
      });
    }
    
  } catch (error) {
    console.error('❌ TMDB API Error:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testTMDB();