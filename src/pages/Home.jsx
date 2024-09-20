import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";
// src/pages/Home.jsx
function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {/* Scroll Banner Section */}
      <div className="relative overflow-hidden">
        <div className="w-full h-64 bg-gradient-to-r from-brown-500 to-brown-300 text-white flex justify-center items-center text-center">
          <h2 className="text-3xl font-bold animate-fade-in">
            Welcome to The Babel Library!
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brown-700 animate-scroll-bar"></div>
      </div>

      {/* Video Introduction */}
      <div className="my-8">
        <h3 className="text-2xl font-bold text-brown-700 text-center mb-4">
          Introduction Video
        </h3>
        <div className="relative overflow-hidden rounded-lg shadow-lg max-w-3xl mx-auto">
          <iframe
            className="w-full h-64 md:h-96"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video link
            title="Library Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Book List */}
      <div className="my-8">
        <h3 className="text-2xl font-bold text-brown-700 text-center mb-6">
          Featured Books
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <li
              key={book.id}
              className="p-4 border border-brown-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-center"
            >
              <img
                src={book.img}
                alt={`Cover of ${book.title}`}
                className="w-full h-48 object-contain mb-4 rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-brown-600">
                {book.title}
              </h3>
              <p className="text-brown-500">Author: {book.author}</p>
              <p className="text-brown-400">
                Published Year: {book.publicationYear}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
