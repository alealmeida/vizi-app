import { GraphQLClient } from 'graphql-request'

export const gqlClient = new GraphQLClient('http://localhost:1337/graphql', {
  headers: {},
})