import React from "react";
import { Switch, Route } from "react-router-dom";

import ActivityQueries from "./Components/Activity/ActivityQueries";
import Admin from "./Components/Admin/Admin";
// import Graphs from "./Componen ts/Graphs";
// import GraphsQueries from "./Components/Graphs/GraphsQueries";
import LeaderboardQueries from "./Components/Leaderboard/LeaderboardQueries";
import PersonalGoalsFormQueries from "./Components/PersonalGoals/PersonalGoalsFormQueries";
import SeasonPageQueries from "./Components/Season/SeasonPageQueries";
import SyncQueries from "./Components/Sync/SyncQueries";

export default () => (
  <Switch>
    <Route path="/sync" component={SyncQueries} />
    <Route path="/season/:id?" component={SeasonPageQueries} />
    <Route path="/admin" component={Admin} />
    <Route path="/:username">
      <Switch>
        <Route path="/:username/goals" component={PersonalGoalsFormQueries} />
        <Route component={ActivityQueries} />
      </Switch>
    </Route>
    <Route component={LeaderboardQueries} />
  </Switch>
);

// const Routes = props => (
//   <Router {...props} onUpdate={logPageView}>
//     <Route
//       path="/"
//       component={App}
//       // queries={AppQueries}
//       render={({ props }) => (props ? <App {...props} /> : <Loading show />)}
//     >
//       <IndexRoute
//         component={Leaderboard}
//         queries={LeaderboardQueries}
//         render={({props}) => props ? <Leaderboard {...props} /> : <Loading show />}
//       />
//       <Route
//         path="sandbox"
//         component={Sandbox}
//         queries={SandboxQueries}
//         render={({props}) => props ? <Sandbox {...props} /> : <Loading show />}
//       />
//       <Route
//         path="graphs"
//         component={Graphs}
//         queries={GraphsQueries}
//         render={({props}) => props ? <Graphs {...props} /> : <Loading show />}
//       />
//       <Route
//         path="season(/:id)"
//         component={Season}
//         queries={SeasonQueries}
//         prepareParams={(prev) => ({
//           ...prev,
//           id: prev.id || null
//         })}
//         render={({props}) => props ? <Season {...props} /> : <Loading show />}
//       />
//       <Route
//         path="admin"
//         component={Admin}
//         queries={AdminQueries}
//         render={({props}) => props ? <Admin {...props} /> : <Loading show />}
//       />
//       <Route
//         path=":username"
//       >
//         <IndexRoute
//           component={Activity}
//           queries={ActivityQueries.byUsername}
//           render={({props}) => props ? <Activity {...props} /> : <Loading show />}
//         />
//         <Route
//           path="goals"
//           component={PersonalGoalsForm}
//           queries={PersonalGoalsFormQueries}
//           render={({props}) => props ? <PersonalGoalsForm {...props} /> : <Loading show />}
//         />
//       </Route>
//     </Route>
//   </Router>
// );

// export default Routes;
