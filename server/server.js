const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api/UserRoute');


const { connection } = require('./config/connection');

const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}


// Routes
app.use('/api/v1', apiRoutes);

// Start server
const startServer = async () => {
    try {
        await connection(); // Connect to database
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
