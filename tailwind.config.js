/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Scans all .html files in the root directory
    "./**/*.html" // Scans all .html files in any subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
