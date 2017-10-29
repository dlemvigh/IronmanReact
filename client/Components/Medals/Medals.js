import React from "react";
import Relay from 'react-relay/classic';

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

Medals = Relay.createContainer(Medals, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${MedalsList.getFragment("store")}
      }
    `,
    season: () => Relay.QL`
      fragment on Season {
        ${Season.getFragment("season")}
        ${MedalsList.getFragment("season")}
      }
    `
  }
});

export default Medals;