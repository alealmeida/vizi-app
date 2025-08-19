import React from 'react';
import { Pressable, ViewStyle } from 'react-native';
import Box from '@ui/components/primitives/Box';
import Text from '@ui/components/primitives/Text';
import Card from '@ui/components/molecules/Card';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '@ui/theme';
import { formatTimeAgoPt } from '@shared/utils/date';
import type { PostFieldsFragment } from '@graphql/__generated__/types';

export type PostCardProps = {
  post: (PostFieldsFragment & { conteudo?: string | null }) | null | undefined;
  onPress?: () => void;
  style?: ViewStyle;
  /** Exibir trecho do conteúdo? (no feed fica false; no detalhe você não usa este card) */
  showExcerpt?: boolean;
};

type BadgeCfg = { label: string; kind: 'brand' | 'success' | 'warning' | 'danger' | 'info' };
const TIPO_BADGE: Record<string, BadgeCfg> = {
  venda:    { label: 'Venda',    kind: 'brand' },
  troca:    { label: 'Troca',    kind: 'success' },
  doacao:   { label: 'Doação',   kind: 'info' },
  pedido:   { label: 'Pedido',   kind: 'warning' },
  campanha: { label: 'Campanha', kind: 'info' },
  evento:   { label: 'Evento',   kind: 'info' },
  servico:  { label: 'Serviço',  kind: 'brand' },
};

const STATUS_STYLE: Record<string, { label: string; kind: 'success' | 'warning' | 'danger' } > = {
  ativo:    { label: 'Ativo',    kind: 'success' },
  expirado: { label: 'Expirado', kind: 'warning' },
  removido: { label: 'Removido', kind: 'danger' },
};

function formatBRL(value?: number | null) {
  if (typeof value !== 'number') return null;
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  } catch {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }
}

function Chip({ label, kind }: { label: string; kind: 'brand' | 'success' | 'warning' | 'danger' | 'info' }) {
  type BgKey = 'brandSubtle' | 'successSubtle' | 'warningSubtle' | 'dangerSubtle' | 'infoSubtle';
  type FgKey = 'brand' | 'success' | 'warning' | 'danger' | 'info';
  const bgMap: Record<BgKey | FgKey, BgKey> = {
    brand: 'brandSubtle',
    success: 'successSubtle',
    warning: 'warningSubtle',
    danger: 'dangerSubtle',
    info: 'infoSubtle',
    brandSubtle: 'brandSubtle',
    successSubtle: 'successSubtle',
    warningSubtle: 'warningSubtle',
    dangerSubtle: 'dangerSubtle',
    infoSubtle: 'infoSubtle',
  };
  const fgMap: Record<'brand' | 'success' | 'warning' | 'danger' | 'info', FgKey> = {
    brand: 'brand',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    info: 'info',
  };
  const bgKey = bgMap[kind];
  const fgKey = fgMap[kind];
  return (
    <Box backgroundColor={bgKey} borderRadius="pill" style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
      <Text style={{ fontSize: 12, fontWeight: '700' }} color={fgKey}>
        {label}
      </Text>
    </Box>
  );
}

function PricePill({ label }: { label: string }) {
  return (
    <Box alignSelf="flex-start" borderRadius="pill" paddingHorizontal="md" paddingVertical="xs" backgroundColor="bgMuted">
      <Text style={{ fontSize: 12, fontWeight: '700' }} color="textPrimary">
        {label}
      </Text>
    </Box>
  );
}

function PostCard({
  post,
  onPress,
  style,
  showExcerpt = false,
}: PostCardProps) {
  const theme = useTheme<Theme>();
  if (!post) return null;

  // tempo: prioriza data_publicacao; fallback createdAt
  const when = post.data_publicacao
    ? formatTimeAgoPt(post.data_publicacao)
    : (post.createdAt ? formatTimeAgoPt(post.createdAt) : '');

  const autor = post.criador_post?.username || post.criador_post?.email || 'Anônimo';
  const condo = post.condominio?.nome || null;
  const condoId = post.condominio?.documentId || null;

  const precoLabel = formatBRL(post.preco);
  const tipoKey = (post.tipo_post ?? '').toString();
  const statusKey = (post.status_post ?? '').toString();

  const tipoBadge = TIPO_BADGE[tipoKey];
  const statusChip = STATUS_STYLE[statusKey];

  const metaParts = [autor, condo || undefined, when || undefined].filter(Boolean);
  const metaJoined = metaParts.join(' • ');
  const metaDebug = __DEV__ && condoId ? `${metaJoined}  ·  [condoId: ${condoId}]` : metaJoined;

  const Wrapper: any = onPress ? Pressable : React.Fragment;
  const wrapperProps = onPress ? { onPress } : {};

  const content = (
    <Card padding="xl" backgroundColor={"bgCanvas" as any} borderWidth={0} elevation={0}>
      {/* Título */}
      <Text variant="title" numberOfLines={2}>
        {post.titulo ?? 'Sem título'}
      </Text>

      {/* Meta (autor • condomínio • há …) */}
      {metaParts.length > 0 && (
        <Box style={{ marginTop: theme.spacing.sm }}>
          <Text variant="caption" numberOfLines={1}>
            {metaDebug}
          </Text>
        </Box>
      )}

      {/* Badges (tipo, status) + preço */}
      <Box
        flexDirection="row"
        flexWrap="wrap"
        marginTop="md"
        alignItems="center"
        style={{ gap: theme.spacing.sm }}
      >
        {tipoBadge && <Chip label={tipoBadge.label} kind={tipoBadge.kind} />}
        {statusChip && <Chip label={statusChip.label} kind={statusChip.kind} />}
        {precoLabel && <PricePill label={precoLabel} />}
      </Box>

      {/* Excerpt opcional (no feed fica false) */}
      {showExcerpt && !!post.conteudo && (
        <Box style={{ marginTop: theme.spacing.md }}>
          <Text variant="body" numberOfLines={3}>
            {post.conteudo}
          </Text>
        </Box>
      )}
    </Card>
  );

  return (
    <Box style={style} marginBottom="md">
      {onPress ? (
        <Wrapper {...wrapperProps}>{content}</Wrapper>
      ) : (
        content
      )}
    </Box>
  );
}

export default React.memo(PostCard);