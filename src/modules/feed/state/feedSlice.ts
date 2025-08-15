import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MinimalPost } from '@modules/feed/api/listPosts';
import { loadFeed, loadMyCondoFeed, loadNeighborhoodFeed } from './thunks';

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
      const next = a.payload ?? [];
      s.items = next.length > 0 ? next : s.items;
    });
    b.addCase(loadFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed';
    });

    // Meu condomínio
    b.addCase(loadMyCondoFeed.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(loadMyCondoFeed.fulfilled, (s, a: PayloadAction<MinimalPost[]>) => {
      s.loading = false;
      const next = a.payload ?? [];
      s.items = next.length > 0 ? next : s.items;
    });
    b.addCase(loadMyCondoFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed do condomínio';
    });

    // Bairro
    b.addCase(loadNeighborhoodFeed.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(loadNeighborhoodFeed.fulfilled, (s, a: PayloadAction<MinimalPost[]>) => {
      s.loading = false;
      const next = a.payload ?? [];
      s.items = next.length > 0 ? next : s.items;
    });
    b.addCase(loadNeighborhoodFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed do bairro';
    });
  },
});

export const { resetFeed } = slice.actions;
export default slice.reducer;