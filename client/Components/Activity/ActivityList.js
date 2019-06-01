import React from "react";
import gql from "graphql-tag";
import { Table } from "react-bootstrap";
import _ from "lodash";

import ActivityHeader from "./ActivityHeader";
import ActivityItem from "./ActivityItem";

class ActivityList extends React.Component {
  getWeeks() {
    return _.uniq(this.props.user.activities.edges.map(x => x.node.week))
      .sort()
      .reverse();
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
          {this.props.user.activities.edges.map(edge => (
            <ActivityItem
              key={edge.node.id}
              activity={edge.node}
              onEdit={this.props.onEdit}
              {...this.props}
              striped={this.isStriped(weeks, edge.node.week)}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}


ActivityList.fragments = {
  store: gql`
    fragment ActivityList_store on Store {
      id
      ...ActivityItem_store
    }
    ${ActivityItem.fragments.store}
  `,
  user: gql`
    fragment ActivityList_user on User {
      ...ActivityItem_user
      activities {
        edges {
          node {
            id
            week
            ...ActivityItem_activity
          }
        }
      }
    }
    ${ActivityItem.fragments.user}
    ${ActivityItem.fragments.activity}
  `
};

export default ActivityList;
