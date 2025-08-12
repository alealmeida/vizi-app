// src/features/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserData } from '@shared/types/user';

export type UserState = {
  profile: UserData | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLoading(state: UserState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUserError(state: UserState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setUserProfile(state: UserState, action: PayloadAction<UserData | null>) {
      state.profile = action.payload;
    },
    updateUserField<K extends keyof UserData>(
      state: UserState,
      action: PayloadAction<{ key: K; value: UserData[K] }>
    ) {
      if (state.profile) {
        state.profile = { ...state.profile, [action.payload.key]: action.payload.value };
      }
    },
    resetUserError(state: UserState) {
      state.error = null;
    },
  },
});

export const {
  setUserLoading,
  setUserError,
  setUserProfile,
  updateUserField,
  resetUserError,
} = slice.actions;

export default slice.reducer;