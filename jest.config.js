module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@graphql/(.*)$': '<rootDir>/src/graphql/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|expo-.*|@expo.*|@unimodules.*|sentry-expo|native-base)/)'
  ]
};