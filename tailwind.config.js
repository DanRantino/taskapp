/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{js,ts,jsx,tsx,mdx}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#AD6CF1',
          secondary: '#2D84FB',
          accent: '#F5F8FF',
          neutral: '#FFFFFF',
          'base-100': '#2F3C4E',
          info: '#44BED0',
          success: '#25B865',
          warning: '#F9A825',
          error: '#F71010',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
