import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted", formData);
  };

  return (
    <div className="p-4 bg-gradient-to-b from-white to-brown-100">
      {/* Contact Banner Section */}
      <div className="relative overflow-hidden mb-8">
        <div className="w-full h-64 bg-gradient-to-r from-brown-500 to-brown-300 text-white flex justify-center items-center text-center">
          <h2 className="text-4xl font-bold">Contact Us</h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brown-700 animate-scroll-bar"></div>
      </div>

      {/* Contact Form */}
      <div className="my-8 max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-brown-700 text-center mb-4">
          Get In Touch
        </h3>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-brown-600 text-lg mb-2" htmlFor="name">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-brown-600 text-lg mb-2" htmlFor="email">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-brown-600 text-lg mb-2" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-brown-300 rounded-md"
              rows="6"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-brown-500 text-white px-6 py-2 rounded-md hover:bg-brown-600 transition duration-200"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Footer Section */}
      <div className="bg-brown-700 text-white text-center py-8">
        <p className="text-lg">
          © 2024 The Babel Library - All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Contact;
