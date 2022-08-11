import { ClientManager } from "../clientManger";
import { ClientDetails } from "../types";

const manager = ClientManager.getInstance();

export const getClient = (domain: string):ClientDetails => manager.getDomainClient(domain);
