import React, { useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadFeed } from '@modules/feed/state/thunks';
import Button from '@shared/components/ui/Button';
import BaseScreen from '@shared/components/layout/BaseScreen';
import PostList from '@shared/components/layout/PostList';
import type { PostFieldsFragment, PostExpandedFragment } from '@graphql/__generated__/types';

type PostItem = (PostFieldsFragment & Partial<PostExpandedFragment>) | null;

export default function FeedScreen() {
  const router   = useRouter();
  const dispatch = useAppDispatch();
  const { items, loading, error, pageSize } = useAppSelector((s) => s.feed);

  useEffect(() => {
    dispatch(loadFeed({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  const data = useMemo(() => (items as PostItem[]) ?? [], [items]);

  const onRefresh = useCallback(() => {
    dispatch(loadFeed({ page: 1, pageSize: pageSize || 10 }));
  }, [dispatch, pageSize]);

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
        onPressItem={(p) => {
          const id = p?.documentId;
          if (id) router.push(`/(tabs)/post/${id}`);
        }}
        // onEndReached={() => dispatch(loadFeed({ page: nextPage, pageSize }))} // quando ativar infinite scroll
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Vizi • Feed</Text>
            <Button label="Sair" onPress={() => router.push('/logout')} />
          </View>
        }
        footerCountLabel={(c) => `Itens: ${c}`}
        emptyMessage="Sem posts."
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