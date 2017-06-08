import React from "react";
import Relay from 'react-relay/classic';
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

Catchup = Relay.createContainer(Catchup, {
  initialVariables: {
    week: moment().isoWeek(),
    year: moment().year() 
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        users {
          name
          summary(week: $week, year: $year) {
            score
          }
        }
        ${CatchupList.getFragment("store")}
      }
    `
  }
});

export default Catchup;