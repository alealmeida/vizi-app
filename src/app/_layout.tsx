// src/app/_layout.tsx
import React, { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store';

import { Slot, useSegments, useRouter } from 'expo-router';
import { useAppSelector } from '@store/hooks';
import { setAuthToken as setGqlToken } from '@shared/lib/graphqlClient';
import { selectAuthToken } from '@store/selectors';
import { DSProvider } from '@ds/theme/provider';

function AuthGateInner() {
  const router = useRouter();
  const segments = useSegments(); // ex: ['(tabs)', 'feed'] | ['(modals)', 'post', '123']
  const token = useAppSelector(selectAuthToken);

  // Mantém token do GraphQL client em sincronia
  useEffect(() => {
    setGqlToken(token ?? null);
  }, [token]);

  const group = useMemo(() => (segments?.length ? segments[0] : null), [segments]);
  const inAuth   = group === '(auth)';
  const inTabs   = group === '(tabs)';
  const inModals = group === '(modals)';

  // "atRoot" só quando NÃO está em nenhum grupo conhecido
  const atRoot = !inAuth && !inTabs && !inModals;

  useEffect(() => {
    // logs úteis (apenas em dev)
    if (__DEV__) {
      console.log('[AuthGate]', { token: !!token, segments, group, atRoot });
    }
    if (!token && (inTabs || inModals || atRoot)) {
      router.replace('/(auth)/login');
    } else if (token && (inAuth || atRoot)) {
      router.replace('/(tabs)/feed');
    }
  }, [token, inAuth, inTabs, inModals, atRoot, router, segments, group]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DSProvider>
          <AuthGateInner />
        </DSProvider>
      </PersistGate>
    </Provider>
  );
}