import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";

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

  if (loading) return <p className="text-center text-brown-600">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-4 bg-gradient-to-b from-white to-brown-100">
      {/* Scroll Banner Section */}
      <div className="relative overflow-hidden mb-8">
        <div className="w-full h-64 bg-gradient-to-r from-brown-500 to-brown-300 text-white flex justify-center items-center text-center">
          <h2 className="text-4xl font-bold animate-fade-in">
            Welcome to The Babel Library!
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brown-700 animate-scroll-bar"></div>
      </div>

      {/* Video Introduction */}
      <div className="my-8 max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-brown-700 text-center mb-4">
          Get to Know Us Better
        </h3>
        <div className="relative overflow-hidden rounded-lg shadow-2xl max-w-4xl mx-auto">
          <iframe
            className="w-full h-64 md:h-96 rounded-md"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your video link
            title="Library Introduction"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Featured Book List */}
      <div className="my-12">
        <h3 className="text-3xl font-bold text-brown-700 text-center mb-8">
          Explore Our Featured Books
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
          {books.map((book) => (
            <li
              key={book.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out text-center transform hover:scale-105"
            >
              <img
                src={book.img}
                alt={`Cover of ${book.title}`}
                className="w-full h-64 object-cover mb-4 rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-brown-600 mb-2">
                {book.title}
              </h3>
              <p className="text-brown-500 mb-1">{book.bookTitle}</p>
              <p className="text-brown-400">Year: {book.publicationYear}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer Section */}
      <div className="bg-brown-700 text-white text-center py-8">
        <p className="text-lg">
          © 2024 The Babel Library - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Home;
