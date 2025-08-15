import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native'
import Box from '@ds/components/primitives/Box'

interface Props {
  children: ReactNode
}

export default function BaseScreen({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} backgroundColor="bgCanvas" padding="xl" justifyContent="center">
        {children}
      </Box>
    </SafeAreaView>
  )
}