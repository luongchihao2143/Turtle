/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F83758",
        secondary: "#F3F3F3",
        white: "#FFF",
        primaryText: "#000",
        secondaryText: "#A8A8A9",
        inputBackground: "#F3F3F3",
        inputText: "#2C2D3A",
        inputBorder: "#A8A8A9",
        error: " #ff0000",
      },
    },
  },
  plugins: [],
};
