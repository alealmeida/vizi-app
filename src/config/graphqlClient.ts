import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://127.0.0.0:1337/graphql'; // depois vamos ler de .env

export const graphqlClient = (token?: string) =>
  new GraphQLClient(endpoint, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

