import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Indian mobile-first responsive breakpoints
      screens: {
        'xs': '320px',   // Small mobile (Android Go devices)
        'sm': '375px',   // Standard mobile
        'md': '768px',   // Tablet
        'lg': '1024px',  // Desktop
        'xl': '1280px',  // Large desktop
        '2xl': '1536px', // Extra large
        // Network-aware breakpoints
        'slow-connection': { 'raw': '(prefers-reduced-data: reduce)' },
        'fast-connection': { 'raw': '(prefers-reduced-data: no-preference)' },
      },

      // Performance-optimized fonts for Indian languages
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Noto Sans',
          'Noto Sans Devanagari', // Hindi support
          'Roboto',
          'sans-serif',
        ],
        hindi: [
          'Noto Sans Devanagari',
          'Mangal',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },

      // Indian education theme colors
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Indian saffron and green theme
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },

      // Mobile-optimized spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
        // Touch-friendly sizes for Indian mobile users
        'touch': '44px',    // Minimum touch target
        'touch-lg': '48px', // Comfortable touch target
        'thumb': '72px',    // Thumb-friendly target
      },

      // Performance-optimized animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Network-aware animations
        'loading-skeleton': 'loadingSkeleton 1.2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0, -15px, 0)' },
          '70%': { transform: 'translate3d(0, -7px, 0)' },
          '90%': { transform: 'translate3d(0, -2px, 0)' },
        },
        loadingSkeleton: {
          '0%': { backgroundColor: '#f3f4f6' },
          '50%': { backgroundColor: '#e5e7eb' },
          '100%': { backgroundColor: '#f3f4f6' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },

      // Mobile-optimized shadows
      boxShadow: {
        'mobile-card': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
        'mobile-button': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'mobile-modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'low-data': '0 1px 3px rgba(0, 0, 0, 0.08)', // Minimal shadow for slow connections
      },

      // Network-optimized blur effects
      backdropBlur: {
        'low-data': '2px',  // Minimal blur for performance
        'standard': '8px',  // Standard blur
        'enhanced': '16px', // Enhanced blur for fast connections
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),

    // Performance plugin for Indian mobile optimization
    function({ addUtilities, addVariant, matchUtilities, theme }) {
      // Add network-aware utilities
      addUtilities({
        '.data-saver': {
          'transform': 'none',
          'transition': 'none',
          'animation': 'none',
          'background-image': 'none',
          'box-shadow': 'none',
        },
        '.gpu-accelerated': {
          'transform': 'translateZ(0)',
          'backface-visibility': 'hidden',
          'perspective': '1000px',
        },
        '.touch-action-manipulation': {
          'touch-action': 'manipulation',
        },
        '.tap-highlight-none': {
          '-webkit-tap-highlight-color': 'transparent',
        },
      })

      // Add Indian mobile-specific variants
      addVariant('data-saver', '@media (prefers-reduced-data: reduce)')
      addVariant('slow-network', '@media (connection: slow-2g), (connection: 2g)')
      addVariant('fast-network', '@media (connection: 3g), (connection: 4g)')
      addVariant('offline', '@media (connection: none)')

      // Add Hindi text direction support
      addVariant('hindi', '[dir="ltr"] &')
      addVariant('rtl', '[dir="rtl"] &')

      // Add device-specific variants
      addVariant('android', '@supports (-webkit-appearance:none)')
      addVariant('ios', '@supports (-webkit-touch-callout: none)')

      // Add performance-aware spacing
      matchUtilities(
        {
          'safe-area': (value) => ({
            padding: `env(safe-area-inset-${value})`,
          }),
        },
        { values: { top: 'top', bottom: 'bottom', left: 'left', right: 'right' } }
      )
    },
  ],
}

export default config