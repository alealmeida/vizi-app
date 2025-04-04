import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

export default function VizinhancaHome() {
  return (
    <View>
      <Text>Lista da Vizinhança</Text>
      <Button title="Ir para perfil do vizinho" onPress={() => router.push('/perfil/123')} />
    </View>
  )
}