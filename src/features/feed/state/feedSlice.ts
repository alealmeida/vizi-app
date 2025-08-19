import { createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit';
import type { MinimalPost } from '@features/feed/api/listPosts';
import { loadFeed, loadMyCondoFeed, loadNeighborhoodFeed, loadNearbyFeed } from './thunks';

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
    b.addMatcher(
      isAnyOf(
        loadFeed.pending,
        loadMyCondoFeed.pending,
        loadNeighborhoodFeed.pending,
        loadNearbyFeed.pending
      ),
      (s) => {
        s.loading = true;
        s.error = null;
      }
    );

    b.addMatcher(
      isAnyOf(
        loadFeed.fulfilled,
        loadMyCondoFeed.fulfilled,
        loadNeighborhoodFeed.fulfilled,
        loadNearbyFeed.fulfilled
      ),
      (s, a: PayloadAction<MinimalPost[]>) => {
        s.loading = false;
        const next = a.payload ?? [];
        s.items = next;
      }
    );

    // Specific rejected handlers keep tailored error messages
    b.addCase(loadFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed';
    });
    b.addCase(loadMyCondoFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed do condomínio';
    });
    b.addCase(loadNeighborhoodFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed do bairro';
    });
    b.addCase(loadNearbyFeed.rejected, (s, a) => {
      s.loading = false;
      s.error = (a.payload as string) ?? a.error.message ?? 'Erro ao carregar feed próximo';
    });
  },
});

export const { resetFeed } = slice.actions;
export default slice.reducer;