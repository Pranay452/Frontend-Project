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
            // src={AboutUs}
            // src={
            //   "https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/aboutUs.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIASFUIRRI52U3IIU5J%2F20241109%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241109T083841Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRjBEAiAUPlFJ1vF2sJQR4ZmJg0I4eAuKPoBW2mgSU99dcYi5dQIgX9vP22Wv51EEJwH9wi%2FEusrSAWXuduRG1OA%2BeV0f20Uq7AIIchAAGgwxNDk1MzY0NzU3MDciDIszGNBU4PEVVSPBCSrJAkGYWkIjCwQYXpjdfuabFABUSRd6xxMNvqpvjcbQDOaGnyIIqI4v2rpC6ERrHmHwul2LQp7Nn7vq5sdWMcgjRFtwwJVZeaimB4eSHu2cQW7g%2Bw4Nqdzp1zmxE5rj7eKuy%2F8ASLcdE3iScyb8fzqD8QbJXZ2MBcSroZoo2IiDGqkIRQuMC4paqzdGg1hawtSDtMsgFJxrYNfi7Wmh4kZRkWoWmjCHwDMitCktTDx81HjC24uNuXPYUBomzTAdDKO4%2B0GSmeXt2nMj%2BK6YI4rz4Xdvze%2Fgu%2Bzn%2FB%2B9ocX5egVH45fEmYM5MksBtUjsB69ISnHGHgky4%2FuXWcGgiLdo7CjPGlLTmcIdcNsV9hDbbGHDOhiRIcxlP077mhwRdO8DncsSmST81AYGG5Rn2UBjoLsMIkiq%2FAj9Gf5HrAZ31dxS%2BHojU01cGsjiMMqnvLkGOrQCyEPDl%2FtLv6PRUZNSmzPbpC8pmG6GSjy6VPnUQa7e0puls2YNdJsm6etlo%2B%2FoY41jsAFSh5tjmqA0V7XcTz7fR2xs6YCjhC0jwVpHJ0SbzqGqTBwaGVxWFqBuhMSfnT9CvxHIeUpUMel1SHox%2FUnaOwsP6CugsvoiOohnOZBGs0FgGTBQ%2B52%2FzbqDrGH7jmpxchNpsyBfbwWcZoZpE2m1F5LJPeAvgDUnbvLrPKJ5xDbyMpI8ARZtEqAI1FH97NDKt7YoiPiqL%2BUFP2c65nHTZBY1CAr6HE2yp9K407y1WkUYCq6v69oGQmHi3Smd0w2PH%2F2vSiVmtrp7Z2orCphFr5yujnTSfBbYI3cZVdJzzOwo65hj8A1C0xkmL6NL8hqvrl%2BYJVbAs32FK2w7BAAK92fCrsw%3D&X-Amz-Signature=4ef1d4fa26887ab34695ecec2227564ade6516f63b78de784cd4fcb0a829271c&X-Amz-SignedHeaders=host&response-content-disposition=inline"
            // }
            src="https://pranaymanepallybucket.s3.ap-south-1.amazonaws.com/assets/aboutUs.jpg"
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
