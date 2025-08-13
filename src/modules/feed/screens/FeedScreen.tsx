import React, { useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import BaseScreen from '@shared/components/layout/BaseScreen';
import Button from '@shared/components/ui/Button';
import PostList from '@shared/components/layout/PostList';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadFeed } from '@modules/feed/state/thunks';
import type { PostFieldsFragment } from '@graphql/__generated__/types';

type PostItem = (PostFieldsFragment & { conteudo?: string | null }) | null;

export default function FeedScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { items, loading, error, pageSize } = useAppSelector((s) => s.feed);

  const data = useMemo(() => (items as PostItem[]) ?? [], [items]);
  const size = pageSize || 10;

  // Primeira carga: só busca se ainda não houver itens (evita refetch ao voltar do modal)
  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(loadFeed({ page: 1, pageSize: size }));
    }
  }, [dispatch, data?.length, size]);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    dispatch(loadFeed({ page: 1, pageSize: size }));
  }, [dispatch, size]);

  // Infinite scroll básico (pelo tamanho atual)
  const nextPage = useMemo(
    () => Math.floor((data?.length || 0) / size) + 1,
    [data?.length, size]
  );

  const onEndReached = useCallback(() => {
    if (loading || !data || data.length === 0) return; // evita spam
    dispatch(loadFeed({ page: nextPage, pageSize: size }));
  }, [dispatch, loading, data, nextPage, size]);

  // Loading inicial
  if (loading && data.length === 0) {
    return (
      <BaseScreen>
        <View style={styles.center}>
          <Text style={styles.infoText}>Carregando feed…</Text>
        </View>
      </BaseScreen>
    );
  }

  // Erro inicial
  if (error && data.length === 0) {
    return (
      <BaseScreen>
        <View style={styles.center}>
          <Text style={styles.error}>{error}</Text>
          <Button label="Tentar novamente" onPress={onRefresh} />
          <Button label="Sair" onPress={() => router.push('/logout')} style={{ marginTop: 12 }} />
        </View>
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      <PostList
        posts={data}
        loading={!!loading && data.length === 0}
        refreshing={!!loading && data.length > 0}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onPressItem={(p) => {
          const id = p?.documentId;
          if (id) router.push(`/(modals)/post/${id}`); // abre detalhe como modal
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Vizi • Feed</Text>
            <Button label="Sair" onPress={() => router.push('/logout')} />
          </View>
        }
        footerCountLabel={(c) => `Itens: ${c}`}
        emptyMessage="Sem posts."
        showExcerptInCard={false} // feed sem descrição
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  infoText: { opacity: 0.7 },
  error: { color: 'red', textAlign: 'center', marginBottom: 12 },
  header: {
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontWeight: '700', fontSize: 18 },
});