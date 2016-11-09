import React from 'react'
import Relay from 'react-relay'
import { Router, Route, IndexRedirect, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay';

import Main from '../Main/Main'
import Activity from '../Activity/Activity'
import ActivityQueries from '../Activity/ActivityQueries'
import Leaderboard from '../Leaderboard/Leaderboard'
import Sandbox from '../Sandbox/Sandbox'
import Timelog from '../Timelog/Timelog'

export default class App extends React.Component {
  render(){
    return (
      <Router 
        history={browserHistory}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}
      >
        <Route path='/' component={Main}>
          <IndexRedirect to="/leaderboard" />
          <Route 
            path='/activity' 
            component={Activity} 
            queries={ActivityQueries}
            render={({props}) => {
              return props ? <Activity {...props} /> : <span>loading</span>}
            }  
            />
          <Route path='/leaderboard' component={Leaderboard} />
          <Route path='/sandbox' component={Sandbox} />
          <Route path='/timelog' component={Timelog} />
        </Route>
      </Router>
    );    
  }
}
