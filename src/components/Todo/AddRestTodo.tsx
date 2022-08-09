import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRestMutation } from "../../client/hooks/query";
import {
  ADD_TODO,
  ADD_TODO_REST,
  GET_GRAPHQL_TODOS,
  GET_REST_TODOS,
} from "../../queries";
import { domain } from "../../configs/domain1";
import { modifyCache, writeFragment } from "../../client/helpers/cache";
export const AddRestTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // refetchQuery()
  const [addTodo] = useRestMutation(ADD_TODO_REST, {
    domain,
    onSuccess: () => {
      modifyCache({
        domain,
        fields: {
          getTodos(existingTodos = []) {
            const newTodoRef = writeFragment({
              domain,
              data: {},
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
      <p>Add Todo Rest</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({
            variables: {
              input: {
                title,
                description,
                completed: false,
                user: "62e268d648eec0eced01e163",
              },
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
        <button type="submit">Add Todo Data by Rest </button>
      </form>
    </div>
  );
};
