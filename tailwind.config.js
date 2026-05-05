/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A0C14',
          surface: '#131627',
          surface2: '#1E2235',
          border: '#2A2F45',
          gold: '#F6C700',
          goldDark: '#C9A000',
          text: '#E8ECF0',
          muted: '#8B95A8',
        },
        status: {
          tengo: '#22C55E',
          tengoLight: '#16A34A',
          sobra: '#F59E0B',
          sobraLight: '#D97706',
          intercambio: '#3B82F6',
          intercambioLight: '#2563EB',
          busco: '#EF4444',
          buscoLight: '#DC2626',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
      },
      backgroundImage: {
        'foil-shimmer': 'linear-gradient(135deg, #F6C700 0%, #FFF5A0 25%, #F6C700 50%, #C9A000 75%, #F6C700 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fadeIn': 'fadeIn 0.2s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
