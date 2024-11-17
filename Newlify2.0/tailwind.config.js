export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#003F63',
          light: '#00B2FF'
        },
        secondary: {
          green: '#00C39A',
          yellow: '#FFC914'
        },
        neutral: {
          dark: '#2C2C2C',
          light: '#E8E8E8'
        },
        accent: {
          red: '#FF6B6B'
        }
      }
    },
  },
  plugins: [],
}