import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Todo from "./components/Todo";
import { Tabs } from "antd";
import { DisplayGraphqlTodo } from "./components/Todo/DisplayGraphqlTodo";
import { DisplayRestTodo } from "./components/Todo/DisplayRestTodo";
import { AddRestTodo } from "./components/Todo/AddRestTodo";
import { AddGraphqlTodo } from "./components/Todo/AddGraphqlTodo";
const { TabPane } = Tabs;

function App() {
  const [tab, setTab] = useState("1");

  return (
    <div className="App">
      <Tabs onChange={(key) => setTab(key)} activeKey={tab}>
        <TabPane tab="Todo" key="1">
          <Todo />
        </TabPane>
        <TabPane tab="Get Todo By Id" key="2">
          <DisplayGraphqlTodo />
          <DisplayRestTodo />
        </TabPane>
        <TabPane tab="Add Todo" key="3">
        <AddGraphqlTodo/>
        <AddRestTodo/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
