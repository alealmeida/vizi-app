import { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { store } from '@/store'
import RootNavigator from '@navigation/RootNavigator'
import { loadSession } from '@utils/sessionStorage'
import { setCredentials } from '@features/userSession/userSessionSlice'
import { ThemeProvider } from '@/styles/ThemeProvider' // <--- importa o seu provider tamagui

function AppContent() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const bootstrap = async () => {
      const { token, user } = await loadSession()
      if (token && user) {
        dispatch(setCredentials({ token, user }))
      }
      setLoading(false)
    }
    bootstrap()
  }, [])

  if (loading) return null

  return <RootNavigator />
}

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider> {/* Aqui envolve tudo com Tamagui */}
        <AppContent />
      </ThemeProvider>
    </Provider>
  )
}