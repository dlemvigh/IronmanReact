import React from "react";
import Relay from 'react-relay/classic';
import moment from "moment";

import { auth } from '../../Auth/Auth';
import LeaderboardList from "./LeaderboardList";
import Catchup from "../Catchup/Catchup";
import Medals from "../Medals/Medals";
import PersonalGoals from "../PersonalGoals/PersonalGoals";

class Leaderboard extends React.Component {
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

Leaderboard = Relay.createContainer(Leaderboard, {
  initialVariables: {
    currentWeekNo: moment().isoWeek(),
    currentWeekYear: moment().weekYear(),
    lastWeekNo: moment().add(-7, "days")
      .isoWeek(),
    lastWeekYear: moment().add(-7, "days")
      .weekYear()
  },
  fragments: {
    activeUser: () =>Relay.QL`
      fragment on User {
        ${PersonalGoals.getFragment("user")}
      }
    `,
    store: () => Relay.QL`
    fragment on Store {
        id
        ${Medals.getFragment("store")}
        ${Catchup.getFragment("store")}
        current: summary(week: $currentWeekNo, year: $currentWeekYear) {
          ${LeaderboardList.getFragment("summary")}
        }
        last: summary(week: $lastWeekNo, year: $lastWeekYear) {
          ${LeaderboardList.getFragment("summary")}
        }
        currentSeason {
          ${Medals.getFragment("season")}
        }
      }
    `
  }
});

export default Leaderboard;