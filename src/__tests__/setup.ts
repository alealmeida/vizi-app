// src/__tests__/setup.ts
import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Redux Persist
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  };
});

// Mock Expo Router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useSegments: () => [],
  Slot: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock GraphQL Client
jest.mock('@shared/lib/graphqlClient', () => ({
  graphqlClient: {
    request: jest.fn(),
  },
  setAuthToken: jest.fn(),
}));

// Global test timeout
jest.setTimeout(10000);
