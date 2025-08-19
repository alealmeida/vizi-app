// src/design-system/tokens/motion.ts
import { Easing, EasingFunction } from 'react-native';

export type MotionTokens = {
  offset: { sm: number; md: number; lg: number };
  duration: { sm: number; md: number; lg: number };
  easing: { quadInOut: EasingFunction };
};

export const motion: MotionTokens = {
  // deslocamento horizontal sugerido para transições
  offset: {
    sm: 48,
    md: 64,
    lg: 96,
  },
  // durações padronizadas (ms)
  duration: {
    sm: 600,
    md: 800,
    lg: 1200,
  },
  // funções de easing padronizadas
  easing: {
    quadInOut: Easing.inOut(Easing.quad),
  },
};
