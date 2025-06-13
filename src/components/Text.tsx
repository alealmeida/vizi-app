// src/components/Text.tsx
import { styled, Text as TText } from 'tamagui'

export const Text = styled(TText, {
  name: 'Text',
  color: '$text',

  variants: {
    size: {
      sm: { fontSize: '$3', lineHeight: '$3' },
      md: { fontSize: '$4', lineHeight: '$4' },
      lg: { fontSize: '$6', lineHeight: '$6' },
      xl: { fontSize: '$7', lineHeight: '$7' },
    },
    weight: {
      light: { fontWeight: '$3' },
      regular: { fontWeight: '$4' },
      medium: { fontWeight: '$5' },
      bold: { fontWeight: '$7' },
    },
  },

  defaultVariants: {
    size: 'md',
    weight: 'regular',
  },
})