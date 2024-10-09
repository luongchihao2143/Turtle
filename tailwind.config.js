/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F83758",
        white: "#FFF",
        primaryText: "#000",
        secondaryText: "#A8A8A9",
        inputBackground: "#F3F3F3",
        inputText: "#676767",
        inputBorder: "#A8A8A9",
        error: " #ff0000",
      },
    },
  },
  plugins: [],
};
