import React from 'react'
import { TamaguiProvider } from 'tamagui'
import { tamaguiConfig } from '../../tamagui.config'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
}