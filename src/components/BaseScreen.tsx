import { View, YStack } from 'tamagui'
import { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

interface Props {
  children: ReactNode
}

export default function BaseScreen({ children }: Props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex={1} backgroundColor="$background">
        <YStack flex={1} paddingHorizontal="$4">
          {children}
        </YStack>
      </View>
    </SafeAreaView>
  )
}