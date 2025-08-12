import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthLoading, setAuthError, setAuthToken, clearAuth } from '@modules/auth/state/authSlice';
import { setUserProfile } from '@modules/user/state/userSlice';

import { loginRest, type LoginInput } from '@modules/auth/api/login';
import { registerRest, type RegisterInput } from '@modules/auth/api/register';
import { getMe, type MeOutput } from '@modules/auth/api/me';
import type { UserData } from '@shared/types/user';

import {
  setAuthToken as setGraphQLAuthToken,
  clearAuthToken as clearGraphQLAuthToken,
} from '@shared/lib/graphqlClient';

// Adapter: MeOutput -> UserData
function toUserData(me: MeOutput): UserData {
  return {
    id: String((me as any)?.documentId ?? (me as any)?.id ?? ''),
    username: (me as any)?.username ?? '',
    email: (me as any)?.email ?? '',
    tipo_usuario: (me as any)?.tipo_usuario ?? 'visitante',
    condominio: (me as any)?.condominio ?? null,
    unidade: (me as any)?.unidade ?? null,
  };
}

// LOGIN
export const authLogin = createAsyncThunk<{ token: string; me: UserData }, LoginInput>(
  'auth/login',
  async (input, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));
      dispatch(setAuthError(null));

      const { jwt } = await loginRest(input);
      dispatch(setAuthToken(jwt));
      setGraphQLAuthToken(jwt);

      const meRaw = await getMe(jwt);
      const me = toUserData(meRaw);
      dispatch(setUserProfile(me));

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
export const authRegister = createAsyncThunk<{ token: string }, RegisterInput>(
  'auth/register',
  async (input, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAuthLoading(true));
      dispatch(setAuthError(null));

      const { jwt } = await registerRest(input);
      dispatch(setAuthToken(jwt));
      setGraphQLAuthToken(jwt);

      const meRaw = await getMe(jwt);
      const me = toUserData(meRaw);
      dispatch(setUserProfile(me));

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