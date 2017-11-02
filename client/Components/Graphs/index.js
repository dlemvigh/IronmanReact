import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";

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

export const GraphsQuery = graphql`
  query GraphsQuery {
    store {
      ...Graphs_store
    }
  }
`;

Graphs = createFragmentContainer(Graphs, {
  store: graphql`
    fragment Graphs_store on Store {
      ...WeeklyTotal_store
      ...Weekday_store
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
});

export default Graphs;