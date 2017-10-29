import React from "react";
import Relay from "react-relay/classic";
import { BrowserProtocol, queryMiddleware } from "farce";
import { createFarceRouter, createRender } from "found";
import { Resolver } from 'found-relay/lib/classic';

import routes from "./routes";

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({}),
});

class Test extends React.Component {
  render() {
    return (
      <div>
        <h2>test</h2>
        <hr />
          <a href="/">home</a>--- 
          <a href="/a">page a</a>--- 
          <a href="/b">page b</a>--- 
          <a href="/c">page c</a>  
        <hr />
        <Router resolver={new Resolver(Relay.Store)} />
      </div>
    );
  }
}

export default Test;