import React from "react";
// import { Router, Route, IndexRoute } from "react-router";
import { createBrowserRouter, HttpError, makeRouteConfig, Redirect, Route } from "found";
import ReactGA from "react-ga";

import App from "./Components/App/App";
import AppQueries from "./Components/App/AppQueries";
import Activity from "./Components/Activity/Activity";
import ActivityQueries from "./Components/Activity/ActivityQueries";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import LeaderboardQueries from "./Components/Leaderboard/LeaderboardQueries";
import Sandbox from "./Components/Sandbox/Sandbox";
import SandboxQueries from "./Components/Sandbox/SandboxQueries";
import SandboxComp from "./Components/Sandbox/SandboxComp";
import Graphs from "./Components/Graphs";
import GraphsQueries from "./Components/Graphs/GraphsQueries";

import Loading from "./Components/Common/Loading";

ReactGA.initialize("UA-98797876-1");

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const routes = makeRouteConfig(
  <Route 
    path="/" 
    component={App} 
    queries={AppQueries}
    render={({props}) => props ? <App {...props} /> : <Loading show={true} />} 
  >
    <Route  
      component={Leaderboard}
      queries={LeaderboardQueries}
      render={({props}) => props ? <Leaderboard {...props} /> : <Loading show={true} />} 
    />
    <Route
      path="/sandbox"
      component={SandboxComp}
      /*queries={SandboxQueries}
      render={({props}) => props ? <Sandbox {...props} /> : <Loading show={true} />}*/
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
      path="/:username" 
      component={Activity} 
      queries={ActivityQueries.byUsername}
      render={({props}) => props ? <Activity {...props} /> : <Loading show={true} />} 
    />  
  </Route>
);

export default routes;