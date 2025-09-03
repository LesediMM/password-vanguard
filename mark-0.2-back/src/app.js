const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ CORS Configuration for Production
const allowedOrigins = [
  'http://localhost:3000', // Your local frontend
  'https://password-vanguard.onrender.com' // Your live frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));


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

