import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BaseScreen from '@shared/components/layout/BaseScreen';
import Button from '@shared/components/ui/Button';
import { useAppSelector } from '@store/hooks';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAppSelector((s) => s.user.profile);
  const email = user?.email ?? '—';
  const username = user?.username ?? '—';

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Meu Perfil</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Usuário</Text>
          <Text style={styles.value}>{username}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>E-mail</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <Button
          label="Sair da conta"
          onPress={() => router.push('/logout')}
          style={{ marginTop: 24 }}
        />
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    backgroundColor: '#fff'
  },
  label: { fontSize: 12, color: '#6b7280' },
  value: { fontSize: 16, fontWeight: '600', marginTop: 2 },
});