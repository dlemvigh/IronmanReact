import React from "react";
import { Router, Route, IndexRoute } from "react-router";
import ReactGA from "react-ga";

import App from "./Components/App/App";
import AppQueries from "./Components/App/AppQueries";
import Activity from "./Components/Activity/Activity";
import ActivityQueries from "./Components/Activity/ActivityQueries";
import Admin from "./Components/Admin/Admin";
import AdminQueries from "./Components/Admin/AdminQueries";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import LeaderboardQueries from "./Components/Leaderboard/LeaderboardQueries";
import Sandbox from "./Components/Sandbox/Sandbox";
import SandboxQueries from "./Components/Sandbox/SandboxQueries";
import Graphs from "./Components/Graphs";
import GraphsQueries from "./Components/Graphs/GraphsQueries";
import Season from "./Components/Season/Season";
import SeasonQueries from "./Components/Season/SeasonQueries";
import Callback from './Components/Auth/Callback';
import Auth from './Auth/Auth';

import Loading from "./Components/Common/Loading";

ReactGA.initialize("UA-98797876-1");

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const auth = new Auth();

const Routes = (props) => ( 
  <Router {...props} onUpdate={logPageView}>
    <Route 
      path="/" 
      component={App} 
      queries={AppQueries}
      render={({props}) => props ? <App {...props} auth={auth} /> : <Loading show />} 
    >
      <IndexRoute  
        component={Leaderboard}
        queries={LeaderboardQueries}
        prepareParams={(params) => ({...params, activeUser: auth.getActiveUser(), isAuthenticated: auth.isAuthenticated()})}
        render={({props}) => props ? <Leaderboard {...props} auth={auth} /> : <Loading show />} 
      />
      <Route 
        path="/callback"
        component={(props) => <Callback {...props} auth={auth} />}
      />
      <Route
        path="/sandbox"
        component={Sandbox}
        queries={SandboxQueries}
        render={({props}) => props ? <Sandbox {...props} /> : <Loading show />}
      />
      <Route
        path="/graphs"
        component={Graphs}
        queries={GraphsQueries}
        render={({props}) => props ? <Graphs {...props} /> : <Loading show />}
      />
      <Route
        path="/season(/:id)"
        component={Season}
        queries={SeasonQueries}
        prepareParams={(prev) => ({
          ...prev,
          id: prev.id || null
        })}
        render={({props}) => props ? <Season {...props} /> : <Loading show />}
      />
      <Route
        path="/admin"
        component={Admin}
        queries={AdminQueries}
        render={({props}) => props ? <Admin {...props} /> : <Loading show />}
      />
      <Route 
        path="/:username" 
      >
        <IndexRoute
          component={Activity} 
          queries={ActivityQueries.byUsername}
          render={({props}) => props ? <Activity {...props} /> : <Loading show />} 
        />
      </Route>  
    </Route>
  </Router>
);

export default Routes;