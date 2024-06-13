/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'on-surface': '#e6e1e5'
      }
    },
  },
  plugins: [],
}

