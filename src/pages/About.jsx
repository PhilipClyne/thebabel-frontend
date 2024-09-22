
function About() {
  return (
    <div className="p-4 bg-gradient-to-b from-white to-brown-100">
      {/* About Banner Section */}
      <div className="relative overflow-hidden mb-8">
        <div className="w-full h-64 bg-gradient-to-r from-brown-500 to-brown-300 text-white flex justify-center items-center text-center">
          <h2 className="text-4xl font-bold">About The Babel Library</h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-brown-700 animate-scroll-bar"></div>
      </div>

      {/* Library History */}
      <div className="my-8 max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-brown-700 text-center mb-4">
          Our Journey
        </h3>
        <p className="text-lg text-brown-600 text-center mb-8">
          Established in 2024, The Babel Library has been at the forefront of
          providing quality books and fostering a love for reading. We aim to
          create a space where knowledge flows freely and everyone can access
          the world of literature, history, science, and the arts.
        </p>
        <p className="text-lg text-brown-600 text-center mb-8">
          Our library is dedicated to serving our community with diverse book
          collections and promoting literacy programs for all ages. We believe
          in the power of books to transform lives and enrich our society.
        </p>
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

export default About;
