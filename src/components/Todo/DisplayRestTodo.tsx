import { useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRestLazyQuery } from "../../client/hooks/query";
import { GET_TODO_ID_REST, GET_USER_ID_REST } from "../../queries";
import { domain } from "../../configs/domain1";

export const DisplayRestTodo = () => {
  const [restId, setRestId] = useState("");

  const [getTodoRestData, { data: todoData }] = useRestLazyQuery(
    GET_TODO_ID_REST,
    {
      domain,
      variables: { id: restId },
    }
  );
  const RestTodoDetails = () => {
    return (
      <div>
        <p>
          <b>Id: </b>
          {todoData?.getTodo?.id}
        </p>
        <p>
          <b>Title: </b>
          {todoData?.getTodo?.title}
        </p>
        <p>
          <b>Description: </b>
          {todoData?.getTodo?.description}
        </p>
        <br />
      </div>
    );
  };
  console.log("REST da", todoData);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>Todo Detail Rest</p>

      <input
        value={restId}
        placeholder="Todo Id for Rest"
        onChange={(e) => setRestId(e.target.value)}
      />
      <button onClick={() => getTodoRestData()}>
        Get Todo Data By Id Rest
      </button>

      <RestTodoDetails />
    </div>
  );
};
