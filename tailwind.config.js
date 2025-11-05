/** @type {import('tailwindcss').Config} */
import { colors } from './src/theme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Raleway', 'sans-serif'],
    },
    fontSize: {
      xxs: '0.675rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      colors: {
        // ========================================
        // SEMANTIC COLOR UTILITIES (Optimized DX)
        // ========================================

        // Brand colors (direct access)
        primary: colors.brand.primary,
        secondary: colors.brand.secondary,
        accent: colors.brand.accent,

        // Semantic text colors
        'text-primary': colors.semantic.text.primary,
        'text-secondary': colors.semantic.text.secondary,
        'text-placeholder': colors.semantic.text.placeholder,
        'text-inverse': colors.semantic.text.inverse,

        // Semantic background colors
        'background-primary': colors.semantic.background.primary,
        'background-secondary': colors.semantic.background.secondary,
        'background-card': colors.semantic.background.card,

        // Semantic border colors
        'border-primary': colors.semantic.border.primary,
        'border-input': colors.semantic.border.input,
        'border-focus': colors.semantic.border.focus,

        // Feedback colors (direct access)
        success: colors.feedback.success[500],
        warning: colors.feedback.warning[500],
        error: colors.feedback.error[500],

        // ========================================
        // FULL COLOR SYSTEM (Complete access)
        // ========================================
        ...colors,

        // ========================================
        // LEGACY COMPATIBILITY (Deprecated)
        // ========================================
        'background-cream': colors.semantic.background.secondary,
        'button-primary': colors.brand.primary,
      },
      screens: {
        desktop: '1024px',
        tablet: '768px',
      },
      maxWidth: {
        desktop: '1128px',
      },
      spacing: {
        27: '6.75rem', // 108px for desktop logo width
      },
    },
  },
  plugins: [],
};
