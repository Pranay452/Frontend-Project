import { Footer } from "flowbite-react";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa6";

const FooterCom = () => {
  return (
    <Footer
      container
      className="fixed bottom-0 w-full bg-gradient-to-r  text-white p-4"
    >
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
        <div className="flex gap-6 mt-4 sm:mt-0">
          <Footer.Icon
            href="https://www.facebook.com/pramodhini.arts?mibextid=rS40aB7S9Ucbxw6v"
            icon={BsFacebook}
            className="hover:text-blue-500 transition-all duration-300 transform hover:scale-125"
          />

          <Footer.Icon
            href="https://www.instagram.com/pramodhini_arts?igsh=dXFhYWJuYTlrZGd2"
            icon={BsInstagram}
            className="hover:text-pink-500 transition-all duration-300 transform hover:scale-125"
          />
          <Footer.Icon
            href="https://x.com/Pramodhini_Arts"
            icon={BsTwitter}
            className="hover:text-blue-400 transition-all duration-300 transform hover:scale-125"
          />
          <Footer.Icon
            href="https://www.linkedin.com/in/pramodhini-arts-a0704432a/"
            icon={FaLinkedin}
            className="hover:text-gray-400 transition-all duration-300 transform hover:scale-125"
          />
          <Footer.Icon
            href="https://www.youtube.com/@PramodhiniArts"
            icon={FaYoutube}
            className="hover:text-pink-400 transition-all duration-300 transform hover:scale-125"
          />
          <Footer.Icon
            href="https://www.youtube.com/@PramodhiniArts"
            icon={FaSnapchat}
            className="hover:text-pink-400 transition-all duration-300 transform hover:scale-125"
          />
        </div>
        {/* Copyright Section */}
        <div className="text-sm sm:text-base mt-4 sm:mt-0">
          <Footer.Copyright
            href="#"
            by="Pramodhini Arts"
            year={new Date().getFullYear()}
            className="text-white hover:text-gray-300"
          />
        </div>
      </div>
    </Footer>
  );
};

export default FooterCom;
