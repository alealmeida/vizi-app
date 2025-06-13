import { Stack, useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store'; // Assuming RootState is exported from your store
import { useEffect } from 'react';

export default function RootLayout() {
  // AuthProvider removed, Redux Provider is expected to be at a higher level (e.g. App.tsx)
  return <ProtectedRoutes />;
}

function ProtectedRoutes() {
  const segments = useSegments();
  const router = useRouter();

  const { token, isLoading } = useSelector((state: RootState) => ({
    token: state.userSession.token,
    isLoading: state.userSession.isLoading,
  }));

  useEffect(() => {
    if (isLoading) return;

    // This check is mostly a cleanup for any lingering state or deep link
    // that might point to the old (auth) structure.
    const inOldAuthGroupFormat = segments[0] === '(auth)';
    if (token && inOldAuthGroupFormat) {
      router.replace('/(tabs)'); // Or your main authenticated route
    }
    // No explicit redirect to login here, as RootNavigator handles that.
    // If !token, RootNavigator should not have rendered this component.
  }, [segments, token, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If RootNavigator has done its job, we should have a token here if this component is rendered.
  // If for some reason token is null (e.g. race condition or error in logic elsewhere),
  // rendering children (Stack) could expose protected routes.
  // However, RootNavigator is the primary gate.
  // For safety, we can keep a check, but it indicates a problem elsewhere if hit.
  if (!token) {
    // This case should ideally not be reached if RootNavigator is working.
    // Showing a spinner or a minimal view while RootNavigator (presumably) corrects the navigation.
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If authenticated and not loading, render the Expo Router Stack navigator
  // const isPrivateGroup = segments[0] === '(tabs)' || segments[0] === 'perfil';
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // animation: 'fade',
        // gestureEnabled: isPrivateGroup, // isPrivateGroup logic can be kept if needed
      }}
    />
  );
}