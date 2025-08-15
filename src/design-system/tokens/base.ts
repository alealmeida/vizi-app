// src/design-system/tokens/base.ts
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radii = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 12,
  pill: 999,
} as const;

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
} as const;

export const fontWeights = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const palette = {
  // neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // brand & feedback
  primary50: '#EEF2FF',
  primary500: '#3741D8',
  primary600: '#2E36AF',

  success50: '#ECFDF5',
  success600: '#065F46',

  warning50: '#FEF3C7',
  warning600: '#92400E',

  danger50: '#FEE2E2',
  danger600: '#991B1B',

  info50: '#EFF6FF',
  info600: '#1D4ED8',

  slate100: '#F1F5F9',
  slate900: '#0F172A',
} as const;

export type Spacing = keyof typeof spacing;
export type Radii = keyof typeof radii;
export type FontSizes = keyof typeof fontSizes;
export type FontWeights = keyof typeof fontWeights;
export type Palette = keyof typeof palette;
