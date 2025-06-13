import { gql } from 'graphql-request';
import { gqlClient } from '@/config/graphqlClient';
import { AuthResponse } from './types';

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(input: { username: $username, email: $email, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

// Intermediate type matching the GraphQL response structure for the 'register' field
// This is identical to AuthResponse but defined for clarity of GraphQL payload.
type GqlRegisterPayload = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

// Type for the full GraphQL response
type FullRegisterGqlResponse = {
  register: GqlRegisterPayload;
};

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const variables = { username, email, password };
  try {
    const data = await gqlClient.request<FullRegisterGqlResponse>(REGISTER_MUTATION, variables);

    if (!data || !data.register) {
      throw new Error('Registration failed: Invalid response structure from server.');
    }
    // data.register directly matches AuthResponse structure
    return data.register;
  } catch (error: any) {
    console.error('GraphQL registration error:', error);
    const message = error?.response?.errors?.[0]?.message || error?.message || 'Erro ao registrar com GraphQL';
    throw new Error(message);
  }
}