import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook, act } from "@testing-library/react-hooks";
import { refetchGraphqlQuery, useGraphqlMutation } from "../../hooks/query";
import { Client } from "../..";
import { DocumentNode, gql } from "@apollo/client";
import { GET_GRAPHQL_TODOS } from "../../../queries";
import { MockWrapper, OptionsType } from "../../types";
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
describe("useGraphqlMutation custom hook", () => {
  const ADD_TODO = gql`
    mutation CreateTodo(
      $title: String!
      $description: String!
      $completed: Boolean!
      $user: String!
    ) {
      createTodo(
        title: $title
        description: $description
        completed: $completed
        user: $user
      ) {
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

  const ADD_TODO_ERROR = gql`
    mutation CreateTodo(
      $title: String!
      $description: String!
      $completed: Boolean!
      $user: String!
    ) {
      createTodo(
        title: $title
        description: $description
        completed: $completed
        user: $user
      ) {
        test
      }
    }
  `;
  const todosQueryMock = {
    request: {
      query: ADD_TODO,
    },
    result: {
      data: {
        getTodos: {},
      },
    },
  };

  function getHookWrapper(mocks:MockedResponse[] = [], query: DocumentNode) {
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
      () =>
        useGraphqlMutation(query, {
          domain: "Page 1",
          onSuccess: () => {
            // refetchGraphqlQuery([GET_GRAPHQL_TODOS], { domain: "Page 1" });
          },
        }),
      {
        wrapper,
      }
    );
    const fetch: any = result.current;

    act(() => {
      fetch[0]({
        variables: {
          title: "test",
          description: "test",
          completed: false,
          user: "62e268d648eec0eced01e163",
        },
      });
    });
    return { result, waitForNextUpdate };
  }
  it("useGraphqlMutation should return an array of todos", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      [todosQueryMock] as MockedResponse[],
      ADD_TODO
    );

    await waitForNextUpdate();
    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    expect(result.current[1].error).toBeUndefined();
    expect(result.current[1].data.createTodo).toBeDefined();
  });
});
