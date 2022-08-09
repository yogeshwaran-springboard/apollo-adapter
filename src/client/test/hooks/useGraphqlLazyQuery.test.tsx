import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook, act } from "@testing-library/react-hooks";
import { useGraphqlLazyQuery } from "../../hooks/query";
import { Client } from "../..";
import { DocumentNode, gql } from "@apollo/client";
import { MockResult, MockWrapper, OptionsType } from "../../types";

const config = {
  rest: {
    typePatcher: {
      Todo: (data: OptionsType) => {
        if (data.user != null) {
          data.user = { __typename: "User", ...data.user };
        }
        return data;
      },
    },
  },
  graphql: {},
  cache: {},
};
describe("useGraphqlLazyQuery custom hook", () => {
  const GET_GRAPHQL_TODOS = gql`
    query getTodos {
      getTodos {
        id
        title
        completed
        description
        user {
          id
          name
          age
        }
      }
    }
  `;

  const GET_GRAPHQL_TODOS_ERROR = gql`
    query getTodos {
      getTodos {
        qq
      }
    }
  `;
  const todosQueryMock = {
    request: {
      query: GET_GRAPHQL_TODOS,
    },
    result: {
      data: {
        getTodos: {},
      },
    },
  };

  const todosQueryErrorMock = {
    request: {
      query: GET_GRAPHQL_TODOS_ERROR,
    },
    error: new Error("error"),
  };

  function getHookWrapper(mocks: MockedResponse[] = [], query: DocumentNode) {
    const { create: createForDomain1 } = Client();
    createForDomain1({
      config,
      domain: "Page 1",
    });
    const wrapper = ({ children }: MockWrapper) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(
      () => useGraphqlLazyQuery(query, { domain: "Page 1" }),
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
      [todosQueryMock] as MockedResponse[],
      GET_GRAPHQL_TODOS
    );

    await waitForNextUpdate();
    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    expect(result.current[1].error).toBeUndefined();
    expect(result.current[1].data.getTodos).toBeDefined();
  });

  it("useGraphqlLazyQuery should return error when request fails", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      [todosQueryErrorMock] as MockedResponse[],
      GET_GRAPHQL_TODOS_ERROR
    );
    await waitForNextUpdate();
    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    expect(result.current[1].error).toBeUndefined();
    expect(result.current[1].data.getTodos).toBeDefined();
  });
});
