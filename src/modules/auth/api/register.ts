// src/lib/api/auth/register.ts
import { REST_REGISTER_URL } from '@shared/config/env';

export type RegisterInput = { username: string; email: string; password: string };
export type RegisterOutput = { jwt: string };

export async function registerRest(input: RegisterInput): Promise<RegisterOutput> {
  const r = await fetch(REST_REGISTER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    throw new Error(`Register falhou: ${r.status} ${t}`);
  }
  const data = await r.json();
  if (!data?.jwt) throw new Error('Resposta inesperada no register');
  return { jwt: data.jwt };
}