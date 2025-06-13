import { View } from 'tamagui'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { registerUser } from '@/api/auth/register'
import { saveSession } from '@/utils/sessionStorage'
import { setCredentials } from '@/features/userSession/userSessionSlice'
import BaseScreen from '@/components/BaseScreen'
import { Text } from '@/components/Text'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

export default function RegisterScreen() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigation = useNavigation<any>()

  const handleRegister = async () => {
    setLoading(true)
    try {
      const res = await registerUser(username, email, password)
      await saveSession(res.jwt, res.user)
      dispatch(
        setCredentials({
          token: res.jwt,
          user: {
            id: res.user.id.toString(),
            username: res.user.username,
            email: res.user.email,
          },
        })
      )
    } catch {
      alert('Erro ao registrar. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <BaseScreen>
      <Text size="xl" weight="bold" color="$primary" textAlign="center" marginBottom="$6">
        Criar conta
      </Text>

      <View gap="$4" width="100%">
        <Input
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View marginTop="$6" width="100%">
        <Button onPress={handleRegister} disabled={loading}>
          <Text weight="bold" color="$background">
            Cadastrar
          </Text>
        </Button>
      </View>

      <View marginTop="$4" width="100%">
        <Button variant="outlined" onPress={() => navigation.navigate('Login')}>
          <Text weight="bold" color="$primary">
            Já tenho uma conta
          </Text>
        </Button>
      </View>
    </BaseScreen>
  )
}