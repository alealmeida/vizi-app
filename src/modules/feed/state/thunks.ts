import { createAsyncThunk } from '@reduxjs/toolkit';
import { listPosts, type MinimalPost } from '@modules/feed/api/listPosts';
import type { ListPostsQueryVariables, ListMyCondoPostsQueryVariables, ListNeighborhoodPostsQueryVariables } from '@graphql/__generated__/types';
import { listMyCondoPosts } from '@modules/feed/api/listMyCondoPosts';
import { listNeighborhoodPosts } from '@modules/feed/api/listNeighborhoodPosts';

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
      return items;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Falha ao carregar feed do condomínio');
    }
  }
);

export const loadNeighborhoodFeed = createAsyncThunk<MinimalPost[], ListNeighborhoodPostsQueryVariables>(
  'feed/loadNeighborhood',
  async (vars, { rejectWithValue }) => {
    try {
      const items = await listNeighborhoodPosts(vars);
      return items;
    } catch (e: any) {
      return rejectWithValue(e?.message ?? 'Falha ao carregar feed do bairro');
    }
  }
);