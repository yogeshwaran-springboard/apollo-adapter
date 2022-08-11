import { Client } from "../client";
import { ClientManager } from "../clientManger";
import { domainConfigs } from "../configs";
import { ClientCreateType, DomainConfig } from "../types";

export function create({ config, domain, manager }: ClientCreateType) {
  // infra default config
  const {
    restConfig: infraRestConfig,
    cacheConfig: infraCacheConfig,
    graphqlConfig: infraGraphqlConfig,
  } = domainConfigs as DomainConfig;
  // domain based custom config

  const {
    restConfig: domainRestConfig,
    cacheConfig: domainCacheConfig,
    graphqlConfig: domainGraphqlConfig,
  } = config as DomainConfig;
  //combining the infra default configs and domain config
  const restConfig = { ...infraRestConfig, ...domainRestConfig };
  const graphqlConfig = { ...infraGraphqlConfig, ...domainGraphqlConfig };
  const cacheConfig = { ...infraCacheConfig, ...domainCacheConfig };

  // if (!manager.getDomainClient(domain)) {
  // creating a client using clientBuilder

  const { graphqlClient, restClient, sharedCache } = Client({
    restConfig,
    graphqlConfig,
    cacheConfig,
    domain,
  });

  // adding the new domain client to the client manager

  manager.addDomainClient({
    graphqlClient,
    restClient,
    sharedCache,
    domain,
  });
}
