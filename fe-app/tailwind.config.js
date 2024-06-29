/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "imageSize": "40rem",
        "boxHeight": "29rem",
      },
      width: {
        "homeImageWidth": "33%",
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
      margin: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
      },
    },
  },
  plugins: [],
}

