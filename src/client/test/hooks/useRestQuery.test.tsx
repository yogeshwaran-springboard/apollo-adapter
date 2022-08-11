import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook } from "@testing-library/react-hooks";
import { useGraphqlQuery } from "../../hooks/query";
import { MockWrapper } from "../../types";
import { GET_GRAPHQL_TODOS, GET_REST_TODOS } from "../../../queries";

const successMock = [
  {
    request: {
      query: GET_REST_TODOS,
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
      query: GET_REST_TODOS,
    },
    error: new Error("ERROR"),
  },
];

describe("useRestQuery custom hook", () => {
  function getHookWrapper(mocks: MockedResponse[] = []) {
    const wrapper = ({ children }: MockWrapper) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(
      () => useGraphqlQuery(GET_REST_TODOS, { domain: "Page 1" }),
      {
        wrapper,
      }
    );
    return { result, waitForNextUpdate };
  }
  it("useRestQuery should return an array of todos", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(successMock);

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    console.log(result.current.data.getTodos);
    expect(result.current.data.getTodos).toBeDefined();
  });

  it("useRestQuery should return error when request fails", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      errorMock as MockedResponse[]
    );
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});
