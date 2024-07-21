import { Button, Textarea, TextInput } from "flowbite-react";
import React, { useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";

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
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/contact",
        contactForm
      );
      if (response.status) {
        console.log("hello");
        toast.success("Message sent successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to send the message. Please try again later.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg pb-20 px-6 sm:px-10">
      <div className="mt-28">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <form className="flex flex-col gap-y-6" onSubmit={handleContactForm}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-lg text-gray-700 dark:text-gray-200"
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
            className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
