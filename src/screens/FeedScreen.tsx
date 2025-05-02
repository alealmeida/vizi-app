import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/features/userSession/userSessionSlice';
import { clearSession } from '@/utils/sessionStorage';
import BaseScreen from '@/components/BaseScreen';
import { theme } from '@/styles/theme';

const dummyPosts = [
  { id: '1', title: 'Bicicleta para troca' },
  { id: '2', title: 'Doação de livros' },
  { id: '3', title: 'Venda de sofá' },
];

export default function FeedScreen() {
  const user = useSelector((state: RootState) => state.userSession.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await clearSession();
    dispatch(logout());
  };

  return (
    <BaseScreen>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, {user?.username || 'Visitante'} 👋
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        )}
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  greeting: {
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  logout: {
    fontSize: theme.fontSize.md,
    fontWeight: '600',
    color: theme.colors.error,
  },
  list: {
    gap: theme.spacing.md,
  },
  card: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    elevation: 1, // sombra para Android
    shadowColor: '#000', // sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: '500',
    color: theme.colors.text,
  },
});