import { gql } from 'graphql-request';
import { gqlClient } from '@/config/graphqlClient';
import { AuthResponse } from './types';

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

type GqlLoginPayload = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

type FullLoginGqlResponse = {
  login: GqlLoginPayload;
};

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const variables = { identifier: email, password: password };
  try {
    const data = await gqlClient.request<FullLoginGqlResponse>(LOGIN_MUTATION, variables);
    if (!data || !data.login) {
      throw new Error('Login failed: Invalid response structure from server.');
    }
    return data.login;
  } catch (error: any) {
    console.error('GraphQL login error:', error);
    const message = error?.response?.errors?.[0]?.message || error?.message || 'Erro ao fazer login com GraphQL';
    throw new Error(message);
  }
}