import { getGraphQLClient } from '@shared/lib/graphqlClient';
import {
  ListPostsDocument,
  type ListPostsQuery,
  type ListPostsQueryVariables,
} from '@graphql/__generated__/types';

// Tipo mínimo retornado pela query (um item não-nulo do array "posts")
export type MinimalPost =
  NonNullable<NonNullable<ListPostsQuery['posts']>[number]>;

const isMinimalPost = (
  x: NonNullable<ListPostsQuery['posts']>[number]
): x is MinimalPost => x !== null;

export async function listPosts(
  variables: ListPostsQueryVariables = { page: 1, pageSize: 10 }
): Promise<MinimalPost[]> {
  const client = getGraphQLClient();
  const data = await client.request<ListPostsQuery>(ListPostsDocument, variables);
  const arr = data.posts ?? [];
  return arr.filter(isMinimalPost);
}