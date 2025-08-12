import React from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'

type TitleVariant = 'page' | 'section' | 'card'

interface TitleProps {
  children: React.ReactNode
  variant?: TitleVariant
  style?: TextStyle
}

const variantStyles: Record<TitleVariant, TextStyle> = {
  page: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  section: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0f0f0',
    marginBottom: 12,
  },
  card: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e0e0e0',
  },
}

export default function Title({ children, variant = 'page', style }: TitleProps) {
  return <Text style={[variantStyles[variant], style]}>{children}</Text>
}