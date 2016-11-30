import React from "react";
import Relay from "react-relay";

import MedalsList from "./MedalsList";

class Medals extends React.Component {
  render() {
    return (
      <div>
        <h2>Medals</h2>
        <MedalsList store={this.props.store} />
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
    `
  }
});

export default Medals;