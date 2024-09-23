import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../Loader/Loader.jsx"; // Loading component

const URL = "https://openlibrary.org/works/";
const placeholderImg = "https://via.placeholder.com/300?text=No+Image"; // Placeholder image

const BookDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const {
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
          } = data;
          const newBook = {
            description: description
              ? description.value
              : "No description available",
            title: title,
            cover_img: covers
              ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
              : placeholderImg, // Use placeholder if cover is not found
            subject_places: subject_places
              ? subject_places.join(", ")
              : "No subject places found",
            subject_times: subject_times
              ? subject_times.join(", ")
              : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className="book-details bg-brown-50 min-h-screen py-10 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <button
          type="button"
          className="flex items-center space-x-2 text-brown-600 font-semibold hover:text-brown-800 transition-colors mb-8"
          onClick={() => navigate("/books")}
        >
          <span className="text-lg">&larr;</span>
          <span className="text-lg">Go Back</span>
        </button>

        {book ? (
          <div className="book-details-content flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
            <div className="book-details-img w-full md:w-1/2 h-80 md:h-auto">
              <img
                src={book.cover_img}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="book-details-info p-6 w-full md:w-1/2">
              <h1 className="text-3xl font-bold text-brown-700 mb-4">
                {book.title}
              </h1>

              <p className="text-gray-700 mb-4">{book.description}</p>

              <div className="book-details-item mb-2">
                <span className="font-semibold text-brown-700">
                  Subject Places:
                </span>
                <span className="italic text-gray-600 ml-2">
                  {book.subject_places}
                </span>
              </div>

              <div className="book-details-item mb-2">
                <span className="font-semibold text-brown-700">
                  Subject Times:
                </span>
                <span className="italic text-gray-600 ml-2">
                  {book.subject_times}
                </span>
              </div>

              <div className="book-details-item">
                <span className="font-semibold text-brown-700">Subjects:</span>
                <span className="italic text-gray-600 ml-2">
                  {book.subjects}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-brown-700 font-semibold">
            No book details found.
          </div>
        )}
      </div>
    </section>
  );
};

export default BookDetail;
