import { saveSession } from '../../utils/sessionStorage';

const GRAPHQL_URL = 'http://localhost:1337/graphql';

export async function login(identifier: string, password: string) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
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
      `,
      variables: { identifier, password },
    }),
  });

  const result = await response.json();
  const { jwt, user } = result.data.login;

  await saveSession(jwt, user); // <-- armazena token e user localmente
  return { jwt, user };
}