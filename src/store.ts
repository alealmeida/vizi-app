import { configureStore } from '@reduxjs/toolkit';
import { userSessionReducer } from './features/userSession/userSessionSlice';

export const store = configureStore({
  reducer: {
    userSession: userSessionReducer,
  },
});

// 👇 ADICIONE ISSO
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;