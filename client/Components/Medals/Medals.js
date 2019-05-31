import React from "react";
import gql from "graphql-tag";

import Season from "../Common/Season";
import MedalsList from "./MedalsList";

class Medals extends React.Component {
  render() {
    return (
      <div>
        <Season season={this.props.season} />
        <MedalsList store={this.props.store} season={this.props.season} />
      </div>
    );
  }
}

Medals.fragments = {
  store: gql`
    fragment Medals_store on Store {
      ...MedalsList_store
    }
  `,
  season: gql`
    fragment Medals_season on Season {
      ...Season_season
      ...MedalsList_season
    }
    ${Season.fragments.season}
    ${MedalsList.fragments.season}
    ${MedalsList.fragments.store}
  `
};

export default Medals;
