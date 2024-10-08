import { Button, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import ContactImg from "../assets/contact.jpg";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleContactForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert("Please fill all the fields");
      return; // Prevents submission if validation fails
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/contact",
        contactForm
      );
      if (response.status === 200) {
        // Check for success response
        toast.success("Message sent successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send the message. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <div className="flex-grow py-12 sm:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg px-6 sm:px-10">
          <div className="mt-12 mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
              Contact Us
            </h1>
            <img
              src={ContactImg}
              alt="contact"
              className="w-full h-auto max-h-[400px] object-cover"
            />

            <form
              className="flex flex-col gap-y-6"
              onSubmit={handleContactForm}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-lg text-gray-700 dark:text-gray-200 mt-5"
                >
                  Name
                </label>
                <TextInput
                  id="name"
                  placeholder="Your Name"
                  required
                  onChange={(e) =>
                    setContactForm({ ...contactForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-lg text-gray-700 dark:text-gray-200"
                >
                  Email
                </label>
                <TextInput
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  onChange={(e) =>
                    setContactForm({ ...contactForm, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-lg text-gray-700 dark:text-gray-200"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  required
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                className="bg-gradient-to-r from-gray-600 to-gray-300 hover:from-gray-700 hover:to-gray-400 text-white font-bold px-6 md:py-3 md:px-8 rounded-md animate__animated animate__zoomIn"
              >
                Submit
              </Button>
            </form>
          </div>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-200 text-center">
            If you have any questions, feel free to reach out to us. You can
            also contact our admin directly using the information below.
          </p>
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-200 font-bold">
              <strong>Contact No: </strong> 6302134027 | 9959623900
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200 font-bold">
              <strong>Contact Email:</strong> pramodhiniarts@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
