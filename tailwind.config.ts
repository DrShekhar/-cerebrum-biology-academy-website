import type { Config } from 'tailwindcss'

const config: Config = {
  // Dark mode uses system preference (media query)
  // Phase 1 focus on light mode excellence, dark mode reconsidered in Phase 4
  darkMode: 'media',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Indian mobile-first responsive breakpoints
      screens: {
        xs: '320px', // Small mobile (Android Go devices)
        sm: '375px', // Standard mobile
        md: '768px', // Tablet
        lg: '1024px', // Desktop
        xl: '1280px', // Large desktop
        '2xl': '1536px', // Extra large
        // Network-aware breakpoints
        'slow-connection': { raw: '(prefers-reduced-data: reduce)' },
        'fast-connection': { raw: '(prefers-reduced-data: no-preference)' },
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
        hindi: ['Noto Sans Devanagari', 'Mangal', 'system-ui', 'sans-serif'],
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

      // Harvard + Silicon Valley Design System Colors
      colors: {
        // Add default Tailwind colors back for compatibility
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',

        // Slate colors (used throughout the site)
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },

        // Gray colors (fallback)
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },

        // Red colors (for alerts/urgency)
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },

        // Orange colors (for CTA gradients)
        orange: {
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
          950: '#431407',
        },

        // Green colors (for success states)
        green: {
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
          950: '#052e16',
        },

        // Blue colors (for trust/info)
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // Emerald colors (alternative to teal)
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },

        // Primary - Medical Navy
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0a1628',
        },
        // Accent - Medical Teal
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e67',
          900: '#0f4c59',
        },
        // Achievement - Academic Gold
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Legacy mapping
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // shadcn/ui compatibility
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
        touch: '44px', // Minimum touch target
        'touch-lg': '48px', // Comfortable touch target
        thumb: '72px', // Thumb-friendly target
      },

      // Performance-optimized animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
        // Network-aware animations
        'loading-skeleton': 'loadingSkeleton 1.2s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
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
        pulseSubtle: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(34, 197, 94, 0)' },
        },
      },

      // Mobile-optimized shadows
      boxShadow: {
        'mobile-card': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'mobile-button': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'mobile-modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'low-data': '0 1px 3px rgba(0, 0, 0, 0.08)', // Minimal shadow for slow connections
      },

      // Network-optimized blur effects
      backdropBlur: {
        'low-data': '2px', // Minimal blur for performance
        standard: '8px', // Standard blur
        enhanced: '16px', // Enhanced blur for fast connections
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
    function ({ addUtilities, addVariant, matchUtilities, theme }) {
      // Add network-aware utilities
      addUtilities({
        '.data-saver': {
          transform: 'none',
          transition: 'none',
          animation: 'none',
          'background-image': 'none',
          'box-shadow': 'none',
        },
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          'backface-visibility': 'hidden',
          perspective: '1000px',
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
