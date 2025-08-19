// src-design-system/components/atoms/Divider.tsx
import React from 'react';
import Box from '@ui/components/primitives/Box';
import type { Theme } from '@ui/theme';
import type { DimensionValue } from 'react-native';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerProps = React.ComponentProps<typeof Box> & {
  orientation?: DividerOrientation;
  color?: keyof Theme['colors'];
  thickness?: number; // RN pixels
  length?: DimensionValue; // width or height depending on orientation
};

export default function Divider({
  orientation = 'horizontal',
  color = 'borderMuted',
  thickness = 1,
  length,
  style,
  ...rest
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  const width: DimensionValue = isHorizontal ? (length ?? '100%') : thickness;
  const height: DimensionValue = isHorizontal ? thickness : (length ?? '100%');

  return (
    <Box
      backgroundColor={color as any}
      width={width as any}
      height={height as any}
      style={style}
      {...rest}
    />
  );
}
