// src/components/GreetingTitle.tsx
import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import Title from './Title'

interface GreetingTitleProps {
  username: string
  onLogout: () => void
}

export default function GreetingTitle({ username, onLogout }: GreetingTitleProps) {
  return (
    <View style={styles.container}>
      <Title variant="page">Olá, {username} 👋</Title>
      <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#00bcd4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoutText: {
    color: '#00bcd4',
    fontWeight: '600',
  },
})