import {
  ApolloClient,
  ApolloClientOptions,
  ApolloCache,
  InMemoryCache,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { ClientConfig, OptionsType } from "./types";
export function Client({
  domain,
  cacheConfig,
  restConfig,
  graphqlConfig,
}: ClientConfig) {
  try {
    console.log("---Builder config----", cacheConfig);
    const sharedCache = new InMemoryCache({ ...cacheConfig });
    const restClient = new ApolloClient({
      cache: sharedCache,
      link: new RestLink({
        uri: restConfig.uri,
        customFetch: restConfig.customFetch,
        headers: restConfig.headers,
        typePatcher: restConfig.typePatcher,
      }),
    });
    const graphqlClient = new ApolloClient({
      uri: graphqlConfig.uri,
      cache: sharedCache,
    });
    return { restClient, graphqlClient, sharedCache };
  } catch (e) {
    throw new Error(
      `Error: Problem in creating client: ${e} - Try using ClientManager.getInstance() first to create instance initially."
        );`
    );
  }
}
