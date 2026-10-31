/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
      '2xl': '1280px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1257D6',
          hover: '#0D47A1',
          active: '#0B57D0',
          light: '#EAF1FD',
          50: '#F0F6FF',
          100: '#EAF1FD',
          200: '#D0E1FD',
          600: '#1257D6',
          700: '#0D47A1',
          800: '#0B57D0',
        },
        navy: {
          DEFAULT: '#0F172A',
          muted: '#1E293B',
          light: '#334155',
        },
        muted: {
          DEFAULT: '#64748B',
          light: '#94A3B8',
          dark: '#475569',
        },
        page: '#F5F8FC',
        card: '#FFFFFF',
        border: {
          DEFAULT: '#E5EAF2',
          light: '#F1F5F9',
          dark: '#CBD5E1',
        },
        star: '#F5A524',
        badge: {
          bg: '#EAF1FD',
          text: '#1257D6',
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        card: '16px',
        search: '16px',
        btn: '8px',
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        sm: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.06)',
        md: '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
        lg: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        soft: '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        card: '0 2px 8px -1px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 16px 32px -4px rgba(15, 23, 42, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}
