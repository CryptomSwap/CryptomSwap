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
        background: '#1a001f',
        surface: '#2a0030',
        accent: {
          orange: '#581c87',
          purple: '#a855f7',
          lavender: '#b78ddf',
          violet: '#7c3aed',
        },
        text: '#ffffff',
        primary: {
          DEFAULT: '#ffffff',
          muted: '#b78ddf',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#2e1065',
        },
      },
    },
  },
  plugins: [],
}; 