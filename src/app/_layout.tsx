// src/app/_layout.tsx
import React, { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store';

import { Stack, Slot, useSegments, useRouter } from 'expo-router';
import { useAppSelector } from '@store/hooks';
import { setAuthToken as setGqlToken } from '@shared/lib/graphqlClient';

function AuthGateInner() {
  const router = useRouter();
  const segments = useSegments();
  const token = useAppSelector((s) => s.auth.token);

  useEffect(() => { setGqlToken(token ?? null); }, [token]);

  const group = useMemo(() => (segments?.length ? segments[0] : null), [segments]);
  const inAuth = group === '(auth)';
  const inTabs = group === '(tabs)';
  const atRoot = !inAuth && !inTabs;

  useEffect(() => {
    if (!token && (inTabs || atRoot)) router.replace('/(auth)/login');
    else if (token && (inAuth || atRoot)) router.replace('/(tabs)/feed');
  }, [token, inAuth, inTabs, atRoot, router, segments, group]);

  // Root Stack: Tabs como uma screen; detalhes fora das tabs
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      {/* Detalhe do post como modal/sheet (fora das tabs) */}
      <Stack.Screen
        name="post/[documentId]"
        options={{
          // iOS: sheet; Android: modal
          presentation: 'modal',
          headerShown: true,
          title: '',
        }}
      />
    </Stack>
  );
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