import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook } from "@testing-library/react-hooks";
import { useGraphqlQuery } from "../../hooks/query";
import { DocumentNode, gql } from "@apollo/client";
import { MockWrapper } from "../../types";
import { create } from "../../helpers/createClient";
import { ClientManager } from "../../clientManger";
const config = {
  restConfig: {},
  graphqlConfig: {},
  cacheConfig: {},
};
describe("useGraphqlQuery custom hook", () => {
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
    create({
      config,
      domain:"Page 1",
      manager: ClientManager.getInstance(),
    });
    const wrapper = ({ children }: MockWrapper) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(
      () => useGraphqlQuery(query, { domain: "Page 1" }),
      {
        wrapper,
      }
    );
    return { result, waitForNextUpdate };
  }
  it("useGraphqlQuery should return an array of todos", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      [todosQueryMock] as MockedResponse[],
      GET_GRAPHQL_TODOS
    );

    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data.getTodos).toBeDefined();
  });

  it("useGraphqlQuery should return error when request fails", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      [todosQueryErrorMock] as MockedResponse[],
      GET_GRAPHQL_TODOS_ERROR
    );
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
  });
});
