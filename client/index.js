import React from 'react'
import { render } from 'react-dom'
import Relay from 'react-relay'
import { browserHistory, hashHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay';

import Routes from './routes';

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://localhost:4000/graphql', {
        credentials: 'same-origin'
    })
);

render(
    <Routes 
        history={browserHistory}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}
    />, 
    document.getElementById('app')
);