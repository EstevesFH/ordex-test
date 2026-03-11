export const designSystem = {
  colors: {
    primary: 'oklch(37.9% 0.146 265.522)',
    primaryHover: 'oklch(32% 0.146 265.522)',
    primaryLight: 'oklch(50% 0.13 265.522)',
    primaryPale: 'oklch(95% 0.03 265.522)',

    background: '#f8fafc',
    backgroundDark: 'oklch(37.9% 0.146 265.522)',
    surface: '#ffffff',
    surfaceHover: '#f1f5f9',

    textMain: '#020617',
    textPrimary: '#020617',
    textSecondary: '#64748b',

    white: '#ffffff',
    border: '#e5e7eb',

    error: '#ef4444',
  },

  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  radius: {
    md: '10px',
    lg: '12px',
  },

  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    size: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
      xxxl: '2rem',
    },
    weight: {
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },

  transitions: {
    fast: '150ms ease',
    base: '300ms ease',
  },

  zIndex: {
    sticky: 100,
  },
}