import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../../src/features/userSession/userSessionSlice'; // Adjust path if needed
import { deleteSession } from '../../src/utils/sessionStorage'; // Adjust path if needed
import { RootState } from '../../src/store'; // Adjust path if needed
import { router } from 'expo-router'; // For redirecting if needed

export default function HomeScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userSession.user);

  const handleLogout = async () => {
    await deleteSession(); // Clear from SecureStore
    dispatch(clearCredentials()); // Clear from Redux
    // Optional: Redirect to a login screen or public home screen if this is still an Expo Router page
    // router.replace('/'); // Or wherever your non-authenticated users should go
  };

  if (!user) {
    // User is not logged in, optionally show a different message or redirect.
    // This might be handled by app/_layout.tsx already.
    // For now, just indicating that content could be conditional.
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Você não está logado.</Text>
        {/* Optionally, provide a button to go to login if appropriate here */}
        {/* <Button title="Login" onPress={() => router.replace('/')} /> */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Você está logado ✅ (Usuário: {user.username})</Text>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 20 },
});