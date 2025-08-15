import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthLoading, setAuthError, setAuthToken, clearAuth } from '@modules/auth/state/authSlice';
import { setUserProfile } from '@modules/user/state/userSlice';
import { bootstrapUserFromUsuarioMe } from '@modules/user/state/thunks';
import type { AppDispatch, RootState } from '@/store';

import { loginRest, type LoginInput } from '@modules/auth/api/login';
import { registerRest, type RegisterInput } from '@modules/auth/api/register';
import type { UserData } from '@shared/types/user';

import {
  setAuthToken as setGraphQLAuthToken,
  clearAuthToken as clearGraphQLAuthToken,
} from '@shared/lib/graphqlClient';

// Removido: adapter de /users/me. Perfil agora vem de /api/usuarios/me via user thunk.

// LOGIN
export const authLogin = createAsyncThunk<{ token: string; me: UserData }, LoginInput, { dispatch: AppDispatch; state: RootState }>(
  'auth/login',
  async (input, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));
      dispatch(setAuthError(null));

      const { jwt } = await loginRest(input);
      dispatch(setAuthToken(jwt));
      setGraphQLAuthToken(jwt);

      // Carrega perfil diretamente do endpoint custom de usuarios
      const res = await dispatch(bootstrapUserFromUsuarioMe());
      if (bootstrapUserFromUsuarioMe.rejected.match(res)) {
        throw new Error('Falha ao carregar perfil');
      }
      const me = res.payload as UserData;

      return { token: jwt, me };
    } catch (e: any) {
      const msg = e?.message ?? 'Falha ao autenticar';
      dispatch(setAuthError(msg));
      return rejectWithValue(msg);
    } finally {
      dispatch(setAuthLoading(false));
    }
  }
);

// REGISTER
export const authRegister = createAsyncThunk<{ token: string }, RegisterInput, { dispatch: AppDispatch; state: RootState }>(
  'auth/register',
  async (input, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));
      dispatch(setAuthError(null));

      const { jwt } = await registerRest(input);
      dispatch(setAuthToken(jwt));
      setGraphQLAuthToken(jwt);

      const res = await dispatch(bootstrapUserFromUsuarioMe());
      if (bootstrapUserFromUsuarioMe.rejected.match(res)) {
        throw new Error('Falha ao carregar perfil');
      }

      return { token: jwt };
    } catch (e: any) {
      const msg = e?.message ?? 'Falha ao registrar';
      dispatch(setAuthError(msg));
      return rejectWithValue(msg);
    } finally {
      dispatch(setAuthLoading(false));
    }
  }
);

// LOGOUT
export const authLogout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  dispatch(clearAuth());
  dispatch(setUserProfile(null));
  clearGraphQLAuthToken();
  return true;
});

// REFRESH ME (usar em focos/reloads)
export const refreshMe = createAsyncThunk<UserData | null, void, { dispatch: AppDispatch; state: RootState }>(
  'auth/refreshMe',
  async (_: void, { getState, dispatch }) => {
    const token: string | null = getState()?.auth?.token ?? null;
    if (!token) return null;
    try {
      const res = await dispatch(bootstrapUserFromUsuarioMe());
      if (bootstrapUserFromUsuarioMe.rejected.match(res)) return null;
      return (res.payload as UserData) ?? null;
    } catch {
      // mantém perfil atual se falhar
      return null;
    }
  }
);