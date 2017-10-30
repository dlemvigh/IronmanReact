import React from "react";
import { render } from "react-dom";
import Relay from 'react-relay/classic';
// import Test from "./Components/Test";
import { BrowserProtocol, queryMiddleware } from "farce";
import { createFarceRouter, createRender } from "found";
import { Resolver } from 'found-relay/lib/classic';
import routes from "./routes";
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

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({}),
});

render(
  <Router resolver={new Resolver(Relay.Store)} />,
  // <Routes 
  //   history={history}
  //   render={applyRouterMiddleware(useRelay)}
  //   environment={Relay.Store}
  // />, 
  document.getElementById("app")
);