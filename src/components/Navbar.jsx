import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-brown-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-white hover:text-brown-300 transition-colors">
          <Link to="/">The Babel Library</Link>
        </div>

        {/* Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              Books
            </Link>
          </li>
          <li>
            <Link
              to="/open"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              Search online
            </Link>
          </li>
          <li>
            <Link
              to="/admin"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              Admin
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/Register"
              className="hover:bg-brown-700 px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
