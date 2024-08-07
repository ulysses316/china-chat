/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        fondo: "#16161A",
        highlighter: "#7f5af0",
        alter: "#2cb67d",
        my_white: "#f5f5f5",
        new: {
          white: "#F4F4F5",
          gray: "#E4E4E7",
          black: "#09090B",
        },
      },
    },
  },
  plugins: [],
};
