import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import * as SecureStore from 'expo-secure-store'

type AuthContextType = {
  isAuthenticated: boolean
  isAuthResolved: boolean
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAuthResolved: false,
  login: async () => {},
  logout: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthResolved, setIsAuthResolved] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync('jwt')
      setIsAuthenticated(!!token)
      setIsAuthResolved(true)
    }

    checkToken()
  }, [])

  const login = async (token: string) => {
    await SecureStore.setItemAsync('jwt', token)
    setIsAuthenticated(true)
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync('jwt')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAuthResolved, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)