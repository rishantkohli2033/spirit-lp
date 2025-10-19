/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        halloweenOrange: "#FF7518",
        spookyBlack: "#1C1C1C",
        ghostWhite: "#F8F8F8",
        pumpkinYellow: "#FFB84C",
      },
      fontFamily: {
        spooky: ["Creepster", "cursive"],
      },
    },
  },
  plugins: [],
}
