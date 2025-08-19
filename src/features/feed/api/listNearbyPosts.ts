import { getGraphQLClient } from '@shared/lib/graphqlClient';
import {
  ListNearbyPostsDocument,
  type ListNearbyPostsQuery,
  type ListNearbyPostsQueryVariables,
} from '@graphql/__generated__/types';
import type { MinimalPost } from './listPosts';

const isMinimalPost = (
  x: NonNullable<ListNearbyPostsQuery['nearbyPosts']>[number]
): x is MinimalPost => x !== null;

export async function listNearbyPosts(
  variables: ListNearbyPostsQueryVariables
): Promise<MinimalPost[]> {
  const client = getGraphQLClient();
  const data = await client.request<ListNearbyPostsQuery>(ListNearbyPostsDocument, variables);
  const arr = data.nearbyPosts ?? [];
  return arr.filter(isMinimalPost);
}
