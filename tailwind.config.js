/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "#6b46c1",
          800: "#553c9a",
        },
      },
      zIndex: {
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  variants: {},
  plugins: [flowbite.plugin()],
};
