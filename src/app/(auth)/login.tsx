// src/app/(auth)/login.tsx
import React, { useEffect } from 'react';
import LoginScreen from '@features/auth/screens/LoginScreen';
import SlideFade from './components/SlideFade';
import { useAuthNav } from './AuthNavContext';

export default function LoginRoute() {
  const { getDir } = useAuthNav();

  useEffect(() => {
    console.log('[Route] (auth)/login mounted');
  }, []);

  return (
    <SlideFade dir={getDir('login')} offset={16} duration={200}>
      <LoginScreen />
    </SlideFade>
  );
}
