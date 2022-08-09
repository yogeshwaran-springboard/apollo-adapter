import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useGraphqlQuery } from "../../client/hooks/query";
import { GET_TODO_ID } from "../../queries";
import { domain } from "../../configs/domain1";
import { readCache, writeCache } from "../../client/helpers/cache";
export const DisplayGraphqlTodo = () => {
  const [graphqlId, setGraphqlId] = useState("62e8ef7ae876dd7f8a63827e");

  const { data: todoData } = useGraphqlQuery(GET_TODO_ID, {
    domain,
    variables: { id: graphqlId },
    onSuccess: () => {
      const res = readCache({ query: GET_TODO_ID,domain });
      console.log("res", res);
      writeCache({
        query: GET_TODO_ID,
        domain,
        data: {
          getTodo: {
            title: "ee",
            description: "aa",
            id: "62e8ef7ae876dd7f8a63827e",
            completed: false,
            isLoggedIn: true,
            user: { name: "aa", age: "aaa", id: "62e268d648eec0eced01e163" },
          },
        },
      });
    },
  });
  const GraphqlTodoDetails = () => {
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

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <p>Todo Detail Graphql</p>
      <input
        value={graphqlId}
        placeholder="Todo Id for Graphql"
        onChange={(e) => setGraphqlId(e.target.value)}
      />
      {/* <button onClick={() => getTodoGraphqlData()}>
        Get Todo Data By Id Graphql
      </button> */}

      <GraphqlTodoDetails />
    </div>
  );
};
