import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import { theme } from '@/styles/theme';

interface ViziButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'filled' | 'outlined';
}

export default function ViziButton({
  title,
  loading = false,
  variant = 'filled',
  disabled,
  ...rest
}: ViziButtonProps) {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.base,
    variant === 'outlined' && styles.outlined,
    variant === 'filled' && styles.filled,
    isDisabled && styles.disabled,
  ];

  const textStyle = [
    styles.textBase,
    variant === 'outlined' && styles.textOutlined,
    variant === 'filled' && styles.textFilled,
    isDisabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      disabled={isDisabled}
      style={containerStyle}
      testID="vizi-button-touchable" // Added testID
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={
            isDisabled || variant === 'outlined'
              ? theme.colors.primary
              : theme.colors.white
          }
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: theme.button.height,
    paddingHorizontal: theme.button.paddingHorizontal,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.lg,
  },
  filled: {
    backgroundColor: theme.colors.primary,
  },
  outlined: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  disabled: {
    backgroundColor: theme.colors.border,
    borderColor: theme.colors.border,
  },
  textBase: {
    fontWeight: '600',
    fontSize: theme.fontSize.md,
  },
  textFilled: {
    color: theme.colors.white,
  },
  textOutlined: {
    color: theme.colors.primary,
  },
  textDisabled: {
    color: theme.colors.muted,
  },
});