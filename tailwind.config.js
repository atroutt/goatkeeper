/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          1: '#FB7564',
          2: '#EA5B50',
          3: '#FD9D8C',
          4: '#FEC0B2',
          5: '#FFE4D9',
        },
        teal: '#0F807D',
        mustard: {
          1: '#FCB731',
          2: '#FFCC6A',
          3: '#FAD880',
          4: 'FFF2D2',
        },
        grey: {
          1: '#767676',
          2: '#A8A29E',
          3: '#CBC7C5',
          4: '#F3F3F3',
        },
        black: '#161616',
        white: '#FAFAFA',
        cream: '#F9F9F3',
        'error-red': '#AE1505',
      },
      keyframes: {
        flash: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        flash: 'flash 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
