import React from "react";
import Relay from "react-relay";

import WeeklyTotal from "./WeeklyTotal";
import Weekday from "./Weekday";

class Graphs extends React.Component {
  render() {
    return (
      <div>
        <WeeklyTotal store={this.props.store} />
        <Weekday store={this.props.store} />
      </div>
    );
  }
}

Graphs = Relay.createContainer(Graphs, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${WeeklyTotal.getFragment('store')},
        ${Weekday.getFragment('store')}
        users {
          name
        }
        allSummaries {
          userName
          year
          week
          score
        }
      }
    `
  }
});

export default Graphs;