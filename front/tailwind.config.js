/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        aurore: ['"La Belle Aurore"', 'cursive'],
        ptMono: ['"PT Mono"', 'monospace'],
      },
      backgroundImage: {
        soleil: "url('/assets/logo-sun.png')",
      },
      colors: {
        beige: '#F7F0ED',
        'dark-brown': '#421F00',
        heritage: {
          ink: '#17100b',
          text: '#24160e',
          oxblood: '#7c2d12',
          cream: '#f8ecd4',
          paper: '#fbf1df',
          sand: '#ead7b8',
          gold: '#c6a16b',
          muted: '#5f4a35',
          border: '#d8c5a7',
        },
      },
    },
  },
  plugins: [],
};
