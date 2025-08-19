// src/app/logout.tsx
import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '@store';
import { authLogout } from '@features/auth/state/thunks';

export default function LogoutRoute() {
  useEffect(() => {
    (async () => {
      try { await AsyncStorage.removeItem('persist:vizi-root'); } catch {}
      store.dispatch(authLogout()); // <- não depende de Provider
      console.log('[logout] dispatched authLogout()');
    })();
  }, []);
  return <Redirect href="/(auth)/login" />;
}