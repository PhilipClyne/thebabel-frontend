import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        setBooks(response.data);
        const categoryList = [...new Set(response.data.map((book) => book.category))];
        setCategories(categoryList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) return <p className="text-center text-brown-600">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-4 bg-gradient-to-b from-white to-brown-100">
      {/* Category Filter */}
      <div className="mb-8 text-center">
        <label htmlFor="category" className="mr-4 font-semibold text-brown-700">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-brown-300 p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Featured Books Carousel */}
      <div className="my-12">
        <h3 className="text-3xl font-bold text-brown-700 text-center mb-8">
          Featured Books
        </h3>
        <Slider {...carouselSettings}>
          {filteredBooks.slice(0, 10).map((book) => (
            <div key={book.id} className="p-4">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out text-center transform hover:scale-105">
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
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Book List */}
      <div className="my-12">
        <h3 className="text-3xl font-bold text-brown-700 text-center mb-8">
          Explore Our Full Collection
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
          {filteredBooks.map((book) => (
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
    </div>
  );
}

export default Home;
