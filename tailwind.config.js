/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        small: { 'raw': '(min-height: 460px)' },
        large: { 'raw': '(min-width: 850px) and (min-height: 720px)' },
        xlarge: { 'raw': '(min-width: 1140px)' }
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom right, #202C3A, #213558)',
      },

    },
  },
  plugins: [],
};
