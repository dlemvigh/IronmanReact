import React from 'react'
import Relay from 'react-relay'
import { Router, Route, IndexRedirect, browserHistory, hashHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay';

import Main from '../Main/Main'
import MainQueries from '../Main/MainQueries'
import Activity from '../Activity/Activity'
import ActivityQueries from '../Activity/ActivityQueries'
import Leaderboard from '../Leaderboard/Leaderboard'
import LeaderboardQueries from '../Leaderboard/LeaderboardQueries'
import Sandbox from '../Sandbox/Sandbox'
import Timelog from '../Timelog/Timelog'

export default class App extends React.Component {
  render(){
    return (
      <Router 
        history={hashHistory}
        render={applyRouterMiddleware(useRelay)}
        environment={Relay.Store}
      >
        <Route path='/' component={Main} queries={MainQueries}>
          <IndexRedirect to="/leaderboard" />
          <Route 
            path='/activity/:userId' 
            component={Activity} 
            queries={ActivityQueries}
            render={({props}) => props && <Activity {...props} />} />  
          <Route 
            path='/leaderboard' 
            component={Leaderboard}
            queries={LeaderboardQueries}
            render={({props}) => props && <Leaderboard {...props} /> } />
          <Route path='/sandbox' component={Sandbox} />
          <Route path='/timelog' component={Timelog} />
        </Route>
      </Router>
    );    
  }
}
