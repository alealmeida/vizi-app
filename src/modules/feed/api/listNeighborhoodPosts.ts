import { getGraphQLClient } from '@shared/lib/graphqlClient';
import {
  ListNeighborhoodPostsDocument,
  type ListNeighborhoodPostsQuery,
  type ListNeighborhoodPostsQueryVariables,
} from '@graphql/__generated__/types';
import type { MinimalPost } from './listPosts';

const isMinimalPost = (
  x: NonNullable<ListNeighborhoodPostsQuery['posts']>[number]
): x is MinimalPost => x !== null;

export async function listNeighborhoodPosts(
  variables: ListNeighborhoodPostsQueryVariables
): Promise<MinimalPost[]> {
  const client = getGraphQLClient();
  const data = await client.request<ListNeighborhoodPostsQuery>(ListNeighborhoodPostsDocument, variables);
  const arr = data.posts ?? [];
  return arr.filter(isMinimalPost);
}
