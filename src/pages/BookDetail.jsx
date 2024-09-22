import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function BookDetail() {
  const { id } = useParams(); // Lấy ID từ URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org/works/${id}.json`
        );
        setBook(response.data);
      } catch (err) {
        setError("Không tìm thấy thông tin sách.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <p>Tác giả: {book.authors ? book.authors.map(author => author.name).join(", ") : "Không có thông tin"}</p>
      <p>Miêu tả: {book.description ? book.description.value : "Không có miêu tả"}</p>

      {/* Nút dẫn đến đọc sách online nếu có */}
      {book.ebook_count_i > 0 && (
        <a
          href={`https://openlibrary.org/works/${id}/read`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Đọc sách online
        </a>
      )}
    </div>
  );
}

export default BookDetail;
