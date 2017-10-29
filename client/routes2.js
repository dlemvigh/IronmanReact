import React from "react";
import { makeRouteConfig, Route } from "found";

import { auth } from './Auth/Auth';
import App from "./Components/App/App";
import AppQueries from "./Components/App/AppQueries";
import Activity from "./Components/Activity/Activity";
import ActivityQueries from "./Components/Activity/ActivityQueries";
import Admin from "./Components/Admin/Admin";
import AdminQueries from "./Components/Admin/AdminQueries";
import Callback from './Components/Auth/Callback';
import Graphs from "./Components/Graphs";
import GraphsQueries from "./Components/Graphs/GraphsQueries";
import Loading from "./Components/Common/Loading";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import LeaderboardQueries from "./Components/Leaderboard/LeaderboardQueries";
import PersonalGoalsForm from './Components/PersonalGoals/PersonalGoalsForm';
import PersonalGoalsFormQueries from './Components/PersonalGoals/PersonalGoalsFormQueries';
import Season from "./Components/Season/Season";
import SeasonQueries from "./Components/Season/SeasonQueries";
import Sandbox from "./Components/Sandbox/Sandbox";
import SandboxQueries from "./Components/Sandbox/SandboxQueries";

const perpareParamsAuth = (params) => ({
  ...params, 
  activeUser: auth.getActiveUser(), 
  hasActiveUser: !!auth.getActiveUser(),
  isAuthenticated: auth.isAuthenticated()
});

export default makeRouteConfig(
  <Route
    Component={App}
    queries={AppQueries}
    prepareParams={perpareParamsAuth}
  >
    <Route
      path="/"
      Component={Leaderboard}
      queries={LeaderboardQueries}
      prepareParams={perpareParamsAuth}      
    />
    <Route 
      path="callback"
      Component={Callback}
    />
    <Route
      path="graphs"
      Component={Graphs}
      queries={GraphsQueries}
      render={({props}) => props ? <Graphs {...props} /> : <Loading show />}
    />
    <Route
      path="season/:id?"
      Component={Season}
      queries={SeasonQueries}
      prepareParams={(prev) => ({
        ...prev,
        id: prev.id || null
      })}
      render={({props}) => props ? <Season {...props} /> : <Loading show />}
    />
  </Route>
);