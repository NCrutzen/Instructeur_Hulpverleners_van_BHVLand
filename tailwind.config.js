/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Arvo', 'serif'],
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        team: {
          red: '#e73546',
          green: '#63b986',
          yellow: '#e4e022',
          orange: '#f28b39',
        },
        res: {
          samenwerking: '#c89b6c',
          kennis: '#88be43',
          besluitkracht: '#ae77af',
          tijd: '#2fb7c2',
          materiaal: '#3e67af',
        }
      }
    }
  },
  plugins: [],
};
