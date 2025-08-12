import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_KEY = 'sessionToken'

export const getSessionToken = async (): Promise<string | null> =>
  await AsyncStorage.getItem(TOKEN_KEY)

export const storeSessionToken = async (token: string): Promise<void> =>
  await AsyncStorage.setItem(TOKEN_KEY, token)

export const clearSessionToken = async (): Promise<void> =>
  await AsyncStorage.removeItem(TOKEN_KEY)