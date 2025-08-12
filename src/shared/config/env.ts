// src/shared/config/env.ts
import Constants from 'expo-constants';

type Extra = { apiUrl?: string };

const extra: Extra =
  (Constants.expoConfig?.extra as any) ??
  (Constants.manifest2?.extra?.expoClient?.extra as any) ??
  (Constants.manifest?.extra as any) ??
  {};

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ||
  extra.apiUrl ||
  'http://localhost:1337';

export const GRAPHQL_URL =
  process.env.EXPO_PUBLIC_API_GRAPHQL ||
  `${API_URL}/graphql`;

export const REST_LOGIN_URL =
  process.env.EXPO_PUBLIC_API_REST_LOGIN ||
  `${API_URL}/api/auth/local`;

export const REST_REGISTER_URL =
  process.env.EXPO_PUBLIC_API_REST_REGISTER ||
  `${API_URL}/api/auth/local/register`;