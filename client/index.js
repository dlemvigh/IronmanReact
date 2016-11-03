import React from 'react'
import Relay from 'react-relay'
import { render } from 'react-dom'
import App from './Components/App/App'

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer('http://localhost:4000/graphql', {
        credentials: 'same-origin'
    })
);

render(<App/>, document.getElementById('app'))