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
        primary: {
          DEFAULT: '#6366F1', // Indigo
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: {
          DEFAULT: '#8B5CF6', // Purple
          dark: '#7c3aed',
          light: '#a78bfa',
        },
        accent: {
          DEFAULT: '#06B6D4', // Cyan
          dark: '#0891b2',
          light: '#22d3ee',
        },
        darkBg: {
          DEFAULT: '#0F172A', // Slate 900
          card: '#1E293B',    // Slate 800
          border: '#334155',  // Slate 700
        },
        lightBg: {
          DEFAULT: '#F8FAFC', // Slate 50
          card: '#FFFFFF',
          border: '#E2E8F0',  // Slate 200
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        glassLight: '0 8px 32px 0 rgba(99, 102, 241, 0.1)',
      }
    },
  },
  plugins: [],
}
