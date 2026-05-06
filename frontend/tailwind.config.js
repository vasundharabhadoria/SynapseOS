/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0a0a14',
        surface: '#111122',
        card: '#16162a',
        cardHover: '#1e1e38',
        primary: '#a78bfa',
        secondary: '#f0abfc',
        accent: '#c4b5fd',
        muted: '#6b7280',
        pink: {
          soft: '#f9a8d4',
          glow: '#ec4899',
        },
        lavender: '#ddd6fe',
        border: 'rgba(167,139,250,0.15)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(167,139,250,0.25)',
        glowPink: '0 0 20px rgba(240,171,252,0.25)',
        glowSm: '0 0 10px rgba(167,139,250,0.15)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, #1a0a2e 0%, #0a0a14 50%, #0d1a2e 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
