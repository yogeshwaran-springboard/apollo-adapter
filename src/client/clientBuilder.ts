import {
  ApolloClient,
  ApolloClientOptions,
  ApolloCache,
  InMemoryCache,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { ClientConfig, OptionsType } from "./types";
export class ClientBuilder {
  private static instance: ClientBuilder;
  public domain: string;
  private cacheConfig: OptionsType;
  private restConfig: OptionsType;
  private graphqlConfig: OptionsType;

  constructor({
    domain,
    restConfig,
    graphqlConfig,
    cacheConfig,
  }: ClientConfig) {
    this.domain = domain;
    this.restConfig = restConfig;
    this.graphqlConfig = graphqlConfig;
    this.cacheConfig = cacheConfig;
  }
  public static getInstance({
    domain,
    restConfig,
    graphqlConfig,
    cacheConfig,
  }: ClientConfig): ClientBuilder {
    if (!ClientBuilder.instance) {
      ClientBuilder.instance = new ClientBuilder({
        domain,
        restConfig,
        graphqlConfig,
        cacheConfig,
      });
    }

    return ClientBuilder.instance;
  }
  public createClient() {
    try {
      const sharedCache = new InMemoryCache({ ...this.cacheConfig });
      const restClient = new ApolloClient({
        cache: sharedCache,
        link: new RestLink({
          uri: this.restConfig.uri,
          customFetch: this.restConfig.customFetch,
          headers: this.restConfig.headers,
          typePatcher: this.restConfig.typePatcher,
        }),
      });
      const graphqlClient = new ApolloClient({
        uri: this.graphqlConfig.uri,
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
}
