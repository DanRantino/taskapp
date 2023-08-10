/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#F6F9FC',
          secondary: '#526475',
          accent: '#D8E3E7',
          neutral: '#7F92A4',
          'base-100': '#061B2E',
          info: '#1C85E8',
          success: '#2CC8A7',
          warning: '#FFC259',
          error: '#FF8082',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
