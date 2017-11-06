import React from "react";
import { makeRouteConfig, Route } from "found";

import { auth } from './Auth/Auth';
import App, { AppQuery } from "./Components/App/App";
import Activity, { ActivityQuery } from "./Components/Activity/Activity";
import Admin, { AdminQuery } from "./Components/Admin/Admin";
import Callback from './Components/Auth/Callback';
import Graphs, { GraphsQuery } from "./Components/Graphs";
import Loading from "./Components/Common/Loading";
// import Leaderboard, { LeaderboardQuery } from "./Components/Leaderboard/Leaderboard";
import PersonalGoalsForm, { PersonalGoalsFormQuery } from './Components/PersonalGoals/PersonalGoalsForm';
import Season, { SeasonQuery } from "./Components/Season/Season";
// import Sandbox from "./Components/Sandbox/Sandbox";
// import SandboxQuery from "./Components/Sandbox/SandboxQuery";

const perpareParamsAuth = (params) => {  
  const newParams = {
    ...params, 
    activeUser: auth.getActiveUser(), 
    hasActiveUser: !!auth.getActiveUser(),
    isAuthenticated: auth.isAuthenticated()
  };
  return newParams;
};

export default makeRouteConfig(
  <Route
    path="/"
    Component={App}
    query={AppQuery}
    prepareVariables={perpareParamsAuth}
  >
    {/* <Route
      path="/"
      Component={Leaderboard}
      query={LeaderboardQuery}
      prepareVariables={perpareParamsAuth}      
    /> */}
    <Route 
      path="callback"
      Component={Callback}
    />
    {/* <Route
      path="sandbox"
      Component={Sandbox}
      query={SandboxQuery}
      render={({props}) => props ? <Sandbox {...props} /> : <Loading show />}
    /> */}
    <Route
      path="graphs"
      Component={Graphs}
      query={GraphsQuery}
      render={({props}) => props ? <Graphs {...props} /> : <Loading show />}
    />
    <Route
      path="season/:id?"
      Component={Season}
      query={SeasonQuery}
      prepareVariables={(prev) => ({
        ...prev,
        id: prev.id || null
      })}
      render={({props}) => props ? <Season {...props} /> : <Loading show />}
    />
    <Route
      path="admin"
      Component={Admin}
      query={AdminQuery}
      render={({props}) => props ? <Admin {...props} /> : <Loading show />}
    />
    <Route
      path=":username"
    >
      <Route
        Component={Activity} 
        query={ActivityQuery}
        render={({props}) => props ? <Activity {...props} /> : <Loading show />} 
      />
      <Route
        path="goals"
        Component={PersonalGoalsForm}
        query={PersonalGoalsFormQuery}
        render={({props}) => props ? <PersonalGoalsForm {...props} /> : <Loading show />}
      />
    </Route>
  </Route>
);