import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Pressable, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import BaseScreen from '@shared/components/layout/BaseScreen';
import Button from '@ui/components/atoms/Button';
import { getGraphQLClient } from '@shared/lib/graphqlClient';
import {
  GetPostByDocumentIdDocument,
  type GetPostByDocumentIdQuery,
} from '@graphql/__generated__/types';
import { formatTimeAgoPt } from '@shared/utils/date';
import { useAppSelector } from '@store/hooks';

// ------- helpers visuais -------
const TIPO_BADGE: Record<string, { label: string; bg: string; fg: string }> = {
  venda:    { label: 'Venda',    bg: '#EEF2FF', fg: '#3741D8' },
  troca:    { label: 'Troca',    bg: '#F0FDFA', fg: '#047857' },
  doacao:   { label: 'Doação',   bg: '#FDF2F8', fg: '#BE185D' },
  pedido:   { label: 'Pedido',   bg: '#FFF7ED', fg: '#C2410C' },
  campanha: { label: 'Campanha', bg: '#F5F3FF', fg: '#6D28D9' },
  evento:   { label: 'Evento',   bg: '#ECFEFF', fg: '#155E75' },
  servico:  { label: 'Serviço',  bg: '#F0F9FF', fg: '#075985' },
};

const STATUS_STYLE: Record<string, { label: string; bg: string; fg: string }> = {
  ativo:    { label: 'Ativo',    bg: '#ECFDF5', fg: '#065F46' },
  expirado: { label: 'Expirado', bg: '#FEF3C7', fg: '#92400E' },
  removido: { label: 'Removido', bg: '#FEE2E2', fg: '#991B1B' },
};

const NEGOCIO_STYLE: Record<string, { label: string; bg: string; fg: string }> = {
  venda:  { label: 'Negócio: Venda',  bg: '#EFF6FF', fg: '#1D4ED8' },
  troca:  { label: 'Negócio: Troca',  bg: '#ECFEFF', fg: '#155E75' },
  doacao: { label: 'Negócio: Doação', bg: '#F0FDF4', fg: '#166534' },
};

function formatBRL(value?: number | null) {
  if (typeof value !== 'number') return null;
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  } catch {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}

export default function PostDetailModal() {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const router = useRouter();

  // tenta achar no cache do feed primeiro (preview)
  const cached = useAppSelector(s =>
    (s.feed?.items ?? []).find((p: any) => p?.documentId === documentId)
  ) as GetPostByDocumentIdQuery['posts'][number] | undefined;

  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<GetPostByDocumentIdQuery['posts'][number] | undefined>(cached);

  // micro‑interação (fade + translateY suave)
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 180, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY]);

  // decide se precisamos buscar o "detalhe" mesmo com cache do feed
  const needFetch =
    !cached ||
    !cached.conteudo ||
    cached.status_post == null ||
    cached.tipo_negociacao == null ||
    cached.escopo_visibilidade == null ||
    cached.nivel_visibilidade == null;

  useEffect(() => {
    let isMounted = true;

    // mostra já o cache (instant render)
    if (cached) setPost(cached);

    if (!needFetch) {
      setLoading(false);
      return () => { isMounted = false; };
    }

    (async () => {
      try {
        setLoading(true);
        const client = getGraphQLClient();
        const res = await client.request(GetPostByDocumentIdDocument, { documentId });
        const found = res?.posts?.[0] ?? undefined;
        if (isMounted) setPost(found);
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? 'Falha ao carregar post');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, [cached, needFetch, documentId]);

  const when = useMemo(() => {
    const d = post?.data_publicacao || post?.createdAt;
    return d ? formatTimeAgoPt(d) : null;
  }, [post]);

  const autor = post?.criador_post?.username || post?.criador_post?.email || 'Anônimo';
  const condo = post?.condominio?.nome || null;
  const precoLabel = formatBRL(post?.preco ?? null);

  const tipoBadge   = post?.tipo_post ? TIPO_BADGE[String(post.tipo_post)] : undefined;
  const statusChip  = post?.status_post ? STATUS_STYLE[String(post.status_post)] : undefined;
  const negocioChip = post?.tipo_negociacao ? NEGOCIO_STYLE[String(post.tipo_negociacao)] : undefined;

  if (loading && !post) {
    return (
      <BaseScreen>
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.dim}>Carregando…</Text>
        </View>
      </BaseScreen>
    );
  }

  if (error || !post) {
    return (
      <BaseScreen>
        <View style={styles.center}>
          <Text style={styles.error}>{error || 'Post não encontrado.'}</Text>
          <Button label="Voltar" onPress={() => router.back()} style={{ marginTop: 12 }} />
        </View>
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      {/* header do modal */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="chevron-back" size={24} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>Detalhe</Text>
        <View style={{ width: 24 }} />
      </View>

      <Animated.View style={{ flex: 1, opacity, transform: [{ translateY }] }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{post?.titulo ?? 'Sem título'}</Text>

          {/* meta */}
          <Text style={styles.meta}>
            {autor}{condo ? ` • ${condo}` : ''}{when ? ` • ${when}` : ''}
          </Text>

          {/* badges */}
          <View style={styles.badgesRow}>
            {tipoBadge && (
              <View style={[styles.badge, { backgroundColor: tipoBadge.bg }]}>
                <Text style={[styles.badgeText, { color: tipoBadge.fg }]}>{tipoBadge.label}</Text>
              </View>
            )}
            {negocioChip && (
              <View style={[styles.badge, { backgroundColor: negocioChip.bg }]}>
                <Text style={[styles.badgeText, { color: negocioChip.fg }]}>{negocioChip.label}</Text>
              </View>
            )}
            {statusChip && (
              <View style={[styles.badge, { backgroundColor: statusChip.bg }]}>
                <Text style={[styles.badgeText, { color: statusChip.fg }]}>{statusChip.label}</Text>
              </View>
            )}
            {precoLabel && (
              <View style={styles.pricePill}>
                <Text style={styles.priceText}>{precoLabel}</Text>
              </View>
            )}
          </View>

          {/* descrição completa */}
          {!!post?.conteudo && <Text style={styles.body}>{post.conteudo}</Text>}
        </ScrollView>
      </Animated.View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: { flex: 1, textAlign: 'center', fontWeight: '700', fontSize: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, padding: 24 },
  dim: { opacity: 0.7 },
  error: { color: 'red', textAlign: 'center' },
  container: { padding: 16, paddingBottom: 32, gap: 10 },
  title: { fontSize: 20, fontWeight: '700' },
  meta: { fontSize: 12, opacity: 0.6, marginTop: 4 },
  badgesRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 10 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  pricePill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  priceText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  body: { marginTop: 12, fontSize: 15, lineHeight: 22 },
});