import { useState } from 'react'
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { gql } from 'graphql-request'
import { gqlClient } from '../../lib/api'
import { useAuth } from '../../hooks/authContext'
import { router } from 'expo-router'

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

type LoginResponse = {
  login: {
    jwt: string
    user: {
      id: number
      username: string
      email: string
    }
  }
}

export default function LoginScreen() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleLogin = async () => {
    try {
      const variables = { identifier: email, password: senha }
      const data = await gqlClient.request<LoginResponse>(LOGIN_MUTATION, variables)

      await login(data.login.jwt)
    } catch (err) {
      console.error(err)
      Alert.alert('Erro', 'Credenciais inválidas ou erro no login')
    }
  }

  const goToCadastro = () => {
    router.push('/(auth)/cadastro')
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Senha" onChangeText={setSenha} secureTextEntry style={styles.input} />
      <Button title="Entrar" onPress={handleLogin} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Cadastrar" onPress={goToCadastro} color="#888" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }
})