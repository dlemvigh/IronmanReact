import React from "react";
import Relay from "react-relay";
import moment from "moment";

import LeaderboardList from "./LeaderboardList";
import Catchup from "../Catchup/Catchup";
import Medals from "../Medals/Medals";

class Leaderboard extends React.Component {
  render() {
    return (
      <div>
        <h3>This weeks leaderboard</h3>
        <LeaderboardList summary={this.props.store.current} />
        {this.props.store.current.length >= 1 && <Catchup store={this.props.store} />}
        {this.props.store.last.length > 0 && <h3>Last weeks leaderboard</h3>}
        {this.props.store.last.length > 0 && <LeaderboardList summary={this.props.store.last} />}
        <Medals store={this.props.store} />
      </div>
    );
  }
}

Leaderboard = Relay.createContainer(Leaderboard, {
  initialVariables: {
    currentWeekNo: moment().isoWeek(),
    currentWeekYear: moment().year(),
    lastWeekNo: moment().add(-7, "days")
                        .isoWeek(),
    lastWeekYear: moment().add(-7, "days")
                          .year()
  },
  fragments: {
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
      }
    `
  }
});

export default Leaderboard;