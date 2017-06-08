import React from "react";
import { render } from "react-dom";
import Relay from 'react-relay/classic';
// import { browserHistory, applyRouterMiddleware } from "react-router";
// import useRelay from "react-router-relay";
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';

import routes from "./routes";

if (process.env.NODE_ENV !== "production") {
  Relay.injectNetworkLayer(
        new Relay.DefaultNetworkLayer("http://localhost:4000/graphql", {
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
  document.getElementById("app")
);