// src/design-system/components/atoms/Button.tsx
import React from 'react';
import { Pressable, ActivityIndicator, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '@ui/theme';
import Box from '@ui/components/primitives/Box';
import Text from '@ui/components/primitives/Text';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

type ColorKey = keyof Theme['colors'];
export type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle;
};

export default function Button({
  label,
  onPress,
  disabled,
  loading,
  variant = 'primary',
  size = 'md',
  style,
}: ButtonProps) {
  const theme = useTheme<Theme>();

  // Use spacing TOKEN KEYS here (Restyle spacing props read keys, not raw numbers)
  const paddings: Record<ButtonSize, { pxKey: keyof Theme['spacing']; pyKey: keyof Theme['spacing']; radiusKey: keyof Theme['borderRadii']; text: number }> = {
    sm: { pxKey: 'sm', pyKey: 'sm', radiusKey: 'sm', text: theme.textVariants.caption.fontSize as number },
    md: { pxKey: 'lg', pyKey: 'md', radiusKey: 'md', text: theme.textVariants.body.fontSize as number },
    lg: { pxKey: 'xl', pyKey: 'lg', radiusKey: 'lg', text: theme.textVariants.title.fontSize as number },
  };

  const colors = (() => {
    switch (variant) {
      case 'outline':
        return {
          bgKey: undefined as ColorKey | undefined,
          borderKey: 'borderDefault' as ColorKey,
          textKey: 'textPrimary' as ColorKey,
          pressedBgKey: 'bgMuted' as ColorKey,
        };
      case 'ghost':
        return {
          bgKey: undefined as ColorKey | undefined,
          borderKey: undefined as ColorKey | undefined,
          textKey: 'textPrimary' as ColorKey,
          pressedBgKey: 'bgSubtle' as ColorKey,
        };
      case 'primary':
      default:
        return {
          bgKey: 'brand' as ColorKey,
          borderKey: undefined as ColorKey | undefined,
          textKey: 'textInverted' as ColorKey,
          pressedBgKey: 'brandHover' as ColorKey,
        };
    }
  })();

  const { pxKey, pyKey, radiusKey, text } = paddings[size];
  const isDisabled = !!disabled || !!loading;

  return (
    <Pressable onPress={onPress} disabled={isDisabled} style={style}>
      {({ pressed }) => (
        <Box
          alignItems="center"
          justifyContent="center"
          borderRadius={radiusKey}
          paddingHorizontal={pxKey}
          paddingVertical={pyKey}
          borderWidth={variant === 'outline' ? 1 : 0}
          borderColor={(colors.borderKey ?? undefined) as any}
          backgroundColor={colors.bgKey ? ((pressed && !isDisabled) ? (colors.pressedBgKey as any) : (colors.bgKey as any)) : undefined}
          style={!colors.bgKey ? { backgroundColor: 'transparent' } : undefined}
          opacity={isDisabled ? 0.6 : 1}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors[colors.textKey]} />
          ) : (
            <Text style={{ fontSize: text, fontWeight: '700' }} color={colors.textKey}>
              {label}
            </Text>
          )}
        </Box>
      )}
    </Pressable>
  );
}
