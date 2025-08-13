import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import { formatTimeAgoPt } from '@shared/utils/date';
import type { PostFieldsFragment } from '@graphql/__generated__/types';

export type PostCardProps = {
  post: (PostFieldsFragment & { conteudo?: string | null }) | null | undefined;
  onPress?: () => void;
  style?: ViewStyle;
  /** Exibir trecho do conteúdo? (no feed fica false; no detalhe você não usa este card) */
  showExcerpt?: boolean;
};

type BadgeCfg = { label: string; bg: string; fg: string };
const TIPO_BADGE: Record<string, BadgeCfg> = {
  venda:    { label: 'Venda',    bg: '#EEF2FF', fg: '#3741D8' },
  troca:    { label: 'Troca',    bg: '#F0FDFA', fg: '#047857' },
  doacao:   { label: 'Doação',   bg: '#FDF2F8', fg: '#BE185D' },
  pedido:   { label: 'Pedido',   bg: '#FFF7ED', fg: '#C2410C' },
  campanha: { label: 'Campanha', bg: '#F5F3FF', fg: '#6D28D9' },
  evento:   { label: 'Evento',   bg: '#ECFEFF', fg: '#155E75' },
  servico:  { label: 'Serviço',  bg: '#F0F9FF', fg: '#075985' },
};

const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  ativo:    { bg: '#ECFDF5', fg: '#065F46', label: 'Ativo' },
  expirado: { bg: '#FEF3C7', fg: '#92400E', label: 'Expirado' },
  removido: { bg: '#FEE2E2', fg: '#991B1B', label: 'Removido' },
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
  showExcerpt = false,
}: PostCardProps) {
  if (!post) return null;

  // tempo: prioriza data_publicacao; fallback createdAt
  const when = post.data_publicacao
    ? formatTimeAgoPt(post.data_publicacao)
    : (post.createdAt ? formatTimeAgoPt(post.createdAt) : '');

  const autor = post.criador_post?.username || post.criador_post?.email || 'Anônimo';
  const condo = post.condominio?.nome || null;

  const precoLabel = formatBRL(post.preco);
  const tipoKey = (post.tipo_post ?? '').toString();
  const statusKey = (post.status_post ?? '').toString();

  const tipoBadge = TIPO_BADGE[tipoKey];
  const statusChip = STATUS_STYLE[statusKey];

  const metaParts = [autor, condo || undefined, when || undefined].filter(Boolean);

  const Wrapper: any = onPress ? Pressable : View;

  return (
    <Wrapper style={[styles.card, style]} onPress={onPress}>
      {/* Título */}
      <Text style={styles.title} numberOfLines={2}>
        {post.titulo ?? 'Sem título'}
      </Text>

      {/* Meta (autor • condomínio • há …) */}
      {metaParts.length > 0 && (
        <Text style={styles.meta} numberOfLines={1}>
          {metaParts.join(' • ')}
        </Text>
      )}

      {/* Badges (tipo, status) + preço */}
      <View style={styles.badgesRow}>
        {tipoBadge && (
          <View style={[styles.badge, { backgroundColor: tipoBadge.bg }]}>
            <Text style={[styles.badgeText, { color: tipoBadge.fg }]}>{tipoBadge.label}</Text>
          </View>
        )}
        {statusChip && (
          <View style={[styles.chip, { backgroundColor: statusChip.bg }]}>
            <Text style={[styles.chipText, { color: statusChip.fg }]}>{statusChip.label}</Text>
          </View>
        )}
        {precoLabel && (
          <View style={styles.pricePill}>
            <Text style={styles.priceText}>{precoLabel}</Text>
          </View>
        )}
      </View>

      {/* Excerpt opcional (no feed fica false) */}
      {showExcerpt && !!post.conteudo && (
        <Text style={styles.body} numberOfLines={3}>
          {post.conteudo}
        </Text>
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
  title: { fontWeight: '600', fontSize: 16 },
  meta: { marginTop: 6, fontSize: 12, opacity: 0.6 },
  badgesRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  chip: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 },
  chipText: { fontSize: 12, fontWeight: '700' },
  pricePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  priceText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  body: { marginTop: 10, fontSize: 14, lineHeight: 20 },
});