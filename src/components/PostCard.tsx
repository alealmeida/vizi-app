// src/components/PostCard.tsx
import { Platform, TouchableOpacity } from 'react-native'
import { styled } from 'tamagui'
import { Text } from './Text'

type PostCardProps = {
  title: string
  onPress?: () => void
  children?: React.ReactNode
}

const CardContainer = styled(TouchableOpacity, {
  padding: '$4',
  backgroundColor: '$surface',
  borderRadius: '$4',
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
})

export function PostCard({ title, onPress, children }: PostCardProps) {
  const androidStyle = Platform.OS === 'android' ? { elevation: 2 } : undefined

  return (
    <CardContainer activeOpacity={0.8} onPress={onPress} style={androidStyle}>
      <Text size="lg" weight="medium" color="$text" marginBottom="$2">
        {title}
      </Text>
      {children}
    </CardContainer>
  )
}