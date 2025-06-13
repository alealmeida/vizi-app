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