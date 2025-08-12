// src/app/_layout.tsx
import React, { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store';

import { Slot, useSegments, useRouter } from 'expo-router';
import { useAppSelector } from '@store/hooks';
import { setAuthToken as setGqlToken } from '@shared/lib/graphqlClient';

function AuthGateInner() {
  const router = useRouter();
  const segments = useSegments();
  const token = useAppSelector((s) => s.auth.token);

  // Mantém token do GraphQL client em sincronia
  useEffect(() => {
    setGqlToken(token ?? null);
  }, [token]);

  const group = useMemo(() => (segments?.length ? segments[0] : null), [segments]);
  const inAuth = group === '(auth)';
  const inTabs = group === '(tabs)';
  const atRoot = !inAuth && !inTabs;

  useEffect(() => {
    // logs úteis (opcional)
    console.log('[AuthGate]', { token: !!token, segments, group, atRoot });
    if (!token && (inTabs || atRoot)) {
      router.replace('/(auth)/login');
    } else if (token && (inAuth || atRoot)) {
      router.replace('/(tabs)/feed');
    }
  }, [token, inAuth, inTabs, atRoot, router, segments, group]);

  // SEM suspense / SEM loading: sempre renderiza a rota atual
  return <Slot />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthGateInner />
      </PersistGate>
    </Provider>
  );
}