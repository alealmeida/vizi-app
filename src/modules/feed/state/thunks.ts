import { createAsyncThunk } from '@reduxjs/toolkit';
import { listPosts, type MinimalPost } from '@modules/feed/api/listPosts';
import type { ListPostsQueryVariables } from '@graphql/__generated__/types';

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