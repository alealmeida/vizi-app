import React, { memo, useCallback } from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ListRenderItem,
} from 'react-native';
import PostCard from '@shared/components/layout/PostCard';
import type {
  PostFieldsFragment,
  PostExpandedFragment,
} from '@graphql/__generated__/types';

type PostItem = (PostFieldsFragment & Partial<PostExpandedFragment>) | null;

type Props = {
  posts: PostItem[];
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onPressItem?: (post: PostItem) => void;
  ListHeaderComponent?: React.ReactElement | null;
  footerCountLabel?: (count: number) => string;
  emptyMessage?: string;
  contentPadding?: number;
};

function PostList({
  posts,
  loading = false,
  refreshing = false,
  onRefresh,
  onEndReached,
  onPressItem,
  ListHeaderComponent,
  footerCountLabel = (c) => `Itens: ${c}`,
  emptyMessage = 'Sem posts.',
  contentPadding = 16,
}: Props) {
  const keyExtractor = useCallback(
    (p: PostItem, index: number) =>
      String(p?.documentId ?? `${p?.titulo ?? 'post'}-${index}`),
    []
  );

  const renderItem: ListRenderItem<PostItem> = useCallback(
    ({ item }) => <PostCard post={item} onPress={() => onPressItem?.(item)} />,
    [onPressItem]
  );

  if (!loading && posts.length === 0) {
    return (
      <View style={[styles.emptyContainer, { padding: contentPadding }]}>
        {ListHeaderComponent}
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{
        padding: contentPadding,
        paddingBottom: 32,
        paddingTop: ListHeaderComponent ? 8 : contentPadding,
      }}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={
        <Text style={styles.footer}>{footerCountLabel(posts.length)}</Text>
      }
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReachedThreshold={0.4}
      onEndReached={onEndReached}
    />
  );
}

export default memo(PostList);

const styles = StyleSheet.create({
  emptyContainer: { flex: 1, alignItems: 'center', gap: 8 },
  emptyText: { color: '#666', fontSize: 16 },
  footer: { textAlign: 'center', marginTop: 8, opacity: 0.6 },
});