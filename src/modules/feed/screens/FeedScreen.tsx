// src/modules/feed/screens/FeedScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadFeed } from '@modules/feed/state/thunks';
import Button from '@shared/components/ui/Button';
import BaseScreen from '@shared/components/layout/BaseScreen';

export default function FeedScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, loading, error, pageSize } = useAppSelector((s) => s.feed);

  useEffect(() => {
    dispatch(loadFeed({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  if (loading && items.length === 0) {
    return (
      <BaseScreen>
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.infoText}>Carregando feed…</Text>
        </View>
      </BaseScreen>
    );
  }

  if (error && items.length === 0) {
    return (
      <BaseScreen>
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Button
            label="Tentar novamente"
            onPress={() => dispatch(loadFeed({ page: 1, pageSize: 10 }))}
          />
          <Button
            label="Sair"
            onPress={() => router.push('/logout')}
            style={{ marginTop: 12 }}
          />
        </View>
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      {/* Topo com botão Sair */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vizi • Feed</Text>
        <Button
          label="Sair"
          onPress={() => router.push('/logout')}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(p) => String((p as any)?.documentId ?? (p as any)?.id ?? Math.random())}
        refreshControl={
          <RefreshControl
            refreshing={!!loading}
            onRefresh={() =>
              dispatch(loadFeed({ page: 1, pageSize: pageSize || 10 }))
            }
          />
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const p: any = item;
          return (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{p?.titulo ?? 'Sem título'}</Text>
              <Text style={styles.cardDate}>{p?.createdAt ?? ''}</Text>
            </View>
          );
        }}
        ListFooterComponent={
          <Text style={styles.footer}>
            {`Itens: ${items.length}`}
          </Text>
        }
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>Sem posts.</Text>
          ) : null
        }
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  infoText: { marginTop: 8 },
  error: { color: 'red', textAlign: 'center', marginBottom: 12 },
  header: {
    padding: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: { fontWeight: '700', fontSize: 18 },
  listContent: { padding: 16, paddingTop: 8, paddingBottom: 32 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 12
  },
  cardTitle: { fontWeight: '600', fontSize: 16 },
  cardDate: { marginTop: 8, fontSize: 12, opacity: 0.6 },
  footer: { textAlign: 'center', marginTop: 8, opacity: 0.6 },
  empty: { textAlign: 'center', marginTop: 12 }
});