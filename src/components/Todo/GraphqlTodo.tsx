import { useState } from "react";

import { DELETE_REST, GET_REST_TODOS, UPDATE_TODO_REST } from "../../queries";
import { useRestMutation } from "../../client/hooks/query";
import {
  evictCache,
  identifyCache,
  readCache,
  writeCache,
} from "../../client/helpers/cache";
import { domain } from "../../configs/domain1";

export const GraphqlTodo = ({ data }: any) => {
  const [editable, setEditable] = useState(null as any);
  const [selectedTodo, setSelectedTodo] = useState({} as any);
  const [toDeleteId, setToDeleteId] = useState(null as any);
  // edit
  const [updateTodo] = useRestMutation(UPDATE_TODO_REST, {
    domain,
    onSuccess: () => {
      // read data from cache
      console.log("---Calling Read Cache of Update---");
      const res: any = readCache({ query: GET_REST_TODOS, domain });

      // const toUpdateIndex=updateTodo.findIndex((data)=>data.id===updateTodo.id)
      // update the cache with new data
      writeCache({
        query: GET_REST_TODOS,
        domain,
        data: {
          getTodos: [...res?.getTodos],
        },
      });
      setEditable(null);
    },
  });

  const editGraphql = (id: string) => {
    const toUpdate = data?.getTodos.find((data: any) => data.id === id);
    setSelectedTodo(toUpdate);
    setEditable(id);
  };

  // delete
  const [deleteTodo] = useRestMutation(DELETE_REST, {
    domain,
    onSuccess: () => {
      console.log("---Delete Cache---");
      evictCache({
        domain,
        id: identifyCache({
          domain,
          __typename: "Todo",
          id: toDeleteId,
        }),
      });
    },
  });
  const deleteTodoById = async (id: string) => {
    console.log("DLE called", id);
    await setToDeleteId(id);
    deleteTodo({
      variables: {
        id,
      },
    });
  };

  return data?.getTodos?.map(
    ({ id, title, completed, description, user }: any) =>
      editable !== id ? (
        <div key={id}>
          <p>
            <b>Id: </b>
            {id}
          </p>
          <p>
            <b>Title: </b>
            {title}
          </p>
          <p>
            Completed
            <input type="checkbox" checked={completed} disabled />
          </p>
          <p>
            <b>Description: </b>
            {description}
          </p>
          <p>
            <b>Created By : </b>
            {user.id}
          </p>
          <br />
          <button onClick={() => editGraphql(id)}>Edit</button>
          <button onClick={() => deleteTodoById(id)}>Delete Todo</button>
        </div>
      ) : (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("SLE", selectedTodo);
              // updateTodo({
              //   variables: {
              //     id: selectedTodo.id,
              //     completed: selectedTodo.completed,
              //     title: selectedTodo.title,
              //     description: selectedTodo.description,
              //     user: selectedTodo.user?.id,
              //   },
              // });
              updateTodo({
                variables: {
                  input: {
                    id: selectedTodo.id,
                    completed: selectedTodo.completed,
                    title: selectedTodo.title,
                    description: selectedTodo.description,
                    user: selectedTodo.user?.id,
                  },
                  id: selectedTodo.id,
                },
              });
              setSelectedTodo({});
            }}
          >
            <input
              value={selectedTodo.title}
              onChange={(e) =>
                setSelectedTodo({ ...selectedTodo, title: e.target.value })
              }
            />
            <input
              value={selectedTodo.description}
              onChange={(e) =>
                setSelectedTodo({
                  ...selectedTodo,
                  description: e.target.value,
                })
              }
            />
            <input
              type="checkbox"
              value={selectedTodo?.completed}
              onChange={(e) =>
                setSelectedTodo({
                  ...selectedTodo,
                  completed: e.target.checked,
                })
              }
            />
            <button type="submit">Update Todo</button>
          </form>
          <button onClick={() => deleteTodoById(id)}>Delete Todo</button>
        </div>
      )
  );
};
