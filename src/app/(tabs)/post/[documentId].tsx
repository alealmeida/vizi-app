import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import BaseScreen from '@shared/components/layout/BaseScreen';
import Button from '@shared/components/ui/Button';
import { getGraphQLClient } from '@shared/lib/graphqlClient';
import { GetPostByDocumentIdDocument, type GetPostByDocumentIdQuery } from '@graphql/__generated__/types';
import { formatTimeAgoPt } from '@shared/utils/date';
import { useAppSelector } from '@store/hooks';

export default function PostDetailRoute() {
  const { documentId } = useLocalSearchParams<{ documentId: string }>();
  const router = useRouter();

  // tenta achar no cache do feed primeiro
  const cached = useAppSelector(s =>
    (s.feed?.items ?? []).find((p: any) => p?.documentId === documentId)
  ) as GetPostByDocumentIdQuery['posts'][number] | undefined;

  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<GetPostByDocumentIdQuery['posts'][number] | undefined>(cached);

  useEffect(() => {
    if (cached) return; // já tem do cache
    let isMounted = true;
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
  }, [cached, documentId]);

  const when = useMemo(() => {
    const d = post?.data_publicacao || post?.createdAt;
    return d ? formatTimeAgoPt(d) : null;
  }, [post]);

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

  const autor = post?.criador_post?.username || post?.criador_post?.email || 'Anônimo';
  const condo = post?.condominio?.nome || null;
  const preco = typeof post?.preco === 'number'
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(post.preco)
    : null;

  return (
    <BaseScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Button variant="ghost" label="Voltar" onPress={() => router.back()} />
          {/* espaço para botão de ação futura (denunciar, compartilhar etc.) */}
        </View>

        <Text style={styles.title}>{post?.titulo ?? 'Sem título'}</Text>

        <Text style={styles.meta}>
          {autor}{condo ? ` • ${condo}` : ''}{when ? ` • ${when}` : ''}
        </Text>

        {!!preco && <Text style={styles.price}>{preco}</Text>}

        {!!post?.conteudo && (
          <Text style={styles.body}>{post.conteudo}</Text>
        )}
      </ScrollView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, padding: 24 },
  dim: { opacity: 0.7 },
  error: { color: 'red', textAlign: 'center' },
  container: { padding: 16, paddingBottom: 32, gap: 8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 20, fontWeight: '700' },
  meta: { fontSize: 12, opacity: 0.6, marginTop: 4 },
  price: { marginTop: 8, fontSize: 16, fontWeight: '700' },
  body: { marginTop: 12, fontSize: 15, lineHeight: 22 },
});