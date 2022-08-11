import { gql } from "@apollo/client";

const GET_REST_TODOS = gql`
  query getTodos {
    getTodos @rest(type: "Todo", path: "/todos") {
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

const GET_GRAPHQL_TODOS = gql`
  query getTodos {
    getTodos {
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
    reactiveVar1 @client
  }
`;
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
const ADD_USER_REST = gql`
  mutation CreateUser {
    createUser(input: $input)
      @rest(type: "User", path: "/users", method: "POST", bodyKey: "input") {
      name
      age
    }
  }
`;
const ADD_USER = gql`
  mutation CreateUser($name: String!, $age: String!) {
    createUser(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;
const GET_USER_GRAPHQL = gql`
  query GetUsers {
    getUsers {
      name
      age
      id
    }
  }
`;
const GET_USER_REST = gql`
  query GetUsers {
    getUsers @rest(type: "User", path: "/users") {
      name
      age
      id
    }
  }
`;
const GET_TODO_ID = gql`
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      title
      id
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
const GET_USER_ID_REST = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) @rest(type: "User", path: "/users/{args.id}") {
      id
      name
      age
    }
  }
`;
const GET_TODO_ID_REST = gql`
  query GetTodo($id: ID!) {
    getTodo(id: $id) @rest(type: "Todo", path: "/todos/{args.id}") {
      title
      id
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

const GET_USER_ID = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      age
    }
  }
`;

const DELETE_REST = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
      @rest(type: "Todo", path: "/todos/{args.id}", method: "DELETE") {
      NoResponse
    }
  }
`;

const DELETE_GRAPHQL = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
      title
      completed
      description
    }
  }
`;

const UPDATE_TODO = gql`
  mutation updateTodo(
    $id: String
    $title: String
    $description: String
    $completed: Boolean
    $user: String!
  ) {
    updateTodo(
      id: $id
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

const UPDATE_TODO_REST = gql`
  mutation updateTodo($id: String!) {
    updateTodo(input: $input, id: $id)
      @rest(
        type: "Todo"
        path: "/todos/{args.id}"
        method: "PUT"
        bodyKey: "input"
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

export {
  GET_GRAPHQL_TODOS,
  GET_REST_TODOS,
  GET_TODO_ID_REST,
  GET_TODO_ID,
  GET_USER_ID,
  GET_USER_ID_REST,
  UPDATE_TODO,
  ADD_TODO,
  ADD_TODO_REST,
  ADD_USER_REST,
  ADD_USER,
  GET_USER_GRAPHQL,
  GET_USER_REST,
  DELETE_GRAPHQL,
  DELETE_REST,
  UPDATE_TODO_REST,
};
