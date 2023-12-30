/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#fdfff3',
        posRowColor : '#00ff004d',
        negRowColor : '#ff000057',
        posHoverColor: '#00ff007a',
        negHoverColor: '#ff000078',
        hoverColor:'#D22618',
      },
    },
  },
  plugins: [],
}

