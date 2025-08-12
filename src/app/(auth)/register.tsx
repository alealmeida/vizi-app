
// src/app/(auth)/register.tsx
import React, { useEffect } from 'react';
import RegisterScreen from '@modules/auth/screens/RegisterScreen';

export default function RegisterRoute() {
  useEffect(() => {
    console.log('[Route] (auth)/register mounted');
  }, []);
  return <RegisterScreen />;
}