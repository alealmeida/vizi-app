import React from 'react'
import { Text as RNText, StyleSheet, TextProps } from 'react-native'

interface Props extends TextProps {
  variant?: 'title' | 'body'
  children: React.ReactNode
}

export default function Text({ variant = 'body', style, children, ...rest }: Props) {
  return (
    <RNText
      style={[variant === 'title' ? styles.title : styles.body, style]}
      {...rest}
    >
      {children}
    </RNText>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#2260FF',
  },
  body: {
    fontSize: 16,
    color: '#333',
  },
})