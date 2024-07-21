import React from "react";
import { Link } from "react-router-dom";
import "animate.css";

const Home: React.FC = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-75"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 sm:px-12">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4 animate__animated animate__fadeInDown">
          Welcome to My Pencil Sketch
        </h1>
        <p className="text-lg sm:text-2xl mb-8 animate__animated animate__fadeInUp">
          Bringing your photos to life with detailed pencil sketches.
        </p>
        <Link
          to="/contact"
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full animate__animated animate__zoomIn"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
