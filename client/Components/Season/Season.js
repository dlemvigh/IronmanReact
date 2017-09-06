import React from "react";
import Relay from "react-relay";

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

Season = Relay.createContainer(Season, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${Medals.getFragment("store")}
      }
    `,
    season: () => Relay.QL`
      fragment on Season {
        name
        ${Medals.getFragment("season")}
      }
    `
  }
})

export default Season;
