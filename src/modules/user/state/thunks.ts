// src/features/user/thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@/store';
import type { UserData, TipoUsuario } from '@shared/types/user';
import { API_URL } from '@shared/config/env';
import { setUserLoading, setUserError, setUserProfile } from './userSlice';

type UsuarioRest = {
  documentId: string;
  username: string;
  email: string;
  tipo_usuario?: TipoUsuario;
  unidade?: string | null;
  condominio?: { documentId: string; nome: string } | null;
};

// GET /api/users?filters[email][$eq]=...&populate[condominio]=true&populate[unidade]=true
export const loadUserByEmail = createAsyncThunk<
  UserData | null,
  { email: string },
  { dispatch: AppDispatch; state: RootState }
>('user/loadByEmail', async ({ email }, { dispatch }) => {
  try {
    dispatch(setUserLoading(true));
    dispatch(setUserError(null));

    const url = new URL(`${API_URL}/api/users`);
    url.searchParams.set('filters[email][$eq]', email);
    url.searchParams.set('populate', 'condominio,unidade');

    const r = await fetch(url.toString(), { headers: { 'Content-Type': 'application/json' } });
    if (!r.ok) throw new Error(`/users falhou: ${r.status}`);
    const arr: UsuarioRest[] = await r.json();
    const node = arr?.[0];
    if (!node) {
      dispatch(setUserProfile(null));
      return null;
    }

    const user: UserData = {
      id: node.documentId,
      documentId: node.documentId,
      username: node.username,
      email: node.email,
      tipo_usuario: node.tipo_usuario ?? 'visitante',
      unidade: node.unidade ?? null,
      condominio: node.condominio
        ? { id: node.condominio.documentId, nome: node.condominio.nome }
        : null,
    };

    dispatch(setUserProfile(user));
    return user;
  } catch (e: any) {
    const msg = e?.message ?? 'Falha ao carregar usuário';
    dispatch(setUserError(msg));
    throw e;
  } finally {
    dispatch(setUserLoading(false));
  }
});