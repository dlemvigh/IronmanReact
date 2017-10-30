import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";
import { Table } from "react-bootstrap";
import moment from "moment";

import PersonalGoalsItem from "./PersonalGoalsItem";

class PersonalGoalsList extends React.Component {
  getCurrentWeek() {
    const week = moment().isoWeek();
    const year = moment().weekYear();
    return this.props.user.activities.edges.filter(x => x.node.week === week && x.node.year === year);
  }

  render() {
    const goals = this.props.user && this.props.user.personalGoals;
    if (!(goals && goals.length > 0)) { return null; }

    const activities = this.getCurrentWeek();
      
    return (
      <Table striped hover>
        <tbody>
          { 
            goals.map(goal => 
              <PersonalGoalsItem key={goal._id} user={this.props.user} goal={goal} activities={activities} />
            ) 
          }
        </tbody>
      </Table>
    );
  }
}

PersonalGoalsList = createFragmentContainer(PersonalGoalsList, {
  user: graphql`
    fragment PersonalGoalsList_user on User {
      ...PersonalGoalsItem_user
      activities(first: 1000) {
        edges {
          ...PersonalGoalsItem_activities
          node {
            week
            year
          }
        }
      }
      personalGoals {
        _id
        ...PersonalGoalsItem_goal
      }
    }
  `
});

export default PersonalGoalsList;