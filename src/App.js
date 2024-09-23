// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookList from "./pages/BookList";
import AdminBookPage from "./components/AdminBookPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUserPage from "./components/AdminUserPage";
import LoginPage from "./pages/LoginPage";
import OpenLibrarySearch from "./pages/OpenLibrarySearch";
import BookDetail from "./pages/BookDetail";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/open" element={<OpenLibrarySearch />} />
          <Route path="/book/:id" element={<BookDetail />} />{" "}
          {/* Route cho chi tiết sách */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/admin/books" element={<AdminBookPage />} />
          <Route path="/admin/users" element={<AdminUserPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
