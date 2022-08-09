import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook } from "@testing-library/react-hooks";
import { useRestQuery } from "../../hooks/query";
import { Client } from "../..";
import { DocumentNode, gql } from "@apollo/client";
import { MockWrapper } from "../../types";
const config = {
  rest: {
    typePatcher: {
      Todo: (data: any) => {
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
describe("useRestQuery custom hook", () => {
  const GET_REST_TODOS = gql`
    query getTodos {
      getTodos @rest(type: "Todo", path: "/todos") {
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

  const GET_REST_TODOS_ERROR = gql`
    query getTodos {
      getTodos @rest(type: "Todo", path: "/todos") {
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

  const todosQueryMock = {
    request: {
      query: GET_REST_TODOS,
    },
    result: {
      data: {
        getTodos: {},
      },
    },
  };

  const todosQueryErrorMock = {
    request: {
      query: GET_REST_TODOS_ERROR,
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
      () => useRestQuery(query, { domain: "Page 1" }),
      {
        wrapper,
      }
    );
    return { result, waitForNextUpdate };
  }

  it("useRestQuery should return an array of todos", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      [todosQueryMock] as MockedResponse[],
      GET_REST_TODOS
    );

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data.getTodos).toBeDefined();
  });
});
