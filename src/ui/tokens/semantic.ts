// src/design-system/tokens/semantic.ts
import { palette } from './base';

export const semanticLight = {
  bg: {
    canvas: palette.white,
    subtle: palette.gray50,
    muted: palette.gray100,
    elevated: palette.white,
  },
  text: {
    primary: palette.gray900,
    secondary: palette.gray700,
    inverted: palette.white,
  },
  border: {
    default: palette.gray200,
    muted: palette.gray100,
  },
  brand: {
    solid: palette.primary500,
    subtle: palette.primary50,
    solidHover: palette.primary600,
  },
  success: { solid: palette.success600, subtle: palette.success50 },
  warning: { solid: palette.warning600, subtle: palette.warning50 },
  danger: { solid: palette.danger600, subtle: palette.danger50 },
  info: { solid: palette.info600, subtle: palette.info50 },
} as const;

export const semanticDark = {
  bg: {
    canvas: palette.black,
    subtle: palette.gray900,
    muted: palette.gray800,
    elevated: '#0B0F14',
  },
  text: {
    primary: palette.gray50,
    secondary: palette.gray300,
    inverted: palette.black,
  },
  border: {
    default: '#1F2A37',
    muted: '#111827',
  },
  brand: {
    solid: palette.primary500,
    subtle: '#141829',
    solidHover: palette.primary600,
  },
  success: { solid: palette.success600, subtle: '#052E2B' },
  warning: { solid: palette.warning600, subtle: '#2B1802' },
  danger: { solid: palette.danger600, subtle: '#2B0B0B' },
  info: { solid: palette.info600, subtle: '#0B1A36' },
} as const;

export type Semantic = typeof semanticLight; // shape shared across modes
