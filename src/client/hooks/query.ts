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


const useGraphqlQuery = (query: DocumentNode, options: UseQueryOptions) => {
  const { domain, onSuccess } = options;
  const {graphqlClient } = getClient(domain);

  return useQuery(query, {
    client: graphqlClient,
    onCompleted: onSuccess,
    ...options,
  });
};
const useRestQuery = (query: DocumentNode, options: UseQueryOptions) => {
  const { domain, onSuccess } = options;
  const { restClient } = getClient(domain);
  return useQuery(query, {
    client: restClient,
    onCompleted: onSuccess,
    ...options,
  });
};

const useGraphqlLazyQuery = (
  query: DocumentNode,
  options: UseLazyQueryOptions
) => {
  const { domain, onSuccess } = options;
  const { graphqlClient } = getClient(domain);
  return useLazyQuery(query, {
    client: graphqlClient,
    onCompleted: onSuccess,
    ...options,
  });
};

const useRestLazyQuery = (
  query: DocumentNode,
  options: UseLazyQueryOptions
) => {
  const { domain, onSuccess } = options;
  const { restClient } = getClient(domain);
  return useLazyQuery(query, {
    client: restClient,
    onCompleted: onSuccess,
    ...options,
  });
};
const useGraphqlMutation = (query: DocumentNode, options: UseMutateOptions) => {
  const { domain, onSuccess } = options;
  const { graphqlClient } = getClient(domain);
  return useMutation(query, {
    client: graphqlClient,
    onCompleted: onSuccess,
    ...options,
  });
};
const useRestMutation = (query: DocumentNode, options: UseMutateOptions) => {
  const { domain, onSuccess } = options;
  const { restClient } = getClient(domain);
  return useMutation(query, {
    client: restClient,
    onCompleted: onSuccess,
    ...options,
  });
};

const refetchRestQuery = async (
  query: RefetchQueriesInclude,
  options: RefetchQueryOption
) => {
  const { domain } = options;
  const { restClient } = getClient(domain);
  return await restClient.refetchQueries({
    include: query,
  });
};
const refetchGraphqlQuery = async (
  query: RefetchQueriesInclude,
  options: RefetchQueryOption
) => {
  const { domain } = options;
  const { graphqlClient } = getClient(domain);
  return await graphqlClient.refetchQueries({
    include: query,
  });
};
export {
  useGraphqlQuery,
  useRestQuery,
  useGraphqlLazyQuery,
  useRestLazyQuery,
  useGraphqlMutation,
  useRestMutation,
  refetchRestQuery,
  refetchGraphqlQuery,
};
