import React from 'react'
import { Text, StyleSheet } from 'react-native'

interface Props {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  return <Text style={styles.error}>{message}</Text>
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
  },
})