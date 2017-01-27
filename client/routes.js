import React from "react";
import { Router, Route, IndexRoute } from "react-router";

import App from "./Components/App/App";
import AppQueries from "./Components/App/AppQueries";
import Activity from "./Components/Activity/Activity";
import ActivityQueries from "./Components/Activity/ActivityQueries";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import LeaderboardQueries from "./Components/Leaderboard/LeaderboardQueries";
import Sandbox from "./Components/Sandbox/Sandbox";
import SandboxQueries from "./Components/Sandbox/SandboxQueries";

import Loading from "./Components/Common/Loading";

const Routes = (props) => ( 
  <Router {...props}>
    <Route path="/" component={App} queries={AppQueries}>
      <IndexRoute  
        component={Leaderboard}
        queries={LeaderboardQueries}
        render={({props}) => props ? <Leaderboard {...props} /> : <Loading show={true} />} 
      />
      <Route
        path="/sandbox"
        component={Sandbox}
        queries={SandboxQueries}
        render={({props}) => props ? <Sandbox {...props} /> : <Loading show={true} />}
      />
      <Route 
        path="/user/:id" 
        component={Activity} 
        queries={ActivityQueries.byId}
        render={({props}) => props ? <Activity {...props} /> : <Loading show={true} />} 
      />  
      <Route 
        path="/:username" 
        component={Activity} 
        queries={ActivityQueries.byUsername}
        render={({props}) => props ? <Activity {...props} /> : <Loading show={true} />} 
      />  
    </Route>
  </Router>
);

export default Routes;