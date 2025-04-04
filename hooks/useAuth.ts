import * as SecureStore from 'expo-secure-store'
import { gqlClient } from '../lib/api'
import { gql } from 'graphql-request'

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

export async function login(identifier: string, password: string) {
  const variables = { identifier, password }

  const data = await gqlClient.request<LoginResponse>(LOGIN_MUTATION, variables)

  if (!data?.login?.jwt) {
    throw new Error('Login inválido')
  }

  await SecureStore.setItemAsync('jwt', data.login.jwt)
  return data.login.user
}

export async function getToken() {
  return await SecureStore.getItemAsync('jwt')
}

export async function logout() {
  await SecureStore.deleteItemAsync('jwt')
}