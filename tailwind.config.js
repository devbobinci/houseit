/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBlue: "#60B7FF",
        lightBlue: "#D8ECFE",
        darkBase: "#222",
        darkInput: "#303030",
      },
      fontFamily: {
        lobster: ["lobster", "cursive"],
      },
      screens: {
        "3xl": "1740px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
