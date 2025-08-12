// src/modules/auth/api/me.ts
import { API_URL } from '@shared/config/env';

export type MeOutput = Record<string, any>;

export async function getMe(jwt?: string | null): Promise<MeOutput> {
  if (!jwt) throw new Error('Sem token');

  // ❌ tira o populate por enquanto
  const url = `${API_URL}/api/users/me`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${jwt}`, 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`/users/me falhou (${res.status}): ${text || res.statusText}`);
  }

  return (await res.json()) as MeOutput;
}