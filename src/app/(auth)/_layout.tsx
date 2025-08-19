// src/app/(auth)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { AuthNavProvider } from './_components/AuthNavContext';

export default function AuthLayout() {
  return (
    <AuthNavProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          // Desliga animação nativa para usarmos nossa SlideFade custom
          animation: 'none',
          gestureEnabled: true,
          presentation: 'card',
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        {/* index redireciona para login */}
        <Stack.Screen name="index" options={{ animation: 'none' }} />
      </Stack>
    </AuthNavProvider>
  );
}
