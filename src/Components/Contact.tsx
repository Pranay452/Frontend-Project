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
              // src={ContactImg}
              // src={
              //   "https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/contact.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIASFUIRRI52U3IIU5J%2F20241109%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241109T083709Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiAUPlFJ1vF2sJQR4ZmJg0I4eAuKPoBW2mgSU99dcYi5dQIgX9vP22Wv51EEJwH9wi%2FEusrSAWXuduRG1OA%2BeV0f20Uq7AIIchAAGgwxNDk1MzY0NzU3MDciDIszGNBU4PEVVSPBCSrJAkGYWkIjCwQYXpjdfuabFABUSRd6xxMNvqpvjcbQDOaGnyIIqI4v2rpC6ERrHmHwul2LQp7Nn7vq5sdWMcgjRFtwwJVZeaimB4eSHu2cQW7g%2Bw4Nqdzp1zmxE5rj7eKuy%2F8ASLcdE3iScyb8fzqD8QbJXZ2MBcSroZoo2IiDGqkIRQuMC4paqzdGg1hawtSDtMsgFJxrYNfi7Wmh4kZRkWoWmjCHwDMitCktTDx81HjC24uNuXPYUBomzTAdDKO4%2B0GSmeXt2nMj%2BK6YI4rz4Xdvze%2Fgu%2Bzn%2FB%2B9ocX5egVH45fEmYM5MksBtUjsB69ISnHGHgky4%2FuXWcGgiLdo7CjPGlLTmcIdcNsV9hDbbGHDOhiRIcxlP077mhwRdO8DncsSmST81AYGG5Rn2UBjoLsMIkiq%2FAj9Gf5HrAZ31dxS%2BHojU01cGsjiMMqnvLkGOrQCyEPDl%2FtLv6PRUZNSmzPbpC8pmG6GSjy6VPnUQa7e0puls2YNdJsm6etlo%2B%2FoY41jsAFSh5tjmqA0V7XcTz7fR2xs6YCjhC0jwVpHJ0SbzqGqTBwaGVxWFqBuhMSfnT9CvxHIeUpUMel1SHox%2FUnaOwsP6CugsvoiOohnOZBGs0FgGTBQ%2B52%2FzbqDrGH7jmpxchNpsyBfbwWcZoZpE2m1F5LJPeAvgDUnbvLrPKJ5xDbyMpI8ARZtEqAI1FH97NDKt7YoiPiqL%2BUFP2c65nHTZBY1CAr6HE2yp9K407y1WkUYCq6v69oGQmHi3Smd0w2PH%2F2vSiVmtrp7Z2orCphFr5yujnTSfBbYI3cZVdJzzOwo65hj8A1C0xkmL6NL8hqvrl%2BYJVbAs32FK2w7BAAK92fCrsw%3D&X-Amz-Signature=fc70d1bc049d674820da6526dc21604753cd04d723a31f8f8b507c2b6a799d72&X-Amz-SignedHeaders=host&response-content-disposition=inline"
              // }
              src="https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/contact.jpg"
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
