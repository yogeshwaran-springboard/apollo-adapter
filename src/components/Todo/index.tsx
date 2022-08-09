import { useGraphqlQuery, useRestQuery } from "../../client/hooks/query";
import { GET_GRAPHQL_TODOS, GET_REST_TODOS } from "../../queries";
import { GraphqlTodo } from "./GraphqlTodo";
import { RestTodo } from "./RestTodo";
import { domain } from "../../configs/domain1";

function Todo() {
  //   const { data: restData } = callRestQuery(GET_REST_TODOS);
  const { data } = useGraphqlQuery(GET_GRAPHQL_TODOS, {
    domain,
  });
  const { data: restDataOfDomain2 } = useRestQuery(GET_REST_TODOS, { domain });
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{ backgroundColor: "#A6D1E6", width: "350px", padding: "10px" }}
      >
        <p>Rest Todo</p>
        <RestTodo data={restDataOfDomain2} />
      </div>
      <div
        style={{ backgroundColor: "#FEFBF6", width: "350px", padding: "10px" }}
      >
        <p>Graphql Todo</p>
        <GraphqlTodo data={data} />
      </div>
    </div>
  );
}
export default Todo;
