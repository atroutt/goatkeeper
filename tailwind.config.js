/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#486FA8', // Indigo Blue
          light: '#D7FA64', // Neon Lime
        },
        secondary: '#A57E79', // Mauve
        accent: '#FA7564', // Coral
        background: '#FEF2E6', // Blush Pink
        text: {
          DEFAULT: '#161616',
          muted: '#6E737A', // Charcoal Gray
        },
        error: '#FA270C', // Error Red
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
