import React from "react";
import img1 from "../assets/img_1.jpg";
import img2 from "../assets/img_2.jpg";
import img3 from "../assets/img_3.jpg";
import img4 from "../assets/img_4.jpg";
import img5 from "../assets/img_5.jpg";
import img6 from "../assets/img_6.jpg";
import img7 from "../assets/img_7.jpg";
import img8 from "../assets/img_8.jpg";
import img9 from "../assets/img_9.jpg";
import img10 from "../assets/img_10.jpg";
import img11 from "../assets/img_11.jpg";
import img12 from "../assets/img_12.png";
import img13 from "../assets/img_13.jpg";
import img14 from "../assets/img_14.jpg";
import img15 from "../assets/img_15.jpg";

const Gallery = () => {
  const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="px-4 flex justify-center relative z-10  gap-14 py-28 h-[95vh] overflow-y-scroll flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="gallery-item  rounded-lg shadow-lg">
            <img
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className="w-[400px] h-auto  object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
