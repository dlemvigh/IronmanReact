import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'

import App from './Components/App/App'
import AppQueries from './Components/App/AppQueries'
import Activity from './Components/Activity/Activity'
import ActivityQueries from './Components/Activity/ActivityQueries'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import LeaderboardQueries from './Components/Leaderboard/LeaderboardQueries'

const Routes = (props) => ( 
  <Router {...props}>
    <Route path='/' component={App} queries={AppQueries}>
      <IndexRoute  
        component={Leaderboard}
        queries={LeaderboardQueries}
        render={({props}) => props && <Leaderboard {...props} /> } />
      <Route 
        path='/:username' 
        component={Activity} 
        queries={ActivityQueries}
        render={({props}) => props && <Activity {...props} />} />  
    </Route>
  </Router>
);

export default Routes;