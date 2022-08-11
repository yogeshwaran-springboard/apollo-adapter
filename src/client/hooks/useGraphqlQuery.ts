import {
  DocumentNode,
  RefetchQueriesInclude,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { getClient } from "../helpers";

import {
  RefetchQueryOption,
  UseLazyQueryOptions,
  UseMutateOptions,
  UseQueryOptions,
} from "../types";

export const useGraphqlQuery = (query: DocumentNode, options: UseQueryOptions) => {
  const { domain, onSuccess } = options;
  const { graphqlClient } = getClient(domain);

  return useQuery(query, {
    client: graphqlClient,
    onCompleted: onSuccess,
    ...options,
  });
};
