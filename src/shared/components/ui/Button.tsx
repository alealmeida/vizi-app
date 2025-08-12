// src/shared/components/ui/Button.tsx (apenas extras opcionais)
import React from 'react';
import {
  TouchableOpacity, Text, StyleSheet, ActivityIndicator,
  GestureResponderEvent, ViewStyle, TextStyle, AccessibilityRole
} from 'react-native';

export type ButtonVariant = 'primary' | 'outlined' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;               // ← opcional
  accessibilityRole?: AccessibilityRole;
}

export default function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  style,
  textStyle,
  fullWidth = false,
  accessibilityRole = 'button',
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyle.button,
        {
          paddingVertical: sizeStyle.paddingVertical,
          paddingHorizontal: sizeStyle.paddingHorizontal,
          opacity: disabled ? 0.6 : 1,
          alignSelf: fullWidth ? 'stretch' : 'auto', // ← ocupa largura toda se quiser
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#2260FF'} />
      ) : (
        <Text style={[styles.text, variantStyle.text, { fontSize: sizeStyle.fontSize }, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const variantStyles = {
  primary: { button: { backgroundColor: '#2260FF', borderWidth: 0 }, text: { color: '#fff' } },
  outlined:{ button: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#2260FF' }, text: { color: '#2260FF' } },
  ghost:   { button: { backgroundColor: 'transparent', borderWidth: 0 }, text: { color: '#2260FF' } },
};
const sizeStyles = {
  sm: { paddingVertical: 6,  paddingHorizontal: 12, fontSize: 14 },
  md: { paddingVertical: 10, paddingHorizontal: 16, fontSize: 16 },
  lg: { paddingVertical: 14, paddingHorizontal: 20, fontSize: 18 },
};
const styles = StyleSheet.create({
  button: { borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  text: { fontWeight: '600' },
});