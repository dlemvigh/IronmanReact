import React from "react";
import Relay from 'react-relay/classic';
import { Table } from "react-bootstrap";
import _ from "lodash";

import ActivityHeader from "./ActivityHeader";
import ActivityItem from "./ActivityItem";

class ActivityList extends React.Component {

  getWeeks() {
    return _.uniq(this.props.user.activities.edges.map(x => x.node.week)).sort().reverse();
  }

  isStriped(weeks, week) {
    let index = weeks.length - weeks.indexOf(week);
    return index % 2 == 1;
  }

  render() {
    const weeks = this.getWeeks();
    return (
      <Table hover>
        <thead>
          <ActivityHeader />
        </thead>
        <tbody>
          {
            this.props.user.activities.edges.map((edge,index) => 
              <ActivityItem key={edge.node.id} activity={edge.node} onEdit={this.props.onEdit} {...this.props} striped={this.isStriped(weeks, edge.node.week)} />)
          }
        </tbody>
      </Table>
    );
  }
}

ActivityList = Relay.createContainer(ActivityList, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${ActivityItem.getFragment("store")}
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        ${ActivityItem.getFragment("user")}
        activities(first: 100) {
          edges {
            node {
              id
              week
              ${ActivityItem.getFragment("activity")}
            }
          }
        }
      }
    `
  }
});

export default ActivityList;