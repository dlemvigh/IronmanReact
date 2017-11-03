import React from "react";
// import Relay from 'react-relay/classic';
import { createRefetchContainer, graphql } from 'react-relay/compat';
import moment from "moment";
import _ from "lodash";

import CatchupList from "../Catchup/CatchupList";

class Catchup extends React.Component {

  constructor(props) {
    super(props);
    this.refetch(props);
  }

  refetch(props) {
    const vars = {
      week: moment().isoWeek(),
      year: moment().weekYear() 
    };
    props.relay.refetch(vars, null);
  }

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

  test = () => {
    this.refetch(this.props);
    console.log("test");
  }

  render() {
    return (
      <div>
        <h3>How do we beat {this.getLeader()}</h3>
        <button type="button" onClick={this.test}>Click me!</button>
        <CatchupList store={this.props.store} />
      </div>
    );
  }
}

Catchup = createRefetchContainer(
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
  }, 
  graphql`
    query CatchupQuery(
      $week: Int, 
      $year: Int
    ) {
      store {
        ...Catchup_store @arguments(week: $week, year: $year)
      }
    } 
  `
);

export default Catchup;