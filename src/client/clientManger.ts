import { ClientBuilder } from "./clientBuilder";
import { Client, ClientConfig } from "./types";

export class ClientManager {
  private static client: ClientManager;
  private domains: Client[];

  private constructor() {
    this.domains = [];
    if (ClientManager.client) {
      throw new Error(
        "Error: Problem in instance creation: Use ClientManager.getInstance() to create instance initially."
      );
    }
    ClientManager.client = this;
  }

  public static getInstance(): ClientManager {
    if (!ClientManager.client) {
      ClientManager.client = new ClientManager();
    }

    return ClientManager.client;
  }

  public addDomain({ graphqlClient, restClient, sharedCache, domain }: Client) {
    this.domains = [
      ...this.domains,
      {
        domain,
        sharedCache,
        restClient,
        graphqlClient,
      },
    ];
  }

  public registerClient({
    domain,
    restConfig,
    graphqlConfig,
    cacheConfig,
  }: ClientConfig) {
    try {
      const builder = ClientBuilder.getInstance({
        domain,
        restConfig,
        graphqlConfig,
        cacheConfig,
      });
      const { graphqlClient, restClient, sharedCache } = builder.createClient();

      this.addDomain({ domain, restClient, sharedCache, graphqlClient });
      return { graphqlClient, restClient, sharedCache };
    } catch (e) {
      throw new Error(
        `Error: Problem in registering client: ${e} - Try using ClientManager.getInstance() first to create instance initially."
      );`
      );
    }
  }
  public createClient({
    cacheConfig,
    graphqlConfig,
    restConfig,
    domain,
  }: ClientConfig) {
    const existingClient = this.isRegisteredClient(domain);
    if (!existingClient) {
      return this.registerClient({
        domain,
        restConfig,
        graphqlConfig,
        cacheConfig,
      });
    }
    return existingClient;
  }
  private isRegisteredClient(domain: string) {
    const isRegistered =
      this.domains.length &&
      this.domains.find((data: Client) => data?.domain === domain);
    return isRegistered;
  }
  public getClient(domain: string) {
    const existingClient = this.isRegisteredClient(domain);
    if (existingClient) return existingClient;
    else
      throw new Error(
        "Error: There is no client for this domain: Use ClientManager.getInstance() to create instance first."
      );
  }
}
