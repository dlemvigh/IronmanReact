import React from "react";
// import Relay from 'react-relay/classic';
import { createRefetchContainer, graphql } from 'react-relay/compat';
import moment from "moment";

import { auth } from '../../Auth/Auth';
import LeaderboardList from "./LeaderboardList";
import Catchup from "../Catchup/Catchup";
import Medals from "../Medals/Medals";
import PersonalGoals from "../PersonalGoals/PersonalGoals";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.refetch(props);
  }

  refetch(props) {
    const vars = {
      week: moment().isoWeek(),
      year: moment().weekYear(),
      currentWeekNo: moment().isoWeek(),
      currentWeekYear: moment().weekYear(),
      lastWeekNo: moment().add(-7, "days").isoWeek(),
      lastWeekYear: moment().add(-7, "days").weekYear()
    };
    props.relay.refetch(vars, null);
  }

  render() {
    const isAuthenticated = auth.isAuthenticated();
    return (
      <div>
        {isAuthenticated && <PersonalGoals auth={auth} user={this.props.activeUser} />}
        <h3>This weeks leaderboard</h3>
        <LeaderboardList summary={this.props.store.current} />
        {this.props.store.current.length >= 2 && <Catchup store={this.props.store} />}
        {this.props.store.last.length > 0 && <h3>Last weeks leaderboard</h3>}
        {this.props.store.last.length > 0 && <LeaderboardList summary={this.props.store.last} />}
        <Medals store={this.props.store} season={this.props.store.currentSeason} />
      </div>
    );
  }
}

// @argumentDefinitions(
//   week: { type: "Int", defaultValue: 44 }
//   year: { type: "Int", defaultValue: 2017 }
// ) {

// Leaderboard = Relay.createContainer(Leaderboard, {
//   initialVariables: {
//     currentWeekNo: moment().isoWeek(),
//     currentWeekYear: moment().weekYear(),
//     lastWeekNo: moment().add(-7, "days")
//       .isoWeek(),
//     lastWeekYear: moment().add(-7, "days")
//       .weekYear()
//   },
//   fragments: {
//     activeUser: () =>Relay.QL`
//       fragment on User {
//         ${PersonalGoals.getFragment("user")}
//       }
//     `,
//     store: () => Relay.QL`
//     fragment on Store {
//         id
//         ${Medals.getFragment("store")}
//         ${Catchup.getFragment("store")}
//         current: summary(week: $currentWeekNo, year: $currentWeekYear) {
//           ${LeaderboardList.getFragment("summary")}
//         }
//         last: summary(week: $lastWeekNo, year: $lastWeekYear) {
//           ${LeaderboardList.getFragment("summary")}
//         }
//         currentSeason {
//           ${Medals.getFragment("season")}
//         }
//       }
//     `
//   }
// });

Leaderboard = createRefetchContainer(
  Leaderboard, 
  {
    activeUser: graphql`
      fragment Leaderboard_activeUser on User {
        ...PersonalGoals_user
      }
    `,
    store: graphql`
    fragment Leaderboard_store on Store 
    @argumentDefinitions(
      week: { type: "Int", defaultValue: 44 }
      year: { type: "Int", defaultValue: 2017 }
      currentWeekNo: { type: "Int", defaultValue: 44 }
      currentWeekYear: { type: "Int", defaultValue: 2017 }
      lastWeekNo: { type: "Int", defaultValue: 43 }
      lastWeekYear: { type: "Int", defaultValue: 2017 }
    ) {
      id
        ...Medals_store
        ...Catchup_store
        current: summary(week: $currentWeekNo, year: $currentWeekYear) {
          ...LeaderboardList_summary
        }
        last: summary(week: $lastWeekNo, year: $lastWeekYear) {
          ...LeaderboardList_summary
        }
        currentSeason {
          ...Medals_season
        }
      }
    `    
  },
  graphql`
    query LeaderboardQuery(
        $week: Int, 
        $year: Int,
        $currentWeekNo: Int,
        $currentWeekYear: Int,
        $lastWeekNo: Int,
        $lastWeekYear: Int
      ) {
        store {
          ...Catchup_store @arguments(
            week: $week, 
            year: $year,
            currentWeekNo: $currentWeekNo,
            currentWeekYear: $currentWeekYear,
            lastWeekNo: $lastWeekNo,
            lastWeekYear: $lastWeekYear
          )
        }
      } 
    `
)

// export const LeaderboardQuery = graphql`
//   query LeaderboardQuery (
//     $activeUser: String,
//     $hasActiveUser: Boolean!
//   ) {
//     store {
//       ...Leaderboard_store
//     }
//     user(username: $activeUser) @include(if: $hasActiveUser) {
//       ...Leaderboard_activeUser
//     }
//   }
// `;

export default Leaderboard;