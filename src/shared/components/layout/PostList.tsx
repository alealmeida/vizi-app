import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, ListRenderItem, ActivityIndicator } from 'react-native';
import Box from '@ui/components/primitives/Box';
import Text from '@ui/components/primitives/Text';
import PostCard, { type PostCardProps } from '@shared/components/layout/PostCard';
import type { PostFieldsFragment } from '@graphql/__generated__/types';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '@ui/theme';

type PostItem = (PostFieldsFragment & { conteudo?: string | null }) | null;

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
  contentPadding?: keyof Theme['spacing'] | number;
  showExcerptInCard?: PostCardProps['showExcerpt'];
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
  contentPadding = 'lg',
  showExcerptInCard = true,
}: Props) {
  const theme = useTheme<Theme>();

  const pad = useMemo(() => {
    if (typeof contentPadding === 'number') return contentPadding;
    return theme.spacing[contentPadding] ?? theme.spacing.lg;
  }, [contentPadding, theme.spacing]);

  const keyExtractor = useCallback(
    (p: PostItem, index: number) =>
      String(p?.documentId ?? `${p?.titulo ?? 'post'}-${index}`),
    []
  );

  const renderItem: ListRenderItem<PostItem> = useCallback(
    ({ item }) => (
      <PostCard
        post={item}
        onPress={() => onPressItem?.(item)}
        showExcerpt={showExcerptInCard}
      />
    ),
    [onPressItem, showExcerptInCard]
  );

  // Não exibe "Sem posts" enquanto estiver atualizando manualmente (refreshing)
  if (!loading && !refreshing && posts.length === 0) {
    return (
      <Box flex={1} alignItems="center" padding={contentPadding as any}>
        {ListHeaderComponent}
        <Text variant="body" color="textSecondary" marginTop="sm" textAlign="center">
          {emptyMessage}
        </Text>
      </Box>
    );
  }

  // Lista vazia e em carregamento: spinner central
  if (loading && posts.length === 0) {
    return (
      <Box flex={1} alignItems="center" justifyContent="center" padding={contentPadding as any}>
        {ListHeaderComponent}
        <ActivityIndicator size="small" />
        <Text variant="caption" color="textSecondary" marginTop="sm">Carregando…</Text>
      </Box>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{
        padding: pad,
        paddingBottom: theme.spacing.xl,
        paddingTop: ListHeaderComponent ? theme.spacing.xs : pad,
      }}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={
        <Box marginTop="sm" alignItems="center">
          {loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text variant="caption" color="textSecondary" textAlign="center">
              {footerCountLabel(posts.length)}
            </Text>
          )}
        </Box>
      }
      refreshControl={
        onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} /> : undefined
      }
      onEndReachedThreshold={0.4}
      onEndReached={onEndReached}
      windowSize={8}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={50}
      removeClippedSubviews
      keyboardShouldPersistTaps="handled"
    />
  );
}

export default memo(PostList);