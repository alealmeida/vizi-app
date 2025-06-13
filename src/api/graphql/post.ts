import { graphqlRequest } from './graphqlClient'

export async function createPost(data: any) {
  const query = `
    mutation CreatePost($data: PostInput!) {
      createPost(data: $data) {
        data {
          id
          attributes {
            title
            description
            publicacao
          }
        }
      }
    }
  `

  return graphqlRequest({ query, variables: { data } })
}