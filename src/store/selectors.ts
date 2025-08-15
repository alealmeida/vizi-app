// src/store/selectors.ts
import type { RootState } from './index';
import type { UserData } from '@shared/types/user';
import type { MinimalPost } from '@modules/feed/api/listPosts';

// Auth
export const selectAuthToken = (state: RootState): string | null => state.auth.token;
export const selectAuthLoading = (state: RootState): boolean => state.auth.loading;
export const selectAuthError = (state: RootState): string | null => state.auth.error;

// User
export const selectUserProfile = (state: RootState): UserData | null => state.user.profile;
export const selectUserLoading = (state: RootState): boolean => state.user.loading;
export const selectUserError = (state: RootState): string | null => state.user.error;

// Feed
export const selectFeedItems = (state: RootState): MinimalPost[] => state.feed.items;
export const selectFeedLoading = (state: RootState): boolean => state.feed.loading;
export const selectFeedError = (state: RootState): string | null => state.feed.error;
export const selectFeedPageSize = (state: RootState): number => state.feed.pageSize;
// Placeholder: only if/when unread exists in state
export const selectFeedUnread = (state: RootState): number | undefined =>
  (state.feed as Partial<{ unread: number }>).unread;
