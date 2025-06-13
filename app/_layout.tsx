import { Stack, useRouter, useSegments } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../src/store'; // Assuming RootState is exported from your store
import { useEffect } from 'react';

// Note: This is a placeholder for where login is now handled.
// If Login is outside Expo Router (e.g. in React Navigation), this redirect won't work as expected.
// The ideal solution depends on how Expo Router and React Navigation are integrated.
const LOGIN_ROUTE = '/'; // Defaulting to '/' as app/(auth)/login is removed.

export default function RootLayout() {
  // AuthProvider removed, Redux Provider is expected to be at a higher level (e.g. App.tsx)
  return <ProtectedRoutes />;
}

function ProtectedRoutes() {
  const segments = useSegments();
  const router = useRouter();

  const { token, isLoading, user } = useSelector((state: RootState) => ({
    token: state.userSession.token,
    isLoading: state.userSession.isLoading, // Assuming an isLoading state for session restoration
    user: state.userSession.user,
  }));

  useEffect(() => {
    if (isLoading) return; // Still loading session information

    const inAuthGroup = segments[0] === '(auth)'; // This group is being removed

    // If there's no token (not authenticated) and not already trying to go to a auth-related screen
    // (though (auth) group is removed, this logic is kept for structure)
    // Redirect to where login is handled.
    if (!token && !inAuthGroup) {
      // router.replace was used. If LOGIN_ROUTE is not an expo-router route, this will be an issue.
      // For now, keeping the pattern but acknowledging LOGIN_ROUTE needs to be valid for expo-router.
      router.replace(LOGIN_ROUTE);
    } else if (token && inAuthGroup) {
      // If authenticated and somehow ended up in an (auth) group page (which shouldn't exist)
      router.replace('/(tabs)'); // Redirect to the main app area
    }
    // If authenticated and not inAuthGroup, stay.
    // If not authenticated and inAuthGroup (e.g. on the login screen itself), stay.
  }, [segments, token, isLoading, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If there is a token, or if we are on the login route itself, render the layout.
  // This allows children routes to be rendered.
  // If !token and not on LOGIN_ROUTE, the useEffect above should have redirected.
  // This condition might need adjustment based on actual LOGIN_ROUTE and app structure.
  if (!token && segments.join('/') !== LOGIN_ROUTE.replace(/^\//, '')) {
     // If not authenticated and not on the login page (and not loading), show spinner
     // This prevents rendering children routes that might be protected, while waiting for redirect.
     // Alternatively, return null or a dedicated "Access Denied" or "Redirecting" component.
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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