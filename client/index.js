import React from "react";
import { render } from "react-dom";
import Relay from "react-relay";
import { applyRouterMiddleware } from "react-router";
import useRelay from "react-router-relay";
import history from "./history";
import Routes from "./routes";

import { getConfig } from "../shared/config";

const config = getConfig();
const endpoint = `http://localhost:${config.port}/graphql`;

if (process.env.NODE_ENV !== "production") {
  Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(endpoint, {
      credentials: "same-origin"
    })
  );
}

render(
  <Routes 
    history={history}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  />, 
  document.getElementById("app")
);