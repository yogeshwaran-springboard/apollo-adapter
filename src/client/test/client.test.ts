import { Client } from "..";
import { domain } from "../../configs/domain1";
const config = {
  rest: {},
  graphql: {},
  cache: {},
};
describe("Client Adapter", () => {
  it("verifies client access without creation should throw err", () => {
    try {
      const { get } = Client();
      expect(get(domain)).toThrowError();
      fail();
    } catch (e:any) {
      expect(e.message).toBe(
        "Error: There is no client for this domain: Use ClientManager.getInstance() to create instance first."
      );
    }
  });
  it("verifies client creation and access", () => {
    const { create, get } = Client();
    create({
      config,
      domain: "Page 1",
    });
    const { sharedCache, restClient, graphqlClient } = get(domain);
    expect(sharedCache).toBeDefined();
    expect(restClient).toBeDefined();
    expect(graphqlClient).toBeDefined();
  });
});
