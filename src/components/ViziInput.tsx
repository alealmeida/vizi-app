import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';

export default function ViziInput(props: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={theme.colors.muted}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 48,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    color: theme.colors.text,
    fontSize: theme.fontSize.md,
  },
});