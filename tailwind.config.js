/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#2482ced8",
        main_hover: "#1b74b3",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
