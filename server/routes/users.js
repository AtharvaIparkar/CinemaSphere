const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const router = express.Router();

// Temporary user storage
let tempUsers = [];
let userIdCounter = 1;

// User model simulation
const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = {
    _id: userIdCounter++,
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
    watchlist: [],
    createdAt: new Date()
  };
  tempUsers.push(user);
  return user;
};

const findUserByEmail = (email) => {
  return tempUsers.find(user => user.email === email);
};

const findUserByUsername = (username) => {
  return tempUsers.find(user => user.username === username);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = findUserByEmail(email) || findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await createUser({ username, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = findUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
    
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/users/profile
router.get('/profile', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = tempUsers.find(u => u._id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ id: user._id, username: user.username, email: user.email, createdAt: user.createdAt });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// POST /api/users/watchlist/:movieId
router.post('/watchlist/:movieId', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    const user = tempUsers.find(u => u._id === decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.watchlist.includes(req.params.movieId)) {
      user.watchlist.push(req.params.movieId);
    }
    res.json({ message: 'Added to watchlist' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;