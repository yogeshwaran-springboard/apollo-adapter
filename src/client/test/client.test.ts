import { Client } from "..";
import { domain } from "../../configs/domain1";
const config = {
  rest: {},
  graphql: {},
  cache: {},
};
describe("Client Adapter", () => {
  it("verifies client access without creation should throw err", () => {
    const { get } = Client();

    expect(get(domain)).toThrowError();
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
