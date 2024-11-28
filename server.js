const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routers/userRouter');
const mediaRoutes = require('./routers/mediaRouter');
//require('./cron/deleteExpiredMedia');


dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(mediaRoutes)

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT})`));