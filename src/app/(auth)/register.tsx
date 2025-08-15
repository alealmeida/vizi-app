// src/app/(auth)/register.tsx
import React, { useEffect } from 'react';
import RegisterScreen from '@modules/auth/screens/RegisterScreen';
import SlideFade from './components/SlideFade';
import { useAuthNav } from './AuthNavContext';

export default function RegisterRoute() {
  const { getDir } = useAuthNav();

  useEffect(() => {
    console.log('[Route] (auth)/register mounted');
  }, []);

  return (
    <SlideFade dir={getDir('register')} offset={16} duration={200}>
      <RegisterScreen />
    </SlideFade>
  );
}