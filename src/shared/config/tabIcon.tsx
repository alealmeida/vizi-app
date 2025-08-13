// src/shared/config/tabIcon.tsx
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export function renderTabIcon(
  icon: keyof typeof Ionicons.glyphMap | ((color: string, size: number) => React.ReactNode),
  color: string,
  size: number
) {
  if (typeof icon === 'function') return (icon as any)(color, size);
  return <Ionicons name={icon as any} size={size} color={color} />;
}