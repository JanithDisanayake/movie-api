const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();  // Load environment variables from .env file

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(require('./middlewares/authMiddleware'));

// Routes
app.use('/movies', require('./routes/movieRoutes'));

// Connect to MongoDB
const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
};

// Start the server
const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
