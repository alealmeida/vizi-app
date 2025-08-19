// Barrel do Design System
// Primitivos
export { default as Box } from './components/primitives/Box';
export { default as Text } from './components/primitives/Text';

// Átomos
export { default as Button } from './components/atoms/Button';
export { default as IconButton } from './components/atoms/IconButton';
export { default as Divider } from './components/atoms/Divider';

// Moléculas
export { default as Card } from './components/molecules/Card';

// Tema
export * from './theme'; // exporta tipos/Theme
export { DSProvider, useThemeMode } from './theme/provider';

// Tokens
export { motion } from './tokens/motion';
export type { MotionTokens } from './tokens/motion';
