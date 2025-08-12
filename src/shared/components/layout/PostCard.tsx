import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { formatTimeAgoPt } from '@shared/utils/date';
import type { PostFieldsFragment } from '@graphql/__generated__/types';

// Tipo flexível: mantém os campos que usamos, todos opcionais
type LoosePost = PostFieldsFragment & {
  conteudo?: string | null;
  tipo_post?: string | null; // pode não existir no schema atual
  preco?: number | null;
  condominio?: { id?: string | number | null; nome?: string | null } | null;
  criador_post?: { id?: string | number | null; username?: string | null; email?: string | null } | null;
};

type PostItem = LoosePost | null | undefined;

type BadgeConfig = {
  label: string;
  bg: string;
  fg: string;
};

const TIPO_POST_BADGES: Record<string, BadgeConfig> = {
  venda:    { label: 'Venda',    bg: '#EEF2FF', fg: '#3741D8' },
  troca:    { label: 'Troca',    bg: '#F0FDFA', fg: '#047857' },
  doacao:   { label: 'Doação',   bg: '#FDF2F8', fg: '#BE185D' },
  pedido:   { label: 'Pedido',   bg: '#FFF7ED', fg: '#C2410C' },
  campanha: { label: 'Campanha', bg: '#F5F3FF', fg: '#6D28D9' },
  evento:   { label: 'Evento',   bg: '#ECFEFF', fg: '#155E75' },
  servico:  { label: 'Serviço',  bg: '#F0F9FF', fg: '#075985' },
  // valores fora do enum (ex.: "aviso") não renderizam badge
};

function formatBRL(value?: number | null) {
  if (typeof value !== 'number') return null;
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  } catch {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}

export default function PostCard({
  post,
  onPress,
  style,
}: {
  post: PostItem;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  if (!post) return null;

  // tempo: prioriza data_publicacao; fallback createdAt
  const when = post.data_publicacao
    ? formatTimeAgoPt(post.data_publicacao)
    : (post.createdAt ? formatTimeAgoPt(post.createdAt) : '');

  const autor =
    post.criador_post?.username ||
    post.criador_post?.email ||
    'Anônimo';

  const condo = post.condominio?.nome || null;

  const precoLabel = formatBRL(post.preco);
  const hasPreco = !!precoLabel;

  const tipo = typeof post.tipo_post === 'string' ? post.tipo_post : '';
  const badge = tipo ? TIPO_POST_BADGES[tipo] : undefined;

  const metaParts = [
    autor,
    condo || undefined,
    when || undefined,
  ].filter(Boolean);

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper style={[styles.card, style]} onPress={onPress}>
      {/* Header: título + badge (se houver) */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {post.titulo ?? 'Sem título'}
        </Text>

        {badge && (
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <Text style={[styles.badgeText, { color: badge.fg }]}>{badge.label}</Text>
          </View>
        )}
      </View>

      {/* Meta (autor • condomínio • há …) */}
      {metaParts.length > 0 && (
        <Text style={styles.meta} numberOfLines={1}>
          {metaParts.join(' • ')}
        </Text>
      )}

      {/* Conteúdo resumido */}
      {!!post.conteudo && (
        <Text style={styles.body} numberOfLines={3}>
          {post.conteudo}
        </Text>
      )}

      {/* Preço (se houver) */}
      {hasPreco && (
        <View style={styles.pricePill}>
          <Text style={styles.priceText}>{precoLabel}</Text>
        </View>
      )}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { flex: 1, fontWeight: '600', fontSize: 16 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: { fontSize: 12, fontWeight: '700' },
  meta: { marginTop: 6, fontSize: 12, opacity: 0.6 },
  body: { marginTop: 8, fontSize: 14, lineHeight: 20 },
  pricePill: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  priceText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
});