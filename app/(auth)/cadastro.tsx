import { useState } from 'react'
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { gql } from 'graphql-request'
import { gqlClient } from '@/config/graphqlClient'
import { useAuth } from '../../hooks/authContext'
import { router } from 'expo-router'

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(input: {
      username: $username,
      email: $email,
      password: $password
    }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

type RegisterResponse = {
  register: {
    jwt: string
    user: {
      id: number
      username: string
      email: string
    }
  }
}

export default function CadastroScreen() {
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleCadastro = async () => {
    try {
      const variables = { username, email, password }
      const data = await gqlClient.request<RegisterResponse>(REGISTER_MUTATION, variables)

      if (!data?.register?.jwt) {
        throw new Error('Erro ao registrar')
      }

      await login(data.register.jwt)
    } catch (err: any) {
      console.error(err)
      Alert.alert('Erro', err?.message || 'Erro ao registrar')
    }
  }

  const goToLogin = () => {
    router.replace('/(auth)/login')
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome de usuário" onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={setEmail} autoCapitalize="none" style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Cadastrar" onPress={handleCadastro} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Login" onPress={goToLogin} color="#888" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }
})