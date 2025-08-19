import { createAsyncThunk } from '@reduxjs/toolkit';
import { listPosts, type MinimalPost } from '@features/feed/api/listPosts';
import type { ListPostsQueryVariables, ListMyCondoPostsQueryVariables, ListNeighborhoodPostsQueryVariables, ListNearbyPostsQueryVariables } from '@graphql/__generated__/types';
import { listMyCondoPosts } from '@features/feed/api/listMyCondoPosts';
import { listNeighborhoodPosts } from '@features/feed/api/listNeighborhoodPosts';
import { listNearbyPosts } from '@features/feed/api/listNearbyPosts';

type MinPostArr = MinimalPost[] | null | undefined;
const filterByCondoId = (items: MinPostArr, condoId: string, exclude = false) =>
  (items ?? []).filter((p) => (exclude ? p?.condominio?.documentId !== condoId : p?.condominio?.documentId === condoId));

async function backfillMinItems(
  primary: MinimalPost[],
  fetchAll: () => Promise<MinimalPost[]>,
  minItems: number
): Promise<MinimalPost[]> {
  if (!Number.isFinite(minItems) || (primary?.length ?? 0) >= minItems) return primary ?? [];
  const all = await fetchAll();
  const byId = new Set((primary ?? []).map((p) => p?.documentId));
  const extras = (all ?? []).filter((p) => p && !byId.has(p.documentId));
  return [...(primary ?? []), ...extras].slice(0, Math.max(0, minItems));
}

export const loadFeed = createAsyncThunk<MinimalPost[], ListPostsQueryVariables | void>(
  'feed/load',
  async (vars, { rejectWithValue }) => {
    try {
      const items = await listPosts(vars ?? { page: 1, pageSize: 10 });
      return items; // array de MinimalPost
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Falha ao carregar feed');
    }
  }
);

export const loadMyCondoFeed = createAsyncThunk<MinimalPost[], ListMyCondoPostsQueryVariables>(
  'feed/loadMyCondo',
  async (vars, { rejectWithValue }) => {
    try {
      const items = await listMyCondoPosts(vars);
      // Defensive filter: guarantee only posts from the requested condo documentId
      return filterByCondoId(items, vars.condominioId, false);
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Falha ao carregar feed do condomínio');
    }
  }
);

export const loadNeighborhoodFeed = createAsyncThunk<
  MinimalPost[],
  ListNeighborhoodPostsQueryVariables & { excludeCondoId?: string | undefined }
>(
  'feed/loadNeighborhood',
  async (vars, { rejectWithValue }) => {
    try {
      const { excludeCondoId, ...apiVars } = vars;
      const items = await listNeighborhoodPosts(apiVars as ListNeighborhoodPostsQueryVariables);
      return excludeCondoId ? filterByCondoId(items, excludeCondoId, true) : items;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Falha ao carregar feed do bairro');
    }
  }
);

export const loadNearbyFeed = createAsyncThunk<
  MinimalPost[],
  ListNearbyPostsQueryVariables & { excludeCondoId?: string | undefined; minItems?: number | undefined }
>(
  'feed/loadNearby',
  async (vars, { rejectWithValue }) => {
    try {
      const { excludeCondoId, minItems, ...apiVars } = vars;
      const items = await listNearbyPosts(apiVars as ListNearbyPostsQueryVariables);
      const primary = excludeCondoId ? filterByCondoId(items, excludeCondoId, true) : items;

      // Backfill: se solicitado e houver poucos itens, completa com lista sem exclusão
      if (excludeCondoId && typeof minItems === 'number' && (primary?.length ?? 0) < minItems) {
        return backfillMinItems(primary, () => listNearbyPosts(apiVars as ListNearbyPostsQueryVariables), minItems);
      }
      return primary;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Falha ao carregar feed próximo');
    }
  }
);