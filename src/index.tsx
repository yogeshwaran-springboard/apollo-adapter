import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { config, domain } from "./configs/domain1";

import "antd/dist/antd.css";
import { create } from "./client/helpers/createClient";
import { ClientManager } from "./client/clientManger";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

create({ config, domain, manager: ClientManager.getInstance() });

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
