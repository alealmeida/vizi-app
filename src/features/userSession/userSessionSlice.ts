import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserSessionState {
  token: string | null;
  user: User | null;
}

const initialState: UserSessionState = {
  token: null,
  user: null,
};

const userSessionSlice = createSlice({
  name: 'userSession',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserSessionState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = userSessionSlice.actions;
export const userSessionReducer = userSessionSlice.reducer;