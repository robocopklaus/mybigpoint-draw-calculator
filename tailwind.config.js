module.exports = {
  content: ['./src/**/*.{html,js,tsx}', './dist/popup.html'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdeef1',
          100: '#fbdce2',
          200: '#f7bac5',
          300: '#f297a9',
          400: '#ee758c',
          500: '#EA526F',
          600: '#bb4259',
          700: '#a4394e',
          800: '#752938',
          900: '#5e212c'
        },
        secondary: {
          50: '#fffee9',
          100: '#fffcd2',
          200: '#fff9a5',
          300: '#fff679',
          400: '#fff34c',
          500: '#EA526F',
          600: '#ccc019',
          700: '#b3a816',
          800: '#807810',
          900: '#66600c'
        }
      }
    }
  },
  plugins: []
}
