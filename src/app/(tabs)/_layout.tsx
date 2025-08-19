// src/app/(tabs)/_layout.tsx
import React, { useMemo } from 'react';
import { Tabs, useSegments } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { resolveTabs, type TabsContext } from '@shared/config/tabs';
import { selectAuthToken, selectUserProfile, selectFeedUnread } from '@store/selectors';
import { refreshMe } from '@features/auth/state/thunks';

// grupos dentro de (tabs) onde a tab bar NÃO deve aparecer
const HIDE_TAB_GROUPS = new Set(['post']); // ex.: (tabs)/post/[documentId]

export default function TabsLayout() {
  // 🔎 seletores finos (evita rerender desnecessário)
  const token = useAppSelector(selectAuthToken);
  const user  = useAppSelector(selectUserProfile);
  const dispatch = useAppDispatch();
  // feed não tem unread hoje — mantém compatível (sem badge)
  const unreadCount = useAppSelector(selectFeedUnread);

  // Atualiza o perfil quando houver token e a tela de tabs ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        // dispara e deixa o thunk decidir se atualiza
        dispatch(refreshMe());
      }
      return () => {};
    }, [token, dispatch])
  );

  const ctx = useMemo<TabsContext>(() => {
    const base: TabsContext = {
      isLoggedIn: !!token,
      // omitir slug quando desconhecido para compatibilizar com exactOptionalPropertyTypes
      condo: user?.condominio ? { id: String(user.condominio.id) } : null,
      featureFlags: {}, // não temos flags ainda
      t: (key) => (key === 'tabs.feed' ? 'Feed' : key === 'tabs.profile' ? 'Perfil' : key),
    };

    return {
      ...base,
      ...(user ? { user: { profile: {} } } : {}),
      ...(unreadCount !== undefined ? { unreadCount } : {}),
    } as TabsContext;
  }, [token, user, unreadCount]);

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
      {tabs.map((tab) => {
        const title = typeof tab.title === 'string' ? tab.title : tab.title(ctx);
        const badgeVal = tab.badge ? tab.badge(ctx) : undefined;
        return (
          <Tabs.Screen
            key={tab.id}
            name={tab.name}
            options={{
              title,
              tabBarIcon: ({ color, size }) =>
                typeof tab.icon === 'function'
                  ? (tab.icon as any)(color, size)
                  : <Ionicons name={tab.icon as any} size={size} color={color} />,
              // incluir apenas quando definido para evitar 'undefined' com exactOptionalPropertyTypes
              ...(badgeVal !== undefined ? { tabBarBadge: badgeVal } : {}),
            }}
          />
        );
      })}
      {/* Rotas não listadas (ex.: post/[documentId]) NÃO viram aba */}
    </Tabs>
  );
}