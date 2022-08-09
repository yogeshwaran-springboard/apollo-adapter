import { Client } from "../index";
const { get } = Client();
export const getClient = (domain: string) => get(domain);
