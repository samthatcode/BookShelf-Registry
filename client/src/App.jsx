import React, { useState, useEffect, useRef } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; 

function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const inputRef = useRef(null); // Ref to the input field

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        console.log("User data:", codeResponse);
        setUser(codeResponse);

        // Ensure that codeResponse.code is not undefined
        console.log("Authorization code:", codeResponse?.code);

        // Exchange the received code for an access token on the server
        const tokenResponse = await axios.get(
          `http://localhost:3000/oauth2callback?code=${codeResponse.code}`
        );
        console.log("Access Token:", tokenResponse.data.access_token);
      } catch (error) {
        console.error("Error exchanging code for access token:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading spinner when fetching data
      try {
        if (user) {
          // Fetch user profile using the access token obtained from the server
          const profileResponse = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
              headers: {
                Authorization: `Bearer ${user?.access_token}`,
                Accept: "application/json",
              },
            }
          );
          // Set profile state
          setProfile(profileResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading spinner when fetching is done
      }
    };

    fetchData();
  }, [user]);

  // Log out function to log the user out of Google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setUser(null);
    setProfile(null);
  };

  const BookSearch = () => {
    const handleSearch = async (e) => {
      e.preventDefault();
      setLoading(true); // Start loading spinner when fetching data
      setSearching(true);

      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/searchAll/${searchQuery}/0`
        );
        setBooks(response.data.data);
        setTotalResults(response.data.total);
      } catch (error) {
        console.error("Error searching for books:", error);
      } finally {
        setLoading(false); // Stop loading spinner when fetching is done
        setSearching(false);
      }
    };

    useEffect(() => {
      // Focus on the input field after each render
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });

    return (
      <div>
        <form onSubmit={handleSearch} className={`mb-4`}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a book title"
            className={`border border-gray-300 rounded px-4 py-2 mr-2`}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
            disabled={searching} // Disable button while searching
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </form>
        {loading && <FaSpinner className={`animate-spin flex justify-center items-center`}
        size={40}
        />}

        {books ? (
          <div>
            {totalResults > 0 && <h2>Total Results: {totalResults}</h2>}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4`}>
              {books.map((book) => (
                <div key={book.id} className={`border p-4 rounded`}>
                  <h3 className={`font-bold text-lg mb-2`}>
                    {book.volumeInfo.title}
                  </h3>
                  {book.volumeInfo.authors && (
                    <p className={`text-sm`}>
                      Authors: {book.volumeInfo.authors.join(", ")}
                    </p>
                  )}
                  {book.volumeInfo.publisher && (
                    <p className={`text-sm`}>
                      Publisher: {book.volumeInfo.publisher}
                    </p>
                  )}
                  {book.volumeInfo.publishedDate && (
                    <p className={`text-sm`}>
                      Published Date: {book.volumeInfo.publishedDate}
                    </p>
                  )}
                  {book.volumeInfo.description && (
                    <p className={`text-sm truncate`}>
                      {book.volumeInfo.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No books found</p>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-100 flex direction-row`}>
      <div className={`bg-white p-8 rounded shadow-lg`}>
        <h2 className={`text-2xl font-bold mb-4`}>React Google Login</h2>

        <br />
        <br />
        {profile ? (
          <div>
            <img
              src={profile.picture}
              alt="user image"
              className={`w-20 h-20 rounded-full mx-auto`}
            />
            <h3 className={`text-xl font-semibold mt-4`}>User Logged in</h3>
            <p className={`mt-2`}>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button
              onClick={logOut}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
            >
              Log out
            </button>
            <BookSearch />
          </div>
        ) : (
          <button
            onClick={login}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
          >
            Sign in with Google 🚀
          </button>
        )}
      </div>
      <BookSearch />
    </div>
  );
}
export default App;
