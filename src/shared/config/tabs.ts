// src/shared/config/tabs.ts
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

export type TabsContext = {
  isLoggedIn: boolean;
  user?: { profile?: { role?: string } } | null;
  condo?: { id?: string; slug?: string } | null;
  unreadCount?: number;
  featureFlags?: Record<string, boolean>;
  t?: (key: string) => string;
};

export type TabId = 'feed' | 'profile';

export type TabConfig = {
  id: TabId;
  name: string; // nome da rota dentro de (tabs)
  title: string | ((ctx: TabsContext) => string);
  icon:
    | keyof typeof Ionicons.glyphMap
    | ((color: string, size: number) => React.ReactNode);
  order?: number;
  canShow?: (ctx: TabsContext) => boolean;
  badge?: (ctx: TabsContext) => number | string | undefined;
};

// Registro base — ponto único de extensão
const registry: Record<TabId, TabConfig> = {
  feed: {
    id: 'feed',
    name: 'feed',
    title: (ctx) => ctx.t?.('tabs.feed') ?? 'Feed',
    icon: 'list-outline',
    order: 10,
    badge: (ctx) =>
      ctx.unreadCount && ctx.unreadCount > 0 ? ctx.unreadCount : undefined,
  },
  profile: {
    id: 'profile',
    name: 'profile',
    title: (ctx) => ctx.t?.('tabs.profile') ?? 'Perfil',
    icon: 'person-circle-outline',
    order: 20,
  },
};

// Overrides por condomínio (opcional)
type CondoOverrides = Partial<Record<TabId, Partial<TabConfig>>>;
const condoOverrides: Record<string /* condo.slug */, CondoOverrides> = {
  // 'vizi-torre-a': { feed: { title: 'Mural' } },
};

export function resolveTabs(ctx: TabsContext): TabConfig[] {
  return Object.values(registry)
    .map((base) => {
      const override =
        ctx.condo?.slug ? condoOverrides[ctx.condo.slug]?.[base.id] : undefined;
      const merged: TabConfig = { ...base, ...(override ?? {}) };

      if (merged.canShow && !merged.canShow(ctx)) return null;

      return merged;
    })
    .filter((x): x is TabConfig => !!x)
    .sort(
      (a, b) => (a.order ?? 999) - (b.order ?? 999)
    )
    .map((tab) => ({
      ...tab,
      title:
        typeof tab.title === 'function'
          ? (tab.title as (c: TabsContext) => string)(ctx)
          : tab.title,
    }));
}