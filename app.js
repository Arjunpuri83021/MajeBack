const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('./router/router');
require('dotenv').config(); // Load environment variables

const app = express();

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database is connected');
  })
  .catch((error) => {
    console.log(error);
  });

// Apply CORS middleware before routes
app.use(cors());

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
