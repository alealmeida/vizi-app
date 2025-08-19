// src/lib/api/auth/login.ts
import { REST_LOGIN_URL } from '@shared/config/env';

export type LoginInput = { identifier: string; password: string };
export type LoginOutput = { jwt: string };

export async function loginRest(input: LoginInput): Promise<LoginOutput> {
  const r = await fetch(REST_LOGIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!r.ok) {
    const t = await r.text().catch(() => '');
    throw new Error(`Login falhou: ${r.status} ${t}`);
  }
  const data = await r.json();
  if (!data?.jwt) throw new Error('Resposta inesperada no login');
  return { jwt: data.jwt };
}