// src/app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs, useSegments } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppSelector } from '@store/hooks';
import { resolveTabs } from '@shared/config/tabs';

// grupos dentro de (tabs) onde a tab bar NÃO deve aparecer
const HIDE_TAB_GROUPS = new Set(['post']); // ex.: (tabs)/post/[documentId]

export default function TabsLayout() {
  const state = useAppSelector((s) => s as any);
  const tabs = resolveTabs(state);

  // Detecta se estamos dentro de algum grupo “oculto”
  const segments = useSegments();                // p.ex.: ['(tabs)', 'post', '[documentId]']
  const segArr = Array.isArray(segments) ? segments : [];
  const inHiddenGroup = segArr.some(s => HIDE_TAB_GROUPS.has(String(s)));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2260FF',
        tabBarInactiveTintColor: '#6b7280',
        // 👇 esconde a bottom bar nas rotas de detalhe
        tabBarStyle: inHiddenGroup ? { display: 'none' } : undefined,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.id}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) =>
              typeof tab.icon === 'function'
                ? (tab.icon as any)(color, size)
                : <Ionicons name={tab.icon as any} size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}