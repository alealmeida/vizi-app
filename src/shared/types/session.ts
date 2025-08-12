// src/types/session.ts
import { UserData } from '@shared/types/user'

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface SessionState {
  token: string | null
  user: UserData | null
  email: string
  password: string
  error: string
  status?: Status // opcional por enquanto (caso queira usar futuramente para loading)
}