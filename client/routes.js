import React from 'react';
import { Router, Route, IndexRedirect } from 'react-router'

import App from './Components/App/App'
import AppQueries from './Components/App/AppQueries'
import Activity from './Components/Activity/Activity'
import ActivityQueries from './Components/Activity/ActivityQueries'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import LeaderboardQueries from './Components/Leaderboard/LeaderboardQueries'

const Routes = (props) => ( 
  <Router {...props}>
    <Route path='/' component={App} queries={AppQueries}>
      <IndexRedirect to="/leaderboard" />
      <Route 
        path='/activity/:username' 
        component={Activity} 
        queries={ActivityQueries}
        render={({props}) => props && <Activity {...props} />} />  
      <Route 
        path='/leaderboard' 
        component={Leaderboard}
        queries={LeaderboardQueries}
        render={({props}) => props && <Leaderboard {...props} /> } />
    </Route>
  </Router>
);

export default Routes;