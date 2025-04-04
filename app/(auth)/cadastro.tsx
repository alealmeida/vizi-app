import { useState } from 'react'
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native'
import { gql } from 'graphql-request'
import { gqlClient } from '../../lib/api'
import { useAuth } from '../../hooks/authContext'

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

      await login(data.register.jwt) // 🔥 login automático após cadastro
    } catch (err: any) {
      console.error(err)
      Alert.alert('Erro', err?.message || 'Erro ao registrar')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome de usuário" onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" onChangeText={setEmail} autoCapitalize="none" style={styles.input} />
      <TextInput placeholder="Senha" secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Cadastrar e Entrar" onPress={handleCadastro} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 100 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }
})