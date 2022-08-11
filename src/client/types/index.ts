import {
  ApolloCache,
  ApolloClient,
  Cache,
  DocumentNode,
  LazyQueryHookOptions,
  MutationHookOptions,
  NormalizedCacheObject,
  QueryHookOptions,
  RefetchQueriesOptions,
} from "@apollo/client";
import { ReactNode } from "react";
import { ClientManager } from "../clientManger";
export type OptionsType = {
  [key: string]: any;
};

export interface ClientDetails {
  restClient: ApolloClient<any>;
  graphqlClient: ApolloClient<any>;
  sharedCache: ApolloCache<NormalizedCacheObject>;
  domain: string;
}

export interface DomainConfig {
  restConfig: OptionsType;
  graphqlConfig: OptionsType;
  cacheConfig: OptionsType;
}

export interface ClientConfig extends DomainConfig {
  domain: string;
}

export interface ClientCreateType {
  config: DomainConfig;
  domain: string;
  manager: ClientManager
}
export interface QueryOptions {
  domain: string;
  query: DocumentNode;
  options: OptionsType;
}

export interface MutationOptions {
  domain: string;
  query: DocumentNode;
  options: OptionsType;
}

export interface UseQueryOptions extends QueryHookOptions {
  domain: string;
  onSuccess?: () => void;
}

export interface UseMutateOptions extends MutationHookOptions {
  domain: string;
  onSuccess?: () => void;
}
export interface UseLazyQueryOptions extends LazyQueryHookOptions {
  domain: string;
  onSuccess?: () => void;
}
export interface RefetchQueryOption extends RefetchQueriesOptions<any, any> {
  domain: string;
}
//cache
export interface ReadCacheOptions extends Cache.ReadQueryOptions<any, any> {
  domain: string;
}

export interface WriteCacheOptions extends Cache.WriteQueryOptions<any, any> {
  domain: string;
}

export interface ReadFragmentOptions
  extends Cache.ReadFragmentOptions<any, any> {
  domain: string;
}

export interface WriteFragmentOptions
  extends Cache.WriteFragmentOptions<any, any> {
  domain: string;
}

export interface EvictCacheOptions extends Cache.EvictOptions {
  domain: string;
}
export interface IdentifyCacheOptions extends OptionsType {
  domain: string;
}

export interface ModifyCacheOptions extends Cache.ModifyOptions {
  domain: string;
}
export interface MockType {
  request: OptionsType;
  result: OptionsType;
  error: OptionsType;
}
export interface MockWrapper {
  children: ReactNode;
}
export interface MockResult {
  current: OptionsType[];
}
