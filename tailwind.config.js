// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          50: "#f5f5f5",
          100: "#e0e0e0",
          200: "#b5a69e",
          300: "#8e735b",
          400: "#6f4f28",
          500: "#5b3f1a",
          600: "#4a2c10",
          700: "#3a1b08",
          800: "#2c1402",
          900: "#1b0a00",
        },
        white: "#ffffff",
      },
    },
  },
  plugins: [],
};
