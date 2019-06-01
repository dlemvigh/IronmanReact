import React from "react";
import gql from "graphql-tag";

import Medals from "../Medals/Medals";

class SeasonPage extends React.Component {
  render() {
    return (
      <div>
        <Medals store={this.props.store} season={this.props.season || null} />
      </div>
    );
  }
}

SeasonPage.fragments = {
  store: gql`
    fragment SeasonPage_store on Store {
      id
      ...Medals_store
    }
    ${Medals.fragments.store}
  `,
  season: gql`
    fragment SeasonPage_season on Season {
      id
      name
      ...Medals_season
    }
    ${Medals.fragments.season}
  `
};

export default SeasonPage;
