import { useEffect } from 'react'
import { logout } from '../../hooks/useAuth'
import { router } from 'expo-router'

export default function LogoutScreen() {
  useEffect(() => {
    const doLogout = async () => {
      await logout()
      router.replace('/(auth)/login')
    }

    doLogout()
  }, [])

  return null
}