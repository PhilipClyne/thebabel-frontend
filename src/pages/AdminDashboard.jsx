import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
    </div>
  );
};

export default AdminDashboard;
