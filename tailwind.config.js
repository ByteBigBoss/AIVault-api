/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens:{
        'ns': {'max': '359px'},
        'nsTsm': {'min':'319px', 'max': '767px'},
        'mdUp':{'min':'768'},
      }
    },
  },
  plugins: [],
}

