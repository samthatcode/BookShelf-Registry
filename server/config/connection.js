// connection.js

const mongoose = require('mongoose');
require('dotenv').config();

// Set mongoose options
mongoose.set('strictQuery', false);

const MONGODB_URI = process.env.MONGODB_URI;

// Function to connect to MongoDB with retry logic
const connectWithRetry = async () => {
    let timeout = 25;
    while (mongoose.connection.readyState === 0) {
        if (timeout === 0) {
            console.log('timeout');
            throw new Error('timeout occurred with mongoose connection');
        }
        try {
            await mongoose.connect(MONGODB_URI || 'mongodb://localhost/googlebooks', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to the database. Success!!');
        } catch (error) {
            console.error('Error connecting to MongoDB database:', error);
            timeout--;
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        }
    }
};

// Export the connection function
module.exports = { connectWithRetry };
