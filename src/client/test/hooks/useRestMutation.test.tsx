import React from "react";
import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook, act } from "@testing-library/react-hooks";
import { useRestMutation } from "../../hooks/query";
import { Client } from "../..";
import { DocumentNode, gql } from "@apollo/client";
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
describe("useRestMutation custom hook", () => {
  const ADD_TODO_REST = gql`
    mutation CreateTodo {
      createTodo(input: $input)
        @rest(type: "Todo", path: "/todos", method: "POST", bodyKey: "input") {
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
      query: ADD_TODO_REST,
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
      () => useRestMutation(query, { domain: "Page 1" }),
      {
        wrapper,
      }
    );
    const fetch: any = result.current;

    act(() => {
      fetch[0]({
        variables: {
          input: {
            title: "test",
            description: "test",
            completed: false,
            user: "62e268d648eec0eced01e163",
          },
        },
      });
    });
    return { result, waitForNextUpdate };
  }
  it("useRestLazyQuery should return an array of todos", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      [todosQueryMock] as MockedResponse[],
      ADD_TODO_REST
    );

    await waitForNextUpdate();
    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    expect(result.current[1].error).toBeUndefined();
    expect(result.current[1].data.createTodo).toBeDefined();
  });
});
