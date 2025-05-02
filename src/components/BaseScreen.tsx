import { View, SafeAreaView, ViewProps, StyleSheet } from 'react-native';
import { ReactNode } from 'react';
import { theme } from '@/styles/theme';

interface Props extends ViewProps {
  children: ReactNode;
}

export default function BaseScreen({ children, ...rest }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
});