// tamagui.config.ts (raiz do projeto)
import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config/v2'
import {
  colorTokens,
  sizeTokens,
  spaceTokens,
  fontWeightTokens,
} from './src/styles/tokens'

export const tamaguiConfig = createTamagui({
  ...defaultConfig,

  themeClassNameOnRoot: true,

  tokens: {
    ...defaultConfig.tokens,
    color: {
      ...defaultConfig.tokens.color,
      ...colorTokens,
    },
    size: {
      ...defaultConfig.tokens.size,
      ...sizeTokens,
    },
    space: {
      ...defaultConfig.tokens.space,
      ...spaceTokens,
    },
    fontWeight: {
      ...fontWeightTokens,
    },
    radius: {
      ...defaultConfig.tokens.radius,
    },
    zIndex: {
      ...defaultConfig.tokens.zIndex,
    },
  },

  themes: {
    ...defaultConfig.themes,
    light: {
      background: colorTokens.background,
      color: colorTokens.text,
    },
  },
})

export type AppConfig = typeof tamaguiConfig