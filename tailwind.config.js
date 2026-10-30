/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#16261C', soft: '#3D4B42', mute: '#6B7A70' },
        leaf: { DEFAULT: '#1F5D3A', dark: '#164028', light: '#2F7A4E', wash: '#E8F0E9' },
        turmeric: { DEFAULT: '#F0A400', dark: '#C98600', wash: '#FDF1D6' },
        chili: { DEFAULT: '#C43B2C', wash: '#FBE7E4' },
        rice: { DEFAULT: '#FAF6EE', deep: '#F2ECE0' },
        steel: { DEFAULT: '#E4E2D8', dark: '#CFCCBE' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        bangla: ['"Hind Siliguri"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '18px', pill: '999px' },
      boxShadow: {
        lift: '0 10px 30px -12px rgba(22,38,28,0.25)',
        pop: '0 2px 0 0 #16261C',
      },
      keyframes: {
        steam: { '0%,100%': { opacity: 0.25, transform: 'translateY(0)' }, '50%': { opacity: 0.7, transform: 'translateY(-6px)' } },
        pop: { '0%': { opacity: 0, transform: 'translateY(6px) scale(0.98)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: { steam: 'steam 3s ease-in-out infinite', pop: 'pop 0.22s ease-out' },
    },
  },
  plugins: [],
}
