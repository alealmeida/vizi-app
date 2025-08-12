// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'Vizi App',
    slug: 'vizi-app',
    scheme: 'vizi', // opcional: útil pra deep linking
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:1337',
      apiGraphql:
        process.env.EXPO_PUBLIC_API_GRAPHQL ||
        `${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:1337'}/graphql`,
      apiRestLogin:
        process.env.EXPO_PUBLIC_API_REST_LOGIN ||
        `${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:1337'}/api/auth/local`,
      apiRestRegister:
        process.env.EXPO_PUBLIC_API_REST_REGISTER ||
        `${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:1337'}/api/auth/local/register`,
    },
  },
};