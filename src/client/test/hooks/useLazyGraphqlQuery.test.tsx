import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook, act } from "@testing-library/react-hooks";
import { GET_GRAPHQL_TODOS } from "../../../queries";
import { useGraphqlLazyQuery } from "../../hooks/query";

const successMock = [
  {
    request: {
      query: GET_GRAPHQL_TODOS,
    },
    result: {
      data: {
        getTodos: [
          {
            id: "62f34298c82f0f77c5cff786",
            title: "test",
            completed: false,
            description: "test",
            user: {
              id: "62e268d648eec0eced01e163",
              name: "Phill",
              age: "43",
            },
          },
          {
            id: "62f3429cc82f0f77c5cff78c1",
            title: "test",
            completed: false,
            description: "yogesh",
            user: {
              id: "62e268d648eec0eced01e163",
              name: "Phill",
              age: "43",
            },
          },
        ],
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: GET_GRAPHQL_TODOS,
    },
    error: new Error("ERROR"),
  },
];
describe("useGraphqlLazyQuery custom hook", () => {
  function getHookWrapper(mocks:MockedResponse[] = []) {
    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(
      () => useGraphqlLazyQuery(GET_GRAPHQL_TODOS, { domain: "Page 1" }),
      {
        wrapper,
      }
    );
    const fetch: any = result.current;
    act(() => {
      fetch[0]();
    });
    return { result, waitForNextUpdate };
  }
  it("useGraphqlLazyQuery should return an array of todos", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      successMock as MockedResponse[]
    );

    await waitForNextUpdate();
    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    expect(result.current[1].error).toBeUndefined();
    expect(result.current[1].data.getTodos).toBeDefined();
  });

  it("useGraphqlLazyQuery should return error when request fails", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      errorMock as MockedResponse[]
    );
    await waitForNextUpdate();
    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    expect(result.current[1].error).toBeTruthy();
    expect(result.current[1].data).toBeUndefined();
  });
});
