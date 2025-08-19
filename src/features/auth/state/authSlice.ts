import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuthError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetAuthError(state) {
      state.error = null;
    },
    setAuthToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setAuthLoading, setAuthError, resetAuthError, setAuthToken, clearAuth } = slice.actions;
export default slice.reducer;