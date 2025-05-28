/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
        accent: 'var(--color-accent)',
        dark: 'var(--color-dark)',
        'dark-lighter': 'var(--color-dark-lighter)',
        light: 'var(--color-light)',
        'light-darker': 'var(--color-light-darker)',
      },
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', '.light &');
    },
  ],
}
