/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-1': '#CCD7E3',
        'primary-2': '#21C2DA',
        'primary-3': '#093D77',
        'secondary-1': '#DFDFDF',
        'secondary-2': '#A6A6A6',
        'danger': '#FF4141',
        'success': '#27C651',
        'warning': '#FEB43D',
      },
      animation: {
        pulse2: 'pulse2 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse2: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .2 }
        }
      }
    },
  },
  plugins: [],
}

