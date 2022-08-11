import { domain } from "../../configs/domain1";
import { ClientManager } from "../clientManger";
import { create } from "../helpers/createClient";
const config = {
  restConfig: {},
  graphqlConfig: {},
  cacheConfig: {},
};
describe("Client Adapter", () => {
  it("verifies client access without creation should return 0", () => {
      const manager = ClientManager.getInstance();

      expect(manager.getDomainClient(domain)).toBe(0);
    //
  });
  it("verifies client creation and access", () => {
    create({
      config,
      domain,
      manager: ClientManager.getInstance(),
    });
    const manager = ClientManager.getInstance();

    const { sharedCache, restClient, graphqlClient } =
      manager.getDomainClient(domain);
    expect(sharedCache).toBeDefined();
    expect(restClient).toBeDefined();
    expect(graphqlClient).toBeDefined();
  });
});
