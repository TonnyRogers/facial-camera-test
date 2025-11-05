export const colors = {
  // ========================================
  // BRAND COLORS (Primary Identity)
  // ========================================
  brand: {
    primary: '#FC4C02', // Main brand orange
    secondary: '#562955', // Brand purple
    accent: '#FDCAB4', // Light orange accent
    dark: '#7E2601', // Dark orange variant
    darkPurple: '#451E44', // Dark purple variant
  },

  // ========================================
  // NEUTRAL COLORS (Unified Scale)
  // ========================================
  neutral: {
    50: '#FFFFFF', // Pure white
    100: '#FBF8E9', // Cream background
    200: '#F2F2F2', // Light gray
    300: '#DEDEDE', // Border gray
    400: '#C1C1C1', // Input border
    500: '#999999', // Placeholder text
    600: '#808080', // Medium gray
    700: '#666666', // Dark gray
    800: '#4D4D4D', // Darker gray
    900: '#333333', // Text primary
    1000: '#000000', // Pure black
  },

  // ========================================
  // SEMANTIC COLORS (Purpose-Driven)
  // ========================================
  semantic: {
    text: {
      primary: '#333333', // Main text color
      secondary: '#666666', // Secondary text
      placeholder: '#999999', // Placeholder text
      inverse: '#F7F1D4', // Text on dark backgrounds
      light: '#999999', // Light text variant
    },
    background: {
      primary: '#F9F9F9', // Main background
      secondary: '#FBF8E9', // Cream background
      card: '#FFFFFF', // Card backgrounds
      gray: '#F2F2F2', // Gray background
    },
    border: {
      primary: '#DEDEDE', // Main borders
      input: '#C1C1C1', // Input borders
      focus: '#FC4C02', // Focus state borders
    },
  },

  // ========================================
  // FEEDBACK COLORS (Status & Actions)
  // ========================================
  feedback: {
    success: {
      50: '#E0FFDF',
      100: '#AAF0A8',
      200: '#024D00',
      300: '#7FE87D',
      400: '#6AE467',
      500: '#04CB00',
      600: '#04B200',
      700: '#039900',
      800: '#038000',
      900: '#026600',
    },
    warning: {
      50: '#FBF8E9',
      100: '#FFE9CC',
      200: '#663B00',
      300: '#FFD499',
      400: '#FFBE66',
      500: '#FFB34D',
      600: '#FF9E1B',
      700: '#E58400',
      800: '#CC7500',
      900: '#B26700',
    },
    error: {
      50: '#FFCCCC',
      100: '#FF9999',
      200: '#800000',
      300: '#FF6666',
      400: '#FF4C4C',
      500: '#FF1B1B',
      600: '#E50000',
      700: '#CC0000',
      800: '#B20000',
      900: '#990000',
    },
    purple: {
      100: '#A38FA3',
    },
  },

  // ========================================
  // SPECIAL PURPOSE COLORS
  // ========================================
  special: {
    card: {
      pumice: '#C5CCC7',
      blueDental: '#323E48',
      luckyPoint: '#15286C',
      wineBerry: '#461541',
      flamingo: '#EC5A29',
      heavyMetal: '#262923',
      wheat: '#F5E5BA',
    },
    blue: {
      500: '#343E47',
    },
  },

  // ========================================
  // BACKWARD COMPATIBILITY ALIASES
  // @deprecated - Use semantic colors instead
  // ========================================

  // Figma extracted colors (deprecated - use brand/neutral)
  cream: '#FBF8E9',
  orange: '#FC4C02',
  lightOrange: '#FDCAB4',
  darkOrange: '#7E2601',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#333333',
  mediumGray: '#666666',
  lightGray: '#999999',
  borderGray: '#DEDEDE',
  backgroundGray: '#F2F2F2',

  feedbackYellow: '#CC7500',

  // Legacy gray scale (deprecated - use neutral)
  gray: {
    100: '#f7fafc',
    200: '#edf2f7',
    300: '#e2e8f0',
    400: '#cbd5e0',
    500: '#a0aec0',
    600: '#718096',
    700: '#4a5568',
    800: '#2d3748',
    900: '#1a202c',
  },
};
