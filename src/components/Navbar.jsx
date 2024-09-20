// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-brown-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">The Babel Library</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:bg-brown-600 px-3 py-1 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" className="hover:bg-brown-600 px-3 py-1 rounded">
              Books
            </Link>
          </li>
          <li>
            <Link to="/admin" className="hover:bg-brown-600 px-3 py-1 rounded">
              Admin
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:bg-brown-600 px-3 py-1 rounded">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:bg-brown-600 px-3 py-1 rounded"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
