import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="h-screen bg-brown-600 text-white w-64 flex flex-col">
      <div className="p-6 text-3xl font-bold border-b border-brown-700">
        Admin Dashboard
      </div>
      <nav className="flex-grow">
        <ul className="p-4 space-y-4">
          <li>
            <Link
              to="/admin/books"
              className="block py-2 px-4 hover:bg-brown-500 rounded"
            >
              Manage Books
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block py-2 px-4 hover:bg-brown-500 rounded"
            >
              Manage Users
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
