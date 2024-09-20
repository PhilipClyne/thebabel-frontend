import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookPage = () => {
  const [books, setBooks] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [formData, setFormData] = useState({
    bookTitle: "",
    authorName: "",
    isbn: "",
    publicationYear: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    img: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      setBooks(response.data);
    } catch (err) {
      setError("Error fetching books");
    }
  };

  const updateBook = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/books/${id}`, formData);
      fetchBooks();
      setEditingBookId(null); // Exit editing mode after update
    } catch (err) {
      setError("Error updating book");
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      setError("Error deleting book");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id); // Set the currently editing book's ID
    setFormData(book); // Pre-fill the form data with the selected book's info
  };

  const handleCancelEdit = () => {
    setEditingBookId(null); // Exit editing mode without saving
    setFormData({
      bookTitle: "",
      authorName: "",
      isbn: "",
      publicationYear: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
      img: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-brown-700 mb-6">Manage Books</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="min-w-full bg-white text-center shadow-lg rounded">
        <thead className="bg-brown-600 text-white">
          <tr>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Author</th>
            <th className="py-3 px-4">ISBN</th>
            <th className="py-3 px-4">Year</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Quantity</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-100">
              {editingBookId === book.id ? (
                <>
                  {/* Render input fields for inline editing */}
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="bookTitle"
                      value={formData.bookTitle}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      name="publicationYear"
                      value={formData.publicationYear}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="border p-2 rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => updateBook(book.id)}
                      className="bg-green-500 hover:bg-green-400 text-white py-1 px-3 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 hover:bg-gray-400 text-white py-1 px-3 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  {/* Render regular text when not editing */}
                  <td className="py-2 px-4 border-b">{book.bookTitle}</td>
                  <td className="py-2 px-4 border-b">{book.authorName}</td>
                  <td className="py-2 px-4 border-b">{book.isbn}</td>
                  <td className="py-2 px-4 border-b">{book.publicationYear}</td>
                  <td className="py-2 px-4 border-b">{book.category}</td>
                  <td className="py-2 px-4 border-b">{book.price}</td>
                  <td className="py-2 px-4 border-b">{book.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(book)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="bg-red-500 hover:bg-red-400 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookPage;
