import BrowserProtocol from 'farce/lib/BrowserProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';
import React from 'react';
import ReactDOM from 'react-dom';
import { Environment, RecordSource, Store } from 'relay-runtime';

import routes from './routes';
import network from './network';

const environment = new Environment({
  store: new Store(new RecordSource()),
  network
});

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({}),
});

const mountNode = document.getElementById('app');

ReactDOM.render(
  <Router resolver={new Resolver(environment)} />,
  mountNode,
);
