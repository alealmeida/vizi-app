import { useRouter, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { useAuth } from './authContext'

export function useProtectedRoute() {
  const { isAuthenticated, isAuthResolved } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthResolved) return

    const inAuthGroup = segments[0] === '(auth)'

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/(auth)/login')
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)')
    }
  }, [segments, isAuthenticated, isAuthResolved])
}