import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-brown-700 mb-4">Manage Users</h2>
      <table className="min-w-full bg-white text-center">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-300">Name</th>
            <th className="py-2 px-4 border-b border-gray-300">Email</th>
            <th className="py-2 px-4 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-yellow-500 text-white py-1 px-3 rounded mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded">
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

export default AdminUserPage;
