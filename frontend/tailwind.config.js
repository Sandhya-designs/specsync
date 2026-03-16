/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        secondary: '#00cc99',
        danger: '#ff3333',
        warning: '#ffaa00',
        success: '#00cc66',
      },
    },
  },
  plugins: [],
}
