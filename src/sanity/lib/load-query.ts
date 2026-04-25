import { sanityClient } from 'sanity:client';
import type { QueryParams } from 'sanity';

export async function loadQuery<T>({
  query,
  params,
}: {
  query: string;
  params?: QueryParams;
}): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}
