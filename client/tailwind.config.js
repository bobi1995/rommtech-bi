/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minWidth: {
        half: "50%",
        500: "500px",
      },
      colors: {
        main: {
          menu: "#C70039",
          menu_dark: "#8a0027",
          globalbg: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
