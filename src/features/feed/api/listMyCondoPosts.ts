import { getGraphQLClient } from '@shared/lib/graphqlClient';
import {
  ListMyCondoPostsDocument,
  type ListMyCondoPostsQuery,
  type ListMyCondoPostsQueryVariables,
} from '@graphql/__generated__/types';
import type { MinimalPost } from './listPosts';

const isMinimalPost = (
  x: NonNullable<ListMyCondoPostsQuery['posts']>[number]
): x is MinimalPost => x !== null;

export async function listMyCondoPosts(
  variables: ListMyCondoPostsQueryVariables
): Promise<MinimalPost[]> {
  const client = getGraphQLClient();
  const data = await client.request<ListMyCondoPostsQuery>(ListMyCondoPostsDocument, variables);
  const arr = data.posts ?? [];
  return arr.filter(isMinimalPost);
}
