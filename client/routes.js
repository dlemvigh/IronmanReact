import React from "react";
import { Switch, Route } from "react-router-dom";
import { withApollo } from "./apolloClient";
// import { Router, Route, IndexRoute } from "react-router";
// import ReactGA from "react-ga";

// import App from "./Components/App/App";
// import AppQueries from "./Components/App/AppQueries";
// import Activity from "./Components/Activity/Activity";
// import ActivityQueries from "./Components/Activity/ActivityQueries";
// import Admin from "./Components/Admin/Admin";
// import AdminQueries from "./Components/Admin/AdminQueries";
// import Graphs from "./Componen ts/Graphs";
// import GraphsQueries from "./Components/Graphs/GraphsQueries";
// import Leaderboard from "./Components/Leaderboard/Leaderboard";
import LeaderboardQueries from "./Components/Leaderboard/LeaderboardQueries";
// import PersonalGoalsForm from "./Components/PersonalGoals/PersonalGoalsForm";
// import PersonalGoalsFormQueries from "./Components/PersonalGoals/PersonalGoalsFormQueries";
// import Season from "./Components/Season/Season";
// import SeasonQueries from "./Components/Season/SeasonQueries";
// import Sandbox from "./Components/Sandbox/Sandbox";
// import SandboxQueries from "./Components/Sandbox/SandboxQueries";

import Loading from "./Components/Common/Loading";

// ReactGA.initialize("UA-98797876-1");

// function logPageView() {
//   ReactGA.set({ page: window.location.pathname + window.location.search });
//   ReactGA.pageview(window.location.pathname + window.location.search);
// }

export default () => (
  <Switch>
    <Route path="/" component={LeaderboardQueries} />
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
