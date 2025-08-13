// src/app/(modals)/post/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function PostStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right', gestureEnabled: true }}>
      <Stack.Screen name="[documentId]" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}