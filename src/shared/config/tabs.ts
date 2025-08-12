// src/shared/config/tabs.ts
export type TabsContext = {
  user?: any;
  featureFlags?: Record<string, boolean> | undefined;
};

export type TabId = 'feed' | 'profile' | 'market' | 'admin';

export type TabConfig = {
  id: TabId;
  name: string;
  title: string;
  icon: string | ((color: string, size: number) => React.ReactNode);
  flag?: string;
  canShow?: (ctx: TabsContext) => boolean;
  badge?: (ctx: TabsContext) => number | undefined;
};

export const baseTabs: TabConfig[] = [
  { id: 'feed',    name: 'feed',    title: 'Feed',   icon: 'list-outline' },
  { id: 'profile', name: 'profile', title: 'Perfil', icon: 'person-circle-outline' },

  // exemplos futuros:
  // { id: 'market', name: 'market', title: 'Market', icon: 'cart-outline', flag: 'market' },
  // { id: 'admin',  name: 'admin',  title: 'Admin',  icon: 'settings-outline',
  //   canShow: (ctx) => ctx.user?.profile?.role === 'admin' },
];

export function resolveTabs(ctx: TabsContext) {
  return baseTabs.filter((t) => {
    if (t.flag && !ctx?.featureFlags?.[t.flag]) return false;
    if (t.canShow && !t.canShow(ctx)) return false;
    return true;
  });
}