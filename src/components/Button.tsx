// src/components/Button.tsx
import { styled, Button as TButton } from 'tamagui'

export const Button = styled(TButton, {
  name: 'Button',
  height: 48,              // 👈 altura mínima para visualização
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  borderRadius: '$4',
  backgroundColor: '$primary',
  color: '$white',
  pressStyle: {
    opacity: 0.7,
  },
  variants: {
    variant: {
      outlined: {
        backgroundColor: 'transparent',
        borderColor: '$primary',
        borderWidth: 1,
        color: '$primary',
      },
    },
  },
})