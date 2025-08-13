// src/app/(modals)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // Queremos "card" para permitir o push lateral (iOS/Android)
        presentation: 'card',
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    />
  );
}