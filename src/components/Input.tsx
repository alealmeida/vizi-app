// src/components/Input.tsx
import { styled, Input as TInput } from 'tamagui'

export const Input = styled(TInput, {
  name: 'Input',
  height: 48,              // 👈 define altura mínima
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  borderRadius: '$4',
  borderWidth: 1,
  borderColor: '$muted',
  backgroundColor: '$white',
  color: '$text',
  fontSize: '$4',
})