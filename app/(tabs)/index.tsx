import { View, Text, Button, StyleSheet } from 'react-native'
import { useAuth } from '../../hooks/authContext'

export default function HomeScreen() {
  const { logout } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Você está logado ✅</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 20 }
})