/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors:{
        'primary': '#093D77',
        'secondary': '#909090',
        'secondary-1': '#dedede',
        'light': '#CCD7E3',
        'info': '#21C2DA',
        'info-1': '#b3f5ff',
        'danger': '#FF4141',
        'danger-1': '#feb4b4',
        'success': '#3FC476',
        'success-1':'#a5fdcb',
        'warning': '#FEB43D',
        'warning-1': '#ffe4b8',
      },
      animation: {
        leftToRight: 'leftToRight 2s infinite',
      },
      keyframes: {
        leftToRight: {
          '0%': { left: '-400px' },
          '100%': { left: '500px' }
        }
      }
    },
  },
  plugins: [],
}

