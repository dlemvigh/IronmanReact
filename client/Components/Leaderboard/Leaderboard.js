import React from "react";
import gql from "graphql-tag";

// import gql from "graphql-tag";
// import moment from "moment";

import LeaderboardList from "./LeaderboardList";
import Catchup from "../Catchup/Catchup";
import Medals from "../Medals/Medals";
// import PersonalGoals from "../PersonalGoals/PersonalGoals";

class Leaderboard extends React.Component {
  render() {
    return (
      <div>
        <h3>This weeks leaderboard</h3>
        <LeaderboardList summary={this.props.store.current} />
        {this.props.store.current && this.props.store.current.length >= 2 && (
          <Catchup store={this.props.store} />
        )}
        {this.props.store.last.length > 0 && <h3>Last weeks leaderboard</h3>}
        {this.props.store.last.length > 0 && <LeaderboardList summary={this.props.store.last} />}
        <Medals
          store={this.props.store}
          season={this.props.store.currentSeason}
        />
      </div>
    );
  }
}

Leaderboard.fragments = {
  store: gql`
    fragment Leaderboard_store on Store {
      id
      ...Catchup_store
      ...Medals_store
      currentSeason {
        ...Medals_season
      }
      current: summary(week: $currentWeekNo, year: $currentWeekYear) {
        ...LeaderboardList_summary
      }
      last: summary(week: $lastWeekNo, year: $lastWeekYear) {
        ...LeaderboardList_summary
      }
    }
    ${Catchup.fragments.store}
    ${Medals.fragments.store}
    ${Medals.fragments.season}
    ${LeaderboardList.fragments.summary}
  `
};

export default Leaderboard;
