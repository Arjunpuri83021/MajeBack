const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('./router/router');
require('dotenv').config(); // Load environment variables
const http = require('http');
const app = express();

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database is connected');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Apply CORS middleware before routes
app.use(cors({
  origin: 'https://majefront-1.onrender.com', // Allow requests from this origin
}));




const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Your route logic here
});

// Middleware to parse JSON and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the uploads directory
app.use(express.static('./public/uploads'));

// Use your API router
app.use(apiRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
