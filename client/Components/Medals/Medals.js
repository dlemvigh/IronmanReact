import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";

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

Medals = createFragmentContainer(Medals, {
  store: graphql`
    fragment Medals_store on Store {
      ...MedalsList_store
    }
  `,
  season: graphql`
    fragment Medals_season on Season {
      ...MedalsList_season
      ...Season_season
    }
  `
});

export default Medals;