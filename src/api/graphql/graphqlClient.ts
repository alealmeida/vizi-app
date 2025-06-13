import { loadSession } from '@/utils/sessionStorage'

const GRAPHQL_URL = 'http://localhost:1337/graphql'

interface GraphQLRequestOptions {
  query: string
  variables?: Record<string, any>
  auth?: boolean
}

/**
 * Faz uma chamada GraphQL genérica usando fetch e injeta o token se necessário.
 */
export async function graphqlRequest<T = any>({
  query,
  variables = {},
  auth = true,
}: GraphQLRequestOptions): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    const { token } = await loadSession()
    if (!token) throw new Error('Usuário não autenticado')
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  })

  const json = await response.json()

  if (json.errors) {
    console.error('GraphQL Error:', json.errors)
    throw new Error(json.errors[0].message)
  }

  return json.data
}