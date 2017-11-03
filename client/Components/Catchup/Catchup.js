import React from "react";
import { createFragmentContainer, graphql } from 'react-relay/compat';
import moment from "moment";
import _ from "lodash";

import CatchupList from "../Catchup/CatchupList";

class Catchup extends React.Component {

  getHighestScore() {
    const max = _.max(this.props.store.users.map(this.getScore));
    return max;
  }

  getScore(user) {
    return user.summary ? user.summary.score : 0;
  }

  getSortedUser() {
    return _.sortBy(this.props.store.users, this.getScore).reverse();
  }

  getLeader() {
    return this.getSortedUser()[0].name;    
  }

  render() {
    return (
      <div>
        <h3>How do we beat {this.getLeader()}</h3>
        <CatchupList store={this.props.store} />
      </div>
    );
  }
}

Catchup = createFragmentContainer(
  Catchup, 
  {
    store: graphql`
    fragment Catchup_store on Store 
    @argumentDefinitions(
      week: { type: "Int", defaultValue: 44 }
      year: { type: "Int", defaultValue: 2017 }
    ) {
      users {
          name
          summary(week: $week, year: $year) {
            score
          }
        }
        ...CatchupList_store
      }
    `
  }
  // , 
  // graphql`
  //   query CatchupQuery(
  //     $week: Int, 
  //     $year: Int
  //   ) {
  //     store {
  //       ...Catchup_store @arguments(week: $week, year: $year)
  //     }
  //   } 
  // `
);

export default Catchup;