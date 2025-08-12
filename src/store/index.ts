import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// opcional: se estiver usando filtros, mantenha-os aqui
// import { createFilter } from 'redux-persist-transform-filter';

import authReducer from '@modules/auth/state/authSlice';
import userReducer from '@modules/user/state/userSlice';
import feedReducer from '@modules/feed/state/feedSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  feed: feedReducer,
});
export type RootReducerState = ReturnType<typeof rootReducer>; // <- estado NÃO-optional por slice

const persistConfig = {
  key: 'vizi-root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['auth', 'user'],
  // transforms: [createFilter('auth', ['token']), createFilter('user', ['profile'])], // (opcional)
};

// 🔧 Passe o tipo explícito para não “optionalizar” os slices
const persistedReducer = persistReducer<RootReducerState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
    }),
});

export const persistor = persistStore(store);

// Tipos globais
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;