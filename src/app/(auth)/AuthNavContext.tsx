// src/app/(auth)/AuthNavContext.tsx
import React, { createContext, useContext, useMemo, useRef, useEffect } from 'react';
import { useSegments } from 'expo-router';

export type AuthRouteName = 'login' | 'register' | 'index' | string;
export type TransitionDir = 'forward' | 'back' | 'none';

const AuthNavCtx = createContext<{ lastRoute: AuthRouteName | null; getDir: (current: AuthRouteName) => TransitionDir }>({
  lastRoute: null,
  getDir: () => 'none',
});

export function AuthNavProvider({ children }: { children: React.ReactNode }) {
  const segments = useSegments();
  const last = useRef<AuthRouteName | null>(null);

  const current: AuthRouteName | null = useMemo(() => {
    if (!Array.isArray(segments)) return null;
    const arr = (segments as unknown as string[]) || [];
    const group = arr[0];
    const page = arr.length > 1 ? arr[1] : 'index';
    if (group === '(auth)') {
      return page as AuthRouteName;
    }
    return null;
  }, [segments]);

  useEffect(() => {
    if (current) {
      last.current = current;
    }
  }, [current]);

  const getDir = (screen: AuthRouteName): TransitionDir => {
    const prev = last.current;
    if (!prev) return 'none';
    if (prev === screen) return 'none';
    // mapa simples de direção entre as telas de auth
    if (prev === 'login' && screen === 'register') return 'forward';
    if (prev === 'register' && screen === 'login') return 'back';
    return 'none';
  };

  return (
    <AuthNavCtx.Provider value={{ lastRoute: last.current, getDir }}>
      {children}
    </AuthNavCtx.Provider>
  );
}

export function useAuthNav() {
  return useContext(AuthNavCtx);
}
