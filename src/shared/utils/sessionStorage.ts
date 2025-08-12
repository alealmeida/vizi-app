// src/utils/sessionStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'vizi_token';
const USER_KEY = 'vizi_user';

type UserSession = {
  id: string;
  username: string;
  email: string;
};

export async function saveSession(token: string, user: UserSession) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function loadSession(): Promise<{ token: string | null; user: UserSession | null }> {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  const userJson = await AsyncStorage.getItem(USER_KEY);
  const user = userJson ? JSON.parse(userJson) : null;
  return { token, user };
}

export async function clearSession() {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
}