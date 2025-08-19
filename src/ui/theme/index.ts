// src/design-system/theme/index.ts
import { createTheme } from '@shopify/restyle';
import { spacing, radii as borderRadii, fontSizes, fontWeights } from '@ui/tokens/base';
import { semanticLight, semanticDark } from '@ui/tokens/semantic';

export const lightTheme = createTheme({
  colors: {
    // background
    bgCanvas: semanticLight.bg.canvas,
    bgSubtle: semanticLight.bg.subtle,
    bgMuted: semanticLight.bg.muted,
    bgElevated: semanticLight.bg.elevated,

    // text
    textPrimary: semanticLight.text.primary,
    textSecondary: semanticLight.text.secondary,
    textInverted: semanticLight.text.inverted,

    // border
    borderDefault: semanticLight.border.default,
    borderMuted: semanticLight.border.muted,

    // brand & feedback
    brand: semanticLight.brand.solid,
    brandSubtle: semanticLight.brand.subtle,
    brandHover: semanticLight.brand.solidHover,

    success: semanticLight.success.solid,
    successSubtle: semanticLight.success.subtle,

    warning: semanticLight.warning.solid,
    warningSubtle: semanticLight.warning.subtle,

    danger: semanticLight.danger.solid,
    dangerSubtle: semanticLight.danger.subtle,

    info: semanticLight.info.solid,
    infoSubtle: semanticLight.info.subtle,
  },
  spacing,
  borderRadii,
  textVariants: {
    defaults: {
      color: 'textPrimary',
      fontSize: fontSizes.md,
      fontWeight: fontWeights.regular as any,
    },
    body: {
      color: 'textPrimary',
      fontSize: fontSizes.md,
    },
    caption: {
      color: 'textSecondary',
      fontSize: fontSizes.sm,
    },
    title: {
      color: 'textPrimary',
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold as any,
    },
    heading: {
      color: 'textPrimary',
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold as any,
    },
  },
  breakpoints: {},
});

export const darkTheme = createTheme({
  colors: {
    // background
    bgCanvas: semanticDark.bg.canvas,
    bgSubtle: semanticDark.bg.subtle,
    bgMuted: semanticDark.bg.muted,
    bgElevated: semanticDark.bg.elevated,

    // text
    textPrimary: semanticDark.text.primary,
    textSecondary: semanticDark.text.secondary,
    textInverted: semanticDark.text.inverted,

    // border
    borderDefault: semanticDark.border.default,
    borderMuted: semanticDark.border.muted,

    // brand & feedback
    brand: semanticDark.brand.solid,
    brandSubtle: semanticDark.brand.subtle,
    brandHover: semanticDark.brand.solidHover,

    success: semanticDark.success.solid,
    successSubtle: semanticDark.success.subtle,

    warning: semanticDark.warning.solid,
    warningSubtle: semanticDark.warning.subtle,

    danger: semanticDark.danger.solid,
    dangerSubtle: semanticDark.danger.subtle,

    info: semanticDark.info.solid,
    infoSubtle: semanticDark.info.subtle,
  },
  spacing,
  borderRadii,
  textVariants: lightTheme.textVariants,
  breakpoints: {},
});

export type Theme = typeof lightTheme;
