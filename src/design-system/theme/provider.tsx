// src/design-system/theme/provider.tsx
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, type Theme } from './index';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeModeContext = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  isDark: boolean;
};

const ThemeModeCtx = createContext<ThemeModeContext | undefined>(undefined);

export function DSProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>('system');

  const effective: 'light' | 'dark' = useMemo(() => {
    if (mode === 'system') return system === 'dark' ? 'dark' : 'light';
    return mode;
  }, [mode, system]);

  const isDark = effective === 'dark';
  const value = useMemo<ThemeModeContext>(() => ({ mode, setMode, isDark }), [mode, setMode, isDark]);

  return (
    <ThemeModeCtx.Provider value={value}>
      <ThemeProvider theme={(isDark ? darkTheme : lightTheme) as any}>{children}</ThemeProvider>
    </ThemeModeCtx.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeCtx);
  if (!ctx) throw new Error('useThemeMode must be used within DSProvider');
  return ctx;
}
