import { AuthResponse } from './types';

const BASE_URL = 'http://localhost:1337/api'; // ⚠️ Usar ENV depois

export async function registerUser(
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/local/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error?.message || 'Erro ao registrar');
  }

  return res.json();
}