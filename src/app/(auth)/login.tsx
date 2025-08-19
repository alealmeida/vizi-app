// src/app/(auth)/login.tsx
import React from 'react';
import LoginScreen from '@features/auth/screens/LoginScreen';
import SlideFade from './components/SlideFade';
import { useAuthNav } from './_components/AuthNavContext';

export default function LoginRoute() {
  const { getDir } = useAuthNav();

  return (
    <SlideFade dir={getDir('login')} offset={16} duration={200}>
      <LoginScreen />
    </SlideFade>
  );
}
