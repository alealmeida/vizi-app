import { AuthResponse } from './types'

const BASE_URL = 'http://localhost:1337/api'

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/local`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: email,
      password,
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.error?.message || 'Erro ao fazer login')
  }

  return res.json()
}