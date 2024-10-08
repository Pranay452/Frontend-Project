import React from "react";
import AboutUs from "../assets/aboutUs.jpg";

const About = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="flex justify-center relative z-10 gap-6 sm:gap-10 lg:gap-14 py-12 sm:py-20 lg:py-28 h-[90vh] overflow-y-scroll flex-wrap">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            About Us
          </h1>
          <img
            src={AboutUs}
            alt="about"
            className="w-full h-auto max-h-[400px] object-cover"
          />
          <div className="flex flex-col gap-y-4 sm:gap-y-6 mt-5">
            <p className="text-base sm:text-lg mb-4 text-gray-700 dark:text-gray-200">
              Welcome to My Pencil Sketch! We specialize in creating
              personalized pencil sketches from your favorite photos. Our
              talented artists bring your images to life with detailed and
              beautiful pencil drawings.
            </p>
            <p className="text-base sm:text-lg mb-4 text-gray-700 dark:text-gray-200">
              Whether you want a sketch of a loved one, a pet, or a memorable
              moment, we take orders to meet your customization needs. Each
              piece of art is carefully crafted and delivered to your home
              location.
            </p>
            <p className="text-base sm:text-lg mb-4 text-gray-700 dark:text-gray-200">
              Our mission is to provide high-quality, hand-drawn sketches that
              capture the essence of your photos and create lasting memories.
            </p>
            <p className="text-base sm:text-lg mb-4 text-gray-700 dark:text-gray-200">
              Thank you for choosing My Pencil Sketch. We look forward to
              creating a unique and beautiful piece of art for you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
