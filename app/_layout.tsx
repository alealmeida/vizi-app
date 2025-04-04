import { Stack, useSegments } from 'expo-router'
import { useProtectedRoute } from '../hooks/useProtectedRoute'
import { AuthProvider, useAuth } from '../hooks/authContext'
import { ActivityIndicator, View } from 'react-native'

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedRoutes />
    </AuthProvider>
  )
}

function ProtectedRoutes() {
  useProtectedRoute()
  const segments = useSegments()
  const { isAuthResolved } = useAuth()

  if (!isAuthResolved) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const isPrivateGroup = segments[0] === '(tabs)' || segments[0] === 'perfil'

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // animation: 'fade',
        // gestureEnabled: isPrivateGroup,
      }}
    />
  )
}