// src/design-system/components/molecules/Card.tsx
import React from 'react';
import Box from '../primitives/Box';
import type { Theme } from '@ds/theme';

// Aceita todas as props do Box (inclui margin/padding/backgoundColor etc.) e adiciona 'elevation'
export type CardProps = React.ComponentProps<typeof Box> & {
  elevation?: number;
};

export default function Card({
  children,
  elevation = 0,
  padding,
  backgroundColor,
  borderColor,
  borderWidth,
  borderRadius,
  style,
  ...rest
}: CardProps) {
  const shadowStyle = elevation
    ? { shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }
    : undefined;

  return (
    <Box
      backgroundColor={(backgroundColor as any) ?? 'bgElevated'}
      borderColor={(borderColor as any) ?? 'borderDefault'}
      borderWidth={borderWidth ?? 1}
      borderRadius={(borderRadius as any) ?? 'lg'}
      padding={(padding as any) ?? 'md'}
      style={style ? [shadowStyle, style] : shadowStyle}
      {...rest}
    >
      {children}
    </Box>
  );
}
