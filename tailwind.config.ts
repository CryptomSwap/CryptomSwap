module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        swirl: ['"Great Vibes"', 'cursive'],
        luxury: ['"Marcellus"', 'serif'],
        sacrifice: ['Sacrifice', 'serif'],
      },
      colors: {
        background: '#0A0A0A',
        surface: '#111111',
        accent: {
          orange: '#FF9900',
          purple: '#8A00D4',
        },
        text: '#EDEDED',
      },
    },
  },
  plugins: [],
}; 