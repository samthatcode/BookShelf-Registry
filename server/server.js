const express = require('express');
const cors = require('cors');
require('dotenv').config();

// const path = require('path');
const { OAuth2Client } = require('google-auth-library');
const UserRoute = require('./routes/api/UserRoute');
const apiRoute = require('./routes/api/ApiRoute');

const { connectWithRetry } = require('./config/connection');
// Retrieve client id and client secret from environment variables
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    cors({
        origin: ["https://bookshelf-registry.onrender.com", "https://bookshelf-registry-backend-server.onrender.com"],
        // origin: ["http://localhost:5173", "http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Define your Google OAuth2Client
const oauth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    // `http://localhost:3000/oauth2callback`
    `https://bookshelf-registry-backend-server.onrender.com/oauth2callback`

);

// Redirect users to Google OAuth authentication
app.get('/', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/books'], // Adjust scopes as needed
    });
    res.redirect(url);
});

// Callback route for handling OAuth response from Google
app.get('/oauth2callback', async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange authorization code for access token
        const { tokens } = await oauth2Client.getToken(code);
        // Do something with the tokens, like store them for future API calls
        // tokens contains access_token, refresh_token, and expiry_date

        // Set credentials for further API calls
        oauth2Client.setCredentials(tokens);     
        console.log(tokens);

        // Check if the access token is expiring soon
        if (oauth2Client.isTokenExpiring()) {
            const { credentials } = await oauth2Client.refreshAccessToken();
            oauth2Client.setCredentials(credentials);
        }

        // Return the access token to the client
        // res.json({ access_token: tokens.access_token });

        // Redirect or respond as needed
        res.send('Successfully authenticated with Google Books API !!!');
    } catch (error) {
        console.error('Error retrieving access token:', error);
        res.status(500).send('Error retrieving access token'); 
    }
});

// https://www.googleapis.com/books/v1/volumes   
// Routes
app.use('/api/v1', UserRoute);
app.use('/api/v1', apiRoute);


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/term-of-use', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/term-of-use.html'));
});

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/privacy-policy.html'));
});

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../client/build')}); 
});


// Start server
const startServer = async () => {
    try {
        await connectWithRetry(); // Connect to database
        app.listen(PORT, () => {
            console.log(`🌍 Now listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1); // Exit the process if connection fails
    }
};

startServer();
