# Vizi App

This is the mobile application for Vizi.

## Core Architecture

This project utilizes a standardized stack for development:

*   **Navigation**: [React Navigation](https://reactnavigation.org/) is used for all screen and view navigation.
    *   Root navigation setup: `src/navigation/RootNavigator.tsx`
    *   Authentication flow stack: `src/navigation/AuthStack.tsx`
    *   Main application stack: `src/navigation/AppStack.tsx`
    *   Screen components are primarily located in `src/screens/`.

*   **State Management**: [Redux](https://redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/) is used for global state management.
    *   Store configuration: `src/store.ts`
    *   Feature slices (including user session): `src/features/` (e.g., `src/features/userSession/userSessionSlice.ts`)

*   **API Interaction**: [GraphQL](https://graphql.org/) is the primary way to interact with the backend API, using the `graphql-request` client.
    *   GraphQL client configuration: `src/config/graphqlClient.ts`
    *   API call functions (e.g., login, register): Located under `src/api/` (e.g., `src/api/auth/login.ts`)

*   **UI Components**: Reusable UI components are developed and stored in `src/components/`.

*   **Expo & Expo Router**: While the project is built with Expo (providing access to its ecosystem and tools), the primary application navigation is handled by React Navigation as described above. The `app/` directory, used by Expo Router, may be utilized for specific file-based routing features, deep linking, or API routes if needed, but the core user-facing screen transitions are managed via `src/navigation`.

*   **Testing**: Unit and component tests are written using [Jest](https://jestjs.io/) and [React Native Testing Library](https://callstack.github.io/react-native-testing-library/).
    *   Test files are typically co-located with the source code in `__tests__` directories (e.g., `src/components/__tests__`).
    *   Run tests using: `yarn test`

## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   Yarn package manager
*   Expo CLI: `npm install -g expo-cli` (or `yarn global add expo-cli`)
*   Development environment for React Native (Android Studio for Android, Xcode for iOS). See [React Native Environment Setup](https://reactnative.dev/docs/environment-setup).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd vizi-app
    ```
2.  Install dependencies:
    ```bash
    yarn install
    ```

### Running the Application

1.  Start the Metro bundler:
    ```bash
    yarn start
    ```
2.  Follow the instructions in the terminal to run the app on an emulator/simulator or a physical device using the Expo Go app.
    *   Press `a` to run on Android.
    *   Press `i` to run on iOS.
    *   Press `w` to run on web (if configured).

### Running Tests
    ```bash
    yarn test
    ```
