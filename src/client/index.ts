import { ClientManager } from "./clientManger";
import { domainConfigs } from "./configs";
import { ClientConfig, ClientPolicies } from "./types";

export function Client() {
  const create = ({ config, domain }: ClientPolicies) => {
    const manager = ClientManager.getInstance();
    let { restConfig, cacheConfig, graphqlConfig } = domainConfigs[
      domain
    ] as ClientConfig;
    restConfig = { ...restConfig, ...config.rest };
    graphqlConfig = { ...graphqlConfig, ...config.graphql };
    cacheConfig = { ...cacheConfig, ...config.cache };
    const { graphqlClient, restClient, sharedCache } = manager.createClient({
      cacheConfig,
      restConfig,
      graphqlConfig,
      domain,
    });

    return { graphqlClient, restClient, sharedCache };
  };
  const get = (domain: string) => {
    const manager = ClientManager.getInstance();
    return manager.getClient(domain);
  };

  return { create, get };
}
