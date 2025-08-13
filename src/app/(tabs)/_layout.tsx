// src/app/(tabs)/_layout.tsx
import React, { useMemo } from 'react';
import { Tabs, useSegments } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppSelector } from '@store/hooks';
import { resolveTabs, type TabsContext } from '@shared/config/tabs';

// grupos dentro de (tabs) onde a tab bar NÃO deve aparecer
const HIDE_TAB_GROUPS = new Set(['post']); // ex.: (tabs)/post/[documentId]

export default function TabsLayout() {
  // 🔎 seletores finos (evita rerender desnecessário)
  const token = useAppSelector((s) => s.auth.token);
  const user  = useAppSelector((s) => s.user.profile);
  // feed não tem unread hoje — mantém compatível (sem badge)
  const unreadCount = useAppSelector((s) => (s as any)?.feed?.unread as number | undefined);

  const ctx = useMemo<TabsContext>(() => ({
    isLoggedIn: !!token,
    user: user ? { profile: { /* role ausente */ } } : undefined,
    condo: user?.condominio ? { id: String((user as any).condominio?.id ?? ''), slug: undefined } : null,
    unreadCount,
    featureFlags: {}, // não temos flags ainda
    t: (key) => (key === 'tabs.feed' ? 'Feed' : key === 'tabs.profile' ? 'Perfil' : key),
  }), [token, user, unreadCount]);

  const tabs = useMemo(() => resolveTabs(ctx), [ctx]);

  // esconder tab bar quando estamos em um “subgrupo” invisível (ex.: post)
  const segments = useSegments(); // p.ex.: ['(tabs)', 'post', '[documentId]']
  const segArr   = Array.isArray(segments) ? segments : [];
  const childGroup = segArr.length > 1 ? String(segArr[1]) : null;
  const inHiddenGroup = childGroup != null && HIDE_TAB_GROUPS.has(childGroup);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2260FF',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: inHiddenGroup ? { display: 'none' } : undefined,
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.id}
          name={tab.name}
          options={{
            title: typeof tab.title === 'string' ? tab.title : tab.title(ctx),
            tabBarIcon: ({ color, size }) =>
              typeof tab.icon === 'function'
                ? (tab.icon as any)(color, size)
                : <Ionicons name={tab.icon as any} size={size} color={color} />,
            tabBarBadge: tab.badge ? tab.badge(ctx) : undefined,
          }}
        />
      ))}
      {/* Rotas não listadas (ex.: post/[documentId]) NÃO viram aba */}
    </Tabs>
  );
}