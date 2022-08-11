import { MockedProvider, MockedResponse } from "@apollo/react-testing";
import { renderHook, act } from "@testing-library/react-hooks";
import { useGraphqlMutation } from "../../hooks/query";
import { ADD_TODO, ADD_TODO_REST } from "../../../queries";

const successMock = [
  {
    request: {
      query: ADD_TODO_REST,
      variables: {
        title: "test",
        description: "test",
        completed: false,
        user: "62e268d648eec0eced01e163",
      },
    },

    result: {
      data: {
        createTodo: {
          id:"aaaa",
          title: "test",
          description: "test",
          completed: false,
          user:{
            id:"62e268d648eec0eced01e163",
            name:"test",
            age:"12"
          }
        },
      },
    },
  },
];

const errorMock = [
  {
    request: {
      query: ADD_TODO_REST,
      variables: {
        title: "test",
        description: "test",
        completed: false,
        user: "62e268d648eec0eced01e163",
      },
    },
    error: new Error("ERROR"),
  },
];
describe("useRestMutation custom hook", () => {
  function getHookWrapper(mocks: MockedResponse[] = []) {
    const wrapper = ({ children }: any) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useGraphqlMutation(ADD_TODO_REST, {
          domain: "Page 1",
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
  it("useRestMutation should return an array of todos", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      successMock as MockedResponse[]
    );

    await waitForNextUpdate();
    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    expect(result.current[1].error).toBeUndefined();
    expect(result.current[1].data.createTodo).toBeDefined();
  });
  it("useRestMutation should throw a error", async () => {
    const { result, waitForNextUpdate } = getHookWrapper(
      errorMock as MockedResponse[]
    );

    await waitForNextUpdate();
    // console.log("RRRRR", result.current[1].error);

    expect(typeof result.current[0]).toBe("function");
    expect(result.current[1].loading).toBeFalsy();
    // expect(result.current[1].error).toBeDefined();
    // expect(result.current[1].data).toBeUndefined();
  });
});
