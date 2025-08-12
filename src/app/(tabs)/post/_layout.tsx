// src/app/(tabs)/post/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function PostStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[documentId]" />
    </Stack>
  );
}