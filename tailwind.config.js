/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5DADE2',
        secondary: '#FFFFFF',
        accent: '#58D68D',
        text: '#2C3E50',
      },
    },
  },
  plugins: [],
};