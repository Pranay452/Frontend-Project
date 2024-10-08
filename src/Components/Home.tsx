import React from "react";
import { Link } from "react-router-dom";
import "animate.css";

const Home: React.FC = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed"></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-75"></div>
      {/* Content Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-8 md:px-12 lg:px-16">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent animate__animated animate__fadeInDown"
          style={{
            backgroundImage: "linear-gradient(to right, #a9a9a9, #e0e0e0)",
          }}
        >
          Welcome to My Pencil Sketch
        </h1>

        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 bg-clip-text text-transparent animate__animated animate__fadeInUp"
          style={{
            backgroundImage: "linear-gradient(to right, #c0c0c0, #f0f0f0)",
          }}
        >
          Bringing your photos to life with detailed pencil sketches.
        </p>

        <Link
          to="/upload"
          className="bg-[#cfb53b] hover:from-gray-700 hover:to-[#6F006F] text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full animate__animated animate__zoomIn"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
