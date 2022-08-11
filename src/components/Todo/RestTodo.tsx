import { useMutation } from "@apollo/client";
import { memo, useEffect, useState } from "react";
import { reactiveVar1 } from "../../configs/domain1";
import {
  DELETE_GRAPHQL,
  DELETE_REST,
  GET_GRAPHQL_TODOS,
  GET_REST_TODOS,
  UPDATE_TODO,
} from "../../queries";

export const RestTodo = memo(({ data }: any) => {
  const [editable, setEditable] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState({});
  const [toDeleteId, setToDeleteId] = useState(null);
  const {  comp2 } = reactiveVar1();
  console.log("REEEEof Rest")

  return data?.getTodos?.map(
    ({ id, title, completed, description, user }: any) => (
      <div key={title}>
            <b>{comp2}</b>
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
        {/* <button onClick={() => editRest(id)}>Edit</button>
        <button onClick={() => deleteTodoById(id)}>Delete Todo</button> */}
      </div>
    )
  );
});
