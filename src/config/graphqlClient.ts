import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:1337/graphql'; // Standardized endpoint

// Function to create a new client, potentially with a token
export const createGraphQLClient = (token?: string) =>
  new GraphQLClient(endpoint, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

// Default/global client instance (unauthenticated)
export const gqlClient = createGraphQLClient();
