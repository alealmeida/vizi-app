// src/shared/lib/graphqlClient.ts
import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_URL } from '@shared/config/env';

// Token em memória (não persiste entre reloads; persiste via Redux/AsyncStorage)
let authToken: string | null = null;

/** Retorna uma instância configurada do GraphQLClient com Authorization se houver token */
export const getGraphQLClient = () => {
  return new GraphQLClient(GRAPHQL_URL, {
    headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
  });
};

/** Define o token para ser usado nas próximas requisições GraphQL */
export const setAuthToken = (token: string | null) => {
  authToken = token;
};

/** Limpa o token */
export const clearAuthToken = () => {
  authToken = null;
};