import React from "react";
import gql from "graphql-tag";

import Season from "../Common/Season";
// import MedalsList from "./MedalsList";

class Medals extends React.Component {
  render() {
    return (
      <div>
        <Season season={this.props.season} />
        {/* <MedalsList store={this.props.store} season={this.props.season} /> */}
      </div>
    );
  }
}

Medals.fragments = {
  season: gql`
    fragment Medals_season on Season {
      ...Season_season
    }
    ${Season.fragments.season}
  `
};

export default Medals;
