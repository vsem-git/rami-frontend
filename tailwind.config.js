/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // пути к вашим компонентам
      "./public/index.html",        // если есть
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('tailwind-scrollbar-hide')
    ]
  }