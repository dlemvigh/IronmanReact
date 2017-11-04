import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";

import Medals from "../Medals/Medals";

class Season extends React.Component {
  render() {
    return (
      <div>                
        <Medals store={this.props.store} season={this.props.season || null} />
      </div>
    );
  }
}

Season = createFragmentContainer(Season, {
  store: graphql`
    fragment Season_store on Store {
      ...Medals_store
    }
  `,
  season: graphql`
    fragment Season_season on Season {
      name
      ...Medals_season
    }
  `
});

export const SeasonQuery = graphql`
  query SeasonQuery (
    $id: String!
  ) {
    store {
      ...Season_store
    }
    season(id: $id) {
      ...Season_season
    }
  }
`;

export default Season;
