// src-design-system/components/atoms/IconButton.tsx
import React from 'react';
import { Pressable, ActivityIndicator, ViewStyle } from 'react-native';
import Box from '@ui/components/primitives/Box';
import type { Theme } from '@ui/theme';
import { useTheme } from '@shopify/restyle';

export type IconButtonVariant = 'primary' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md';

export type IconButtonProps = {
  icon: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  style?: ViewStyle;
};

export default function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  disabled,
  loading,
  variant = 'ghost',
  size = 'md',
  style,
}: IconButtonProps) {
  const theme = useTheme<Theme>();

  const paddingBySize: Record<IconButtonSize, { px: keyof Theme['spacing']; py: keyof Theme['spacing']; min: number }> = {
    sm: { px: 'xs', py: 'xs', min: 36 },
    md: { px: 'sm', py: 'sm', min: 40 },
  };

  const colors = (() => {
    switch (variant) {
      case 'outline':
        return {
          bgKey: undefined as keyof Theme['colors'] | undefined,
          borderKey: 'borderDefault' as keyof Theme['colors'],
          pressedBgKey: 'bgMuted' as keyof Theme['colors'],
          spinnerColor: 'textPrimary' as keyof Theme['colors'],
        };
      case 'primary':
        return {
          bgKey: 'brand' as keyof Theme['colors'],
          borderKey: undefined as keyof Theme['colors'] | undefined,
          pressedBgKey: 'brandHover' as keyof Theme['colors'],
          spinnerColor: 'textInverted' as keyof Theme['colors'],
        };
      case 'ghost':
      default:
        return {
          bgKey: undefined as keyof Theme['colors'] | undefined,
          borderKey: undefined as keyof Theme['colors'] | undefined,
          pressedBgKey: 'bgSubtle' as keyof Theme['colors'],
          spinnerColor: 'textPrimary' as keyof Theme['colors'],
        };
    }
  })();

  const { px, py, min } = paddingBySize[size];
  const isDisabled = !!disabled || !!loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={style}
    >
      {({ pressed }) => (
        <Box
          borderRadius="pill"
          paddingHorizontal={px}
          paddingVertical={py}
          borderWidth={variant === 'outline' ? 1 : 0}
          borderColor={(colors.borderKey ?? undefined) as any}
          backgroundColor={colors.bgKey ? ((pressed && !isDisabled) ? (colors.pressedBgKey as any) : (colors.bgKey as any)) : undefined}
          style={{ minWidth: min, minHeight: min, alignItems: 'center', justifyContent: 'center', backgroundColor: !colors.bgKey ? 'transparent' : undefined }}
          opacity={isDisabled ? 0.6 : 1}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors[colors.spinnerColor]} />
          ) : (
            icon
          )}
        </Box>
      )}
    </Pressable>
  );
}
