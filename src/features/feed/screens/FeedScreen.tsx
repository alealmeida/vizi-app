import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import BaseScreen from '@shared/components/layout/BaseScreen';
import Button from '@ui/components/atoms/Button';
import Box from '@ui/components/primitives/Box';
import Text from '@ui/components/primitives/Text';
import PostList from '@shared/components/layout/PostList';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadFeed, loadMyCondoFeed, loadNeighborhoodFeed, loadNearbyFeed } from '@features/feed/state/thunks';
import { resetFeed } from '@features/feed/state/feedSlice';
import type { PostFieldsFragment } from '@graphql/__generated__/types';
import { selectFeedItems, selectFeedLoading, selectFeedError, selectFeedPageSize, selectUserProfile, selectAuthToken } from '@store/selectors';
import { refreshMe } from '@features/auth/state/thunks';
import { loadUserExpanded } from '@features/user/state/thunks';
import { selectCondominioNome } from '@features/user/state/userSlice';

type PostItem = (PostFieldsFragment & { conteudo?: string | null }) | null;

const NEARBY_RADIUS_KM = 1.8; // ~1.8 km
const NEARBY_MIN_ITEMS = 3; // backfill mínimo para não ficar vazio
const BAIRRO_RADIUS_KM = 3.5; // raio maior para "Bairro" (~3.5 km)

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
  // NOTE: In our user mapping, condominio.id stores the Strapi documentId
  // (see toUserDataFromUsuario). We use this as the condo identifier across
  // queries that expect documentId.
  const condoId = user?.condominio?.id;
  const bairro = user?.condominio?.bairro;
  const condoLatRaw = user?.condominio?.latitude as any;
  const condoLngRaw = user?.condominio?.longitude as any;
  const condoLat = typeof condoLatRaw === 'number' ? condoLatRaw : Number(condoLatRaw);
  const condoLng = typeof condoLngRaw === 'number' ? condoLngRaw : Number(condoLngRaw);
  const hasLocation = Number.isFinite(condoLat) && Number.isFinite(condoLng);

  // Tabs: Meu Condomínio | Próximos | Bairro
  type TabKey = 'meu' | 'proximos' | 'bairro';
  const [tab, setTab] = useState<TabKey>('meu');
  // Evita piscar "Sem posts" no primeiro render antes do primeiro fetch
  const [booting, setBooting] = useState(true);

  // Ao trocar de aba, limpamos o feed atual para evitar mistura e corrigir paginação
  useEffect(() => {
    // Limpa lista antes do novo fetch da aba
    dispatch(resetFeed());
    setBooting(true);
  }, [tab, dispatch]);

  // Readiness depende da aba selecionada e dos dados do usuário
  const isReadyForTab = useMemo(() => {
    // Apenas 'meu' depende de condoId; as outras abas não devem travar a UI por falta de localização
    if (tab === 'meu') return !!condoId;
    return true;
  }, [tab, condoId]);

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
    // Só busca quando há dados suficientes para a aba selecionada
    if (tab === 'meu') {
      if (!condoId) return;
      try {
        const res = await dispatch(
          loadMyCondoFeed({ condominioId: condoId, page, pageSize: size })
        ).unwrap();
        // Debug: listar os condomínios retornados para validar filtro
        const debugMap = (res ?? []).slice(0, 20).map((p) => ({ id: p?.documentId, condId: p?.condominio?.documentId, condNome: p?.condominio?.nome }));
      } catch (err) {
        console.error('[Feed] fetchPage: meu error', err);
      }
      return;
    }
    if (tab === 'bairro') {
      if (!hasLocation) {
        return;
      }
      try {
        const res = await dispatch(
          loadNearbyFeed({ lat: condoLat, lng: condoLng, radiusKm: BAIRRO_RADIUS_KM, page, pageSize: size })
        ).unwrap();
        // Sem fallback: se não houver posts, fica vazio
      } catch (err) {
        console.error('[Feed] fetchPage: bairro error', err);
        // Sem fallback para feed genérico
      }
      return;
    }
    // proximos
    try {
      if (hasLocation) {
        // Passa excludeCondoId e minItems para o thunk aplicar exclusão e backfill automático
        const res = await dispatch(
          loadNearbyFeed({ lat: condoLat, lng: condoLng, radiusKm: NEARBY_RADIUS_KM, page, pageSize: size, excludeCondoId: condoId, minItems: NEARBY_MIN_ITEMS })
        ).unwrap();
      } else {
        // Sem localização: não carrega feed genérico
      }
    } catch (err) {
      console.error('[Feed] fetchPage: proximos error', err);
      // Sem fallback para feed genérico
    }
  }, [dispatch, size, tab, condoId, bairro, condoLat, condoLng, hasLocation]);

  // Recarrega quando a tela ganha foco (inclui volta ao app e navegação)
  useFocusEffect(
    useCallback(() => {
      void fetchPage(1);
    }, [fetchPage])
  );

  // Garante um fetch inicial e controla o estado de boot para não exibir vazio
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!isReadyForTab) return;
        await fetchPage(1);
      } finally {
        // Garanta que não ficaremos presos no estado de booting mesmo quando a aba não puder buscar
        if (mounted) setBooting(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchPage, isReadyForTab]);

  // Recarrega quando o usuário pressiona a aba Feed novamente
  const navigation = useNavigation<any>();
  useEffect(() => {
    const unsub = navigation.addListener('tabPress', () => {
      void fetchPage(1);
    });
    return unsub;
  }, [navigation, fetchPage]);

  // Quando o usuário for carregado/atualizado ou a aba mudar, recarrega automaticamente
  useEffect(() => {
    if (!isReadyForTab) return;
    void fetchPage(1);
  }, [tab, condoId, bairro, isReadyForTab, fetchPage]);

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
    if (nextPage <= 1) return; // evita repedir página 1
    if (tab === 'bairro') {
      if (!hasLocation) return;
      return dispatch(
        loadNearbyFeed({ lat: condoLat, lng: condoLng, radiusKm: BAIRRO_RADIUS_KM, page: nextPage, pageSize: size })
      );
    }
    if (hasLocation) {
      return dispatch(
        loadNearbyFeed({ lat: condoLat, lng: condoLng, radiusKm: NEARBY_RADIUS_KM, page: nextPage, pageSize: size, excludeCondoId: condoId })
      );
    }
    // Sem fallback na paginação para feed genérico fora da aba 'meu'
    return;
  }, [dispatch, loading, data, nextPage, size, tab, hasLocation, condoLat, condoLng, condoId]);

  // Loading inicial
  if ((booting || loading || !isReadyForTab) && data.length === 0) {
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
        loading={(booting || !!loading) && visible.length === 0}
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