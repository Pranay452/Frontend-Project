import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg  pb-20 px-10">
      <div className="mt-28">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          About Us
        </h1>
        <div className="flex flex-col gap-y-2">
          <p className="flex flex-col gap-y-4 text-lg mb-4 text-gray-700 dark:text-gray-200">
            Welcome to My Pencil Sketch! We specialize in creating personalized
            pencil sketches from your favorite photos. Our talented artists
            bring your images to life with detailed and beautiful pencil
            drawings.
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            Whether you want a sketch of a loved one, a pet, or a memorable
            moment, we take orders to meet your customization needs. Each piece
            of art is carefully crafted and delivered to your home location.
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            Our mission is to provide high-quality, hand-drawn sketches that
            capture the essence of your photos and create lasting memories.
          </p>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            Thank you for choosing My Pencil Sketch. We look forward to creating
            a unique and beautiful piece of art for you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
