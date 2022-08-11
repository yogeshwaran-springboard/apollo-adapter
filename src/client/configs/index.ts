import { DomainConfig } from "../types";

export const domainConfigs: DomainConfig = {
  restConfig: {
    uri: "http://localhost:4001",
    customFetch: fetch,
    headers: {
      "Content-Type": "application/json",
    },
    //typePatcher
    //endpoints
    //responseTransformer
  },
  graphqlConfig: {
    uri: "http://localhost:4000",
    //connectToDevTools
    //queryDeduplication
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'cache-and-network',
    //   },
    // },
  },
  cacheConfig: {
    //addTypeName
  },
};
