// src/shared/components/layout/AuthBaseScreen.tsx
import React from 'react';
import { KeyboardAvoidingView, Platform, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Box from '@ds/components/primitives/Box';

export type AuthBaseScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export default function AuthBaseScreen({ children, style }: AuthBaseScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      >
        <Box flex={1} padding="lg" backgroundColor="bgCanvas" style={style}>
          {children}
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
