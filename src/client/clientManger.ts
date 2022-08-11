import { Client } from "./client";
import { ClientDetails, ClientConfig, DomainConfig } from "./types";

export class ClientManager {
  private static manager: ClientManager;
  private domains: ClientDetails[];

  private constructor() {
    this.domains = [];
    if (ClientManager.manager) {
      throw new Error(
        "Error: Problem in instance creation: Use ClientManager.getInstance() to create instance initially."
      );
    }
    ClientManager.manager = this;
  }

  public static getInstance(): ClientManager {
    if (!ClientManager.manager) {
      ClientManager.manager = new ClientManager();
    }

    return ClientManager.manager;
  }

  public getDomainClient(domain: string) {
    const isRegistered =
      this.domains.length &&
      this.domains.find((data: ClientDetails) => data?.domain === domain);
    return isRegistered as ClientDetails;
  }

  public addDomainClient({
    graphqlClient,
    restClient,
    sharedCache,
    domain,
  }: ClientDetails) {
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
}
