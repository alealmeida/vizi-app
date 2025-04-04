import { useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

export default function DetalheVizinhança() {
  const { id } = useLocalSearchParams()
  return <Text>Detalhes da vizinhança: {id}</Text>
}