import { useEffect, useState } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publicationYear: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    img: "",
  });

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get("http://localhost:8080/api/books");
        const sortedBooks = response.data.sort(
          (a, b) => b.publicationYear - a.publicationYear
        );
        setBooks(sortedBooks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (err) {
      console.error("Error deleting book:", err.message);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData(book);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/books/${editingBook.id}`,
        formData
      );
      setBooks(
        books.map((book) =>
          book.id === editingBook.id ? { ...book, ...formData } : book
        )
      );
      setEditingBook(null);
    } catch (err) {
      console.error("Error updating book:", err.message);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-brown-700 mb-6">Book List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <li
            key={book.id}
            className="bg-white p-4 border border-brown-300 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={book.img}
              alt={`Cover of ${book.title}`}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold text-brown-600">
              {book.title}
            </h3>
            <p className="text-brown-500">Author: {book.authorName}</p>
            <p className="text-brown-400">
              Published Year: {book.publicationYear}
            </p>
            <p className="text-brown-400">Category: {book.category}</p>
            <p className="text-brown-400">Price: ${book.price}</p>
            <p className="text-brown-400">Quantity: {book.quantity}</p>
            <p className="text-brown-400">Description: {book.description}</p>
            <div className="mt-4 items-center">
              <button className="bg-yellow-500 text-white p-2 rounded mr-2 hover:bg-yellow-600 transition">
                Buy
              </button>
              <button className="bg-orange-500 text-white p-2 rounded hover:bg-red-600 transition">
                Read Online
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
