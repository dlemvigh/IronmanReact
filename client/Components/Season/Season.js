import React from "react";
import Relay from "react-relay";

import Medals from "../Medals/Medals";

class Season extends React.Component {
    render() {
        return (
            <div>
                <h3>Season</h3>
                TODO - show old season
                {/*<Medals store={this.props.store} />*/}
            </div>
        );
    }
}

Season = Relay.createContainer(Season, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${Medals.getFragment("store")}
      }
    `
  }
})

export default Season;
