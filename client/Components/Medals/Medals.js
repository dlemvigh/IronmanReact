import React from "react";
import Relay from "react-relay";

import MedalsList from "./MedalsList";

class Medals extends React.Component {
  render() {
    return (
      <div>
        <h3>Medals</h3>
        <MedalsList store={this.props.store} season={this.props.season} />
      </div>
    );
  }
}

Medals = Relay.createContainer(Medals, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${MedalsList.getFragment("store")}
      }
    `,
    season: () => Relay.QL`
      fragment on Season {
        ${MedalsList.getFragment("season")}
      }
    `
  }
});

export default Medals;