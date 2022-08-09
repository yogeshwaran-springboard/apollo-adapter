import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Client } from "./client";
import { config, domain } from "./configs/domain1";
import { config as config2, domain as domain2 } from "./configs/domain2";

import "antd/dist/antd.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const { create: createForDomain1 } = Client();
createForDomain1({
  config,
  domain,
});
const { create: createForDomain2 } = Client();
createForDomain2({
  config: config2,
  domain: domain2,
});
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
