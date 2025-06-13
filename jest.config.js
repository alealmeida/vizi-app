module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  // transform is usually handled by the 'react-native' preset (which uses babel-jest with metro-react-native-babel-preset)
  // babel-preset-expo (used in babel.config.js) is built on top of metro-react-native-babel-preset and handles TypeScript.
  // Explicitly defining transform like this can sometimes override or conflict.
  // Let's rely on the preset's default first.
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest', // If using ts-jest explicitly and want it to process TSX
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Ensure ts/tsx are listed
  moduleNameMapper: { // To match tsconfig.json paths like @/components/*
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [ // To ensure node_modules are not transformed by default, except for specific react-native ones
    "node_modules/(?!(@react-native|react-native|expo-.*|@expo.*|@unimodules.*|sentry-expo|native-base)/)"
  ],
};
