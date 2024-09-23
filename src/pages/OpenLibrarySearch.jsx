import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function OpenLibrarySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState(""); // State để lưu trữ thể loại

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Fantasy",
    "Mystery",
    "Biography",
    "Children",
  ];

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      let url = `https://openlibrary.org/search.json?q=${searchTerm}`;
      if (genre) {
        url += `&subject=${genre}`; // Thêm thể loại vào URL nếu có
      }

      const response = await axios.get(url);
      setBooks(response.data.docs);
      console.log(response.data.docs); // In ra tất cả các sản phẩm
    } catch (err) {
      setError("Có lỗi xảy ra khi tìm kiếm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white to-brown-100 min-h-screen">
      <h1 className="text-4xl font-bold text-brown-700 text-center mb-12">
        Tìm kiếm sách từ OpenLibrary
      </h1>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm..."
          className="border border-brown-300 p-3 rounded-md mr-4 w-1/2 shadow-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-brown-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-brown-600 transition-transform transform hover:scale-105"
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>
      </div>

      {/* Lọc thể loại */}
      <div className="mb-6">
        <label className="block mb-2 text-brown-700">Lọc theo thể loại</label>
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border border-brown-300 p-2 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
        >
          <option value="">Tất cả thể loại</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Thông báo đang tải hoặc lỗi */}
      {loading && <p className="text-center text-brown-600">Đang tải...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Danh sách sách */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
        {books.map((book) => (
          <div
            key={book.key}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out text-center transform hover:scale-105 relative"
          >
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "https://via.placeholder.com/150?text=No+Cover"
              }
              alt={`Cover of ${book.title}`}
              className="w-full h-64 object-cover mb-4 rounded-lg transition-transform duration-300 hover:scale-110"
            />
            <h3 className="text-xl font-semibold text-brown-600 mb-2">
              {book.title}
            </h3>
            <p className="text-brown-500 mb-2 h-16 overflow-y-auto">
              Tác giả:{" "}
              {book.author_name
                ? book.author_name.join(", ")
                : "Không có thông tin"}
            </p>
            <p className="text-brown-400 mb-4">
              Năm xuất bản: {book.first_publish_year || "Không có thông tin"}
            </p>
            <Link
              to={`/book/${book.key.split("/")[2]}`} // Cập nhật đường dẫn để lấy ID
              className="bg-brown-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-brown-700 transition-colors duration-200"
            >
              Xem chi tiết
            </Link>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-16 bg-brown-700 text-white text-center py-6">
        <p className="text-lg">
          © 2024 Thư viện OpenLibrary - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default OpenLibrarySearch;
