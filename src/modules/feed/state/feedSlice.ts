import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MinimalPost } from '@modules/feed/api/listPosts';
import { loadFeed } from './thunks';

type FeedState = {
  items: MinimalPost[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
};

const initialState: FeedState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
};

const slice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    resetFeed: () => initialState,
  },
  extraReducers: (b) => {
    b.addCase(loadFeed.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(loadFeed.fulfilled, (s, a: PayloadAction<MinimalPost[]>) => {
      s.loading = false;
      s.items = a.payload ?? [];
    });
    b.addCase(loadFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed';
    });
  },
});

export const { resetFeed } = slice.actions;
export default slice.reducer;