// src/app/(auth)/register.tsx
import React from 'react';
import RegisterScreen from '@features/auth/screens/RegisterScreen';
import SlideFade from './components/SlideFade';
import { useAuthNav } from './_components/AuthNavContext';

export default function RegisterRoute() {
  const { getDir } = useAuthNav();

  return (
    <SlideFade dir={getDir('register')} offset={16} duration={200}>
      <RegisterScreen />
    </SlideFade>
  );
}