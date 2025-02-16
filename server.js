const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const contactUsRoutes = require('./routes/contactUs');

dotenv.config();

const app = express();

app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error: ', err);
});

// Simple route for testing
app.get('/', (req, res) => {
    res.send('The server is healthy');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Auth Routes
app.use('/api/auth', authRoutes);
// API Endpoint
app.use('/api/contact', contactUsRoutes);

