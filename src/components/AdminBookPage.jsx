import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBookPage = () => {
  const [books, setBooks] = useState([]);
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
  const [editingBookId, setEditingBookId] = useState(null);
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

  const addBook = async () => {
    try {
      await axios.post("http://localhost:8080/api/books", formData);
      fetchBooks();
      resetForm();
    } catch (err) {
      setError("Error adding book");
    }
  };

  const updateBook = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/books/${editingBookId}`,
        formData
      );
      fetchBooks();
      resetForm();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBookId) {
      updateBook();
    } else {
      addBook();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (book) => {
    setEditingBookId(book.id);
    setFormData(book);
  };

  const resetForm = () => {
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
    setEditingBookId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-brown-700 mb-6">Manage Books</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg mb-8"
      >
        <div className="grid text-center grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="bookTitle"
            value={formData.bookTitle}
            onChange={handleInputChange}
            placeholder="Book Title"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="authorName"
            value={formData.authorName}
            onChange={handleInputChange}
            placeholder="Author Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleInputChange}
            placeholder="ISBN"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="publicationYear"
            value={formData.publicationYear}
            onChange={handleInputChange}
            placeholder="Publication Year"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-brown-600 hover:bg-brown-500 text-white py-2 px-4 rounded"
        >
          {editingBookId ? "Update Book" : "Add Book"}
        </button>
      </form>

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookPage;
