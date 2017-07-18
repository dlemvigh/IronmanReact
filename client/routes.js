import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import ReactGA from "react-ga";

import App from "./Components/App/App";
import AppQueries from "./Components/App/AppQueries";
import Activity from "./Components/Activity/Activity";
import ActivityQueries from "./Components/Activity/ActivityQueries";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import LeaderboardQueries from "./Components/Leaderboard/LeaderboardQueries";
import Sandbox from "./Components/Sandbox/Sandbox";
import SandboxQueries from "./Components/Sandbox/SandboxQueries";
import Graphs from "./Components/Graphs";
import GraphsQueries from "./Components/Graphs/GraphsQueries";
import Season from "./Components/Season/Season";
import SeasonQueries from "./Components/Season/SeasonQueries";

import Loading from "./Components/Common/Loading";

ReactGA.initialize("UA-98797876-1");

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const Routes = (props) => ( 
  <Router {...props} onUpdate={logPageView}>
    <Route 
      path="/" 
      component={App} 
      queries={AppQueries}
      render={({props}) => props ? <App {...props} /> : <Loading show={true} />} 
    >
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
        path="/graphs"
        component={Graphs}
        queries={GraphsQueries}
        render={({props}) => props ? <Graphs {...props} /> : <Loading show={true} />}
      />
      <Route 
        path="/user/:id" 
        component={Activity} 
        queries={ActivityQueries.byId}
        render={({props}) => props ? <Activity {...props} /> : <Loading show={true} />} 
      />  
      <Route
        path="/season(/:id)"
        component={Season}
        queries={SeasonQueries}
        prepareParams={
          (prev) => ({
            ...prev,
            id: prev.id || null
          })
        }
        render={({props}) => props ? <Season {...props} /> : <Loading show={true} />}
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