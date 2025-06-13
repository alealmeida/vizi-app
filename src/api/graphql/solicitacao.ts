import { graphqlRequest } from './graphqlClient'

export async function createSolicitacao(data: any) {
  const query = `
    mutation CreateSolicitacao($data: SolicitacaoInput!) {
      createSolicitacao(data: $data) {
        data {
          id
          attributes {
            tipo
            state
          }
        }
      }
    }
  `

  return graphqlRequest({ query, variables: { data } })
}