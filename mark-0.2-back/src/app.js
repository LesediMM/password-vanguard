const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); // ✅ import routes

const app = express();

// Enable CORS for development
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// ✅ Auth routes
app.use("/api", authRoutes);

// Serve React build in production
app.use(express.static(path.join(__dirname, '../../mark-0.2-front/build')));

// ✅ Test route for front-end connection
app.get('/api/ping', (req, res) => {
  res.send('Connected to backend');
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../mark-0.2-front/build/index.html'));
});

module.exports = app;
