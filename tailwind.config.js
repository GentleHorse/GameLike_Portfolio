/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'micro-5': ['"Micro 5", sans-serif'],
        'permanent-marker': ['"Permanent Marker", cursive'],
        'shadows-into-light': ['"Shadows Into Light", cursive'],
        'new-tegomin': ['"New Tegomin", serif'],
        'yuji-syuku': ['"Yuji Syuku", serif'],
        'dot-gothic-16': ['"DotGothic16", sans-serif'],
        'vt323': ['"VT323", monospace'],
        'pixelify-sans': ['"Pixelify Sans", sans-serif'],
        'open-sans': ['"Open Sans", sans-serif'],
        'playfair-display': ['"Playfair Display", serif'],
        'eb-garamond': ['"EB Garamond", serif'],
        'antic-didone': ['"Antic Didone", serif'],
        'cinzel': ['"Cinzel", serif'],
        'great-vibes': ['"Great Vibes", cursive'],
        'pinyon-script': ['"Pinyon Script", cursive'],
        'montserrat': ['"Montserrat", sans-serif'],
        'dm-serif-display': ['"DM Serif Display", serif'],
        'josefin-sans': ['"Josefin Sans", sans-serif'],
        'inter': ['"Inter", sans-serif'],
      }
    },
  },
  plugins: [],
}

