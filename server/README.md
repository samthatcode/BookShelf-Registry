# Bookshelf Registry Server

This is the server-side component of a bookshelf registry application built with Express and Node.js. It provides the backend API endpoints for managing a collection of books in a bookshelf.

## Features

- **RESTful API**: Provides a set of RESTful API endpoints for CRUD (Create, Read, Update, Delete) operations on books.
- **Middleware**: Utilizes Express middleware for parsing incoming requests, handling CORS, and serving static files in production.
- **Database Integration**: Connects to a database (e.g., MongoDB, PostgreSQL) for storing and retrieving book data.
- **Environment Configuration**: Uses dotenv to load environment variables from a .env file for configuring the server.

## Getting Started

To get started with the bookshelf registry server, follow these steps:

1. **Clone the Repository**:
   ```
   git clone https://github.com/samthatcode/BookShelf-Registry.git
   cd BookShelf-Registry/server
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory of the project.
   - Define the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/
     ```

4. **Start the Server**:
   ```
   npm start
   nodemon server.js
   ```

5. **API Documentation**:
   - Once the server is running, you can access the API documentation at `http://localhost:3000/api-docs` for detailed information on available endpoints and request/response formats.

## Dependencies

- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [Cors](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- [dotenv](https://www.npmjs.com/package/dotenv): Zero-dependency module for loading environment variables from a .env file.
- [Your Database Driver]: Database driver for connecting to and interacting with your chosen database (e.g., `mongoose` for MongoDB, `pg` for PostgreSQL).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README to fit the specific details and requirements of your bookshelf registry server-side application.

A book tracking application build with react, express, mongodb and Google book API. User have access to an entire library that offers book searching, bookshelf management and reading progress tracking.


Features
Without Google login: User can search books based on keywords and see the details of the books such as title, author, description...etc.
With Google login:
User have access to their own personal library that includes 4 default bookshelves: Favorites, Reading now, To read, and Have read, and a big "home book" spot at the top of the home page.
Bookshelf: user can add/move/remove book from any bookshelf.
Books in any bookshelf: user can add notes, write review or rate the book from 1 to 5.
Home book: once you set a book to be your homebook, you have access to a progress tracking slider and a textfield to let you write your thought on the book after today's reading.
Stack
Frontend: react, redux, javascripts, antd, material-ui, react-router-dom, react-rating, draft-js, react-draft-wysiwyg, data-fans

Backend: nodeJS, express

Database: mongoDB

API: Google books API

Installation (Update: Add Dockerfile)
Clone Repo


Create env file for Mongo db connection

cd app 
// at my-booktracker
touch .env
open .env
write “MONGO_URL=...(your mongo db database link)”
Install with docker

docker build -t "booktracker_react" .
docker-compose -f docker-compose.dev.yml up
Alternatively, you can install manually,

cd app
npm install
cd frontend
npm install
Start

// backend
npm start
//frontend
cd frontend
npm start
About
A book tracking application build with react, express, mongodb and Google book API. User have access to an entire library that offers book searching, bookshelf management and reading progress tracking.

Topics
react redux javascript express mongodb axios googlebooksapi booksearch
Resources
 Readme
 Activity
Stars
 22 stars
Watchers
 1 watching
Forks
 10 forks
Report repository
Languages
JavaScript
79.8%
 
HTML
19.2%
 
Other
1.0%
Footer
