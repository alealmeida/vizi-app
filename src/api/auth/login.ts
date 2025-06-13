<<<<<<< HEAD
import { gql } from 'graphql-request';
import { gqlClient } from '@/config/graphqlClient';
import { AuthResponse } from './types';

// Copied from app/(auth)/login.tsx
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
`;

// Intermediate type matching the GraphQL response structure for the 'login' field
type GqlLoginPayload = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

// Type for the full GraphQL response
type FullLoginGqlResponse = {
  login: GqlLoginPayload;
};

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const variables = { identifier: email, password: password };
  try {
    // Make the GraphQL request
    const data = await gqlClient.request<FullLoginGqlResponse>(LOGIN_MUTATION, variables);

    // Transform the response to match AuthResponse
    // data.login directly matches the AuthResponse structure
    if (!data || !data.login) {
      throw new Error('Login failed: Invalid response structure from server.');
    }
    return data.login;
  } catch (error: any) {
    // Log the error or handle it as needed
    console.error('GraphQL login error:', error);
    // Re-throw a more generic error or an error with a specific message
    const message = error?.response?.errors?.[0]?.message || error?.message || 'Erro ao fazer login com GraphQL';
    // It's good practice to check if we're in a browser/node environment before alerting
    // For now, just throw, the UI layer should catch and display
    throw new Error(message);
  }
=======
import { AuthResponse } from './types'

const BASE_URL = 'http://localhost:1337/api'

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.error?.message || 'Erro ao fazer login')
  }

  return res.json()
>>>>>>> 788e211 (ultimo commit estável)
}