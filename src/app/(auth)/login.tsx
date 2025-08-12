
// src/app/(auth)/login.tsx
import React, { useEffect } from 'react';
import LoginScreen from '@modules/auth/screens/LoginScreen';

export default function LoginRoute() {
  useEffect(() => {
    console.log('[Route] (auth)/login mounted');
  }, []);
  return <LoginScreen />;
}
