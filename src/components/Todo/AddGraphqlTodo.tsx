import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  refetchGraphqlQuery,
  useGraphqlMutation,
} from "../../client/hooks/query";
import {
  modifyCache,
  readCache,
  writeCache,
  writeFragment,
} from "../../client/helpers/cache";
import { ADD_TODO, GET_GRAPHQL_TODOS } from "../../queries";
import { domain } from "../../configs/domain1";

export const AddGraphqlTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //add
  const [addTodo] = useGraphqlMutation(ADD_TODO, {
    domain,
    onSuccess: () => {
      console.log("Yes done");
      // refetchGraphqlQuery([GET_GRAPHQL_TODOS], { domain });
      modifyCache({
        domain: "Page 1",
        fields: {
          getTodos(existingTodos = []) {
            console.log("INside get todo");
            const newTodoRef = writeFragment({
              domain: "Page 1",
              data: {
                __typename: "Todo",
                id: "62f0baaaadf437654f04e721",
                description: "test",
                title: "test",
                completed: false,
                user: {
                  id: "62e268d648eec0eced01e163",
                  name: "hey",
                  age: "22",
                  __typename: "User",
                },
              },
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  description
                  title
                  completed
                  user {
                    id
                    name
                    age
                  }
                }
              `,
            });
            return [...existingTodos, newTodoRef];
          },
        },
      });
    },
  });

  return (
    <div>
      <p>Add Todo Graphql</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({
            variables: {
              title,
              description,
              completed: false,
              user: "62e268d648eec0eced01e163",
            },
          });
          setDescription("");
          setTitle("");
        }}
      >
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo by Graphql</button>
      </form>
    </div>
  );
};
