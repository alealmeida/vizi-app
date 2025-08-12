import React, { ReactNode } from 'react'
import { SafeAreaView, View, StyleSheet } from 'react-native'

interface Props {
  children: ReactNode
}

export default function BaseScreen({ children }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
})