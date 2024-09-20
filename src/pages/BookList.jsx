import { useEffect, useState } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null); // Quản lý trạng thái của sách đang chỉnh sửa
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
  }); // Dữ liệu của form chỉnh sửa

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
      setBooks(books.filter((book) => book.id !== id)); // Cập nhật danh sách sách sau khi xóa
    } catch (err) {
      console.error("Error deleting book:", err.message);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData(book); // Điền sẵn dữ liệu sách vào form để chỉnh sửa
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
      // Cập nhật lại danh sách sách sau khi chỉnh sửa
      setBooks(
        books.map((book) =>
          book.id === editingBook.id ? { ...book, ...formData } : book
        )
      );
      setEditingBook(null); // Đặt lại trạng thái chỉnh sửa
    } catch (err) {
      console.error("Error updating book:", err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-brown-700">Book List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <li key={book.id} className="p-4 border border-brown-300 rounded-lg">
            {/* Hiển thị hình ảnh của sách */}
            <img
              src={book.img}
              alt={`Cover of ${book.bookTitle}`}
              className="w-full h-48 object-cover mb-4"
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
            <button
              onClick={() => handleEdit(book)}
              className="bg-yellow-500 text-white p-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Hiển thị form chỉnh sửa nếu đang ở trạng thái chỉnh sửa */}
      {editingBook && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">
            Edit Book: {editingBook.title}
          </h3>
          <form>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Title"
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleFormChange}
              placeholder="Author"
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleFormChange}
              placeholder="ISBN"
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="number"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={handleFormChange}
              placeholder="Publication Year"
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleFormChange}
              placeholder="Category"
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              placeholder="Price"
              className="border p-2 mb-2 block w-full"
            />
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleFormChange}
              placeholder="Quantity"
              className="border p-2 mb-2 block w-full"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Description"
              className="border p-2 mb-2 block w-full"
            ></textarea>
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleFormChange}
              placeholder="Image URL"
              className="border p-2 mb-2 block w-full"
            />
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-green-500 text-white p-2 rounded"
            >
              Update Book
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookList;
