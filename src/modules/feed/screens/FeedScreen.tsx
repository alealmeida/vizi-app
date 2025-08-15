import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import BaseScreen from '@shared/components/layout/BaseScreen';
import Button from '@ds/components/atoms/Button';
import Box from '@ds/components/primitives/Box';
import Text from '@ds/components/primitives/Text';
import PostList from '@shared/components/layout/PostList';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadFeed, loadMyCondoFeed, loadNeighborhoodFeed } from '@modules/feed/state/thunks';
import type { PostFieldsFragment } from '@graphql/__generated__/types';
import { selectFeedItems, selectFeedLoading, selectFeedError, selectFeedPageSize, selectUserProfile, selectAuthToken } from '@store/selectors';
import { refreshMe } from '@modules/auth/state/thunks';
import { loadUserExpanded } from '@modules/user/state/thunks';
import { selectCondominioNome } from '@modules/user/state/userSlice';

type PostItem = (PostFieldsFragment & { conteudo?: string | null }) | null;

export default function FeedScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectFeedItems);
  const loading = useAppSelector(selectFeedLoading);
  const error = useAppSelector(selectFeedError);
  const pageSize = useAppSelector(selectFeedPageSize);
  const user = useAppSelector(selectUserProfile);
  const token = useAppSelector(selectAuthToken);
  const condoName = useAppSelector(selectCondominioNome) || '';

  const data = useMemo(() => (items as PostItem[]) ?? [], [items]);
  const size = pageSize || 10;

  // Tabs: Meu Condomínio | Próximos | Bairro
  type TabKey = 'meu' | 'proximos' | 'bairro';
  const [tab, setTab] = useState<TabKey>('meu');

  // Garante que temos o perfil mais recente ao focar a tela
  useFocusEffect(
    React.useCallback(() => {
      if (token && !user) {
        dispatch(refreshMe());
      } else if (token && user && (!user.condominio || !user.tipo_usuario)) {
        dispatch(loadUserExpanded());
      }
      return () => {};
    }, [token, user, dispatch])
  );

  // Função central para carregar a página atual, com fallbacks
  const fetchPage = useCallback(async (page: number = 1) => {
    const condoId = user?.condominio?.id; // CondominioRef.id = documentId lógico
    const bairro = user?.condominio?.bairro;
    if (tab === 'meu') {
      if (!condoId) {
        // Fallback: carrega feed genérico para indicar loading e não ficar vazio
        await dispatch(loadFeed({ page, pageSize: size }));
        return;
      }
      await dispatch(loadMyCondoFeed({ condominioId: condoId, page, pageSize: size }));
      return;
    }
    if (tab === 'bairro') {
      if (!bairro) {
        await dispatch(loadFeed({ page, pageSize: size }));
      } else {
        await dispatch(loadNeighborhoodFeed({ bairro, page, pageSize: size }));
      }
      return;
    }
    // proximos
    await dispatch(loadFeed({ page, pageSize: size }));
  }, [dispatch, size, tab, user]);

  // Recarrega quando a tela ganha foco (inclui volta ao app e navegação)
  useFocusEffect(
    useCallback(() => {
      void fetchPage(1);
    }, [fetchPage])
  );

  // Recarrega quando o usuário pressiona a aba Feed novamente
  const navigation = useNavigation<any>();
  useEffect(() => {
    const unsub = navigation.addListener('tabPress', () => {
      void fetchPage(1);
    });
    return unsub;
  }, [navigation, fetchPage]);

  // Pull-to-refresh (controlado)
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await fetchPage(1);
    } finally {
      setRefreshing(false);
    }
  }, [fetchPage]);

  // Infinite scroll básico (pelo tamanho atual)
  const nextPage = useMemo(() => Math.floor((data?.length || 0) / size) + 1, [data?.length, size]);

  const onEndReached = useCallback(() => {
    if (loading || !data || data.length === 0) return; // evita spam
    const condoId = user?.condominio?.id;
    const bairro = user?.condominio?.bairro;
    if (tab === 'meu') {
      if (!condoId) return; // sem condo ainda, não paginar
      return dispatch(loadMyCondoFeed({ condominioId: condoId, page: nextPage, pageSize: size }));
    }
    if (tab === 'bairro') {
      if (!bairro) return; // sem bairro
      return dispatch(loadNeighborhoodFeed({ bairro, page: nextPage, pageSize: size }));
    }
    return dispatch(loadFeed({ page: nextPage, pageSize: size }));
  }, [dispatch, loading, data, nextPage, size, tab, user?.condominio?.id, user?.condominio?.bairro]);

  // Loading inicial
  if (loading && data.length === 0) {
    return (
      <BaseScreen>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text variant="caption" color="textSecondary">Carregando feed…</Text>
        </Box>
      </BaseScreen>
    );
  }

  // Erro inicial
  if (error && data.length === 0) {
    return (
      <BaseScreen>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text color="danger" textAlign="center" marginBottom="sm">{error}</Text>
          <Button label="Tentar novamente" onPress={onRefresh} />
          <Box marginTop="sm">
            <Button label="Sair" onPress={() => router.push('/logout')} variant="outline" />
          </Box>
        </Box>
      </BaseScreen>
    );
  }

  const Header = (
    <Box paddingBottom="sm">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        {condoName ? <Text variant="heading">{condoName}</Text> : <Box />}
        <Button label="Sair" onPress={() => router.push('/logout')} variant="ghost" />
      </Box>
      {/* Abas do feed */}
      <Box flexDirection="row" alignItems="center" justifyContent="space-between" marginTop="sm">
        <Button
          label="Meu Condomínio"
          variant={tab === 'meu' ? 'primary' : 'ghost'}
          onPress={() => setTab('meu')}
        />
        <Button
          label="Próximos"
          variant={tab === 'proximos' ? 'primary' : 'ghost'}
          onPress={() => setTab('proximos')}
        />
        <Button
          label="Bairro"
          variant={tab === 'bairro' ? 'primary' : 'ghost'}
          onPress={() => setTab('bairro')}
        />
      </Box>
    </Box>
  );

  const visible = data;

  return (
    <BaseScreen>
      <PostList
        posts={visible}
        loading={!!loading && visible.length === 0}
        // Spinner controlado manualmente para evitar piscar "Sem posts" durante refresh
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onPressItem={(p) => {
          const id = p?.documentId;
          if (id) router.push(`/(modals)/post/${id}`); // abre detalhe como modal
        }}
        ListHeaderComponent={Header}
        footerCountLabel={(c) => `Itens: ${c}`}
        emptyMessage="Sem posts."
        contentPadding="xl"
        showExcerptInCard={false} // feed sem descrição
      />
    </BaseScreen>
  );
}