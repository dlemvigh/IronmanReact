import React from "react";
import Relay from "react-relay";
import { Table } from "react-bootstrap";
import moment from "moment";

import PersonalGoalItem from "./PersonalGoalsItem";

class PersonalGoalsList extends React.Component {
  getCurrentWeek() {
    const week = moment().isoWeek();
    const year = moment().weekYear();
    return this.props.user.activities.edges.filter(x => x.node.week === week && x.node.year === year);
  }

  render() {
    const activities = this.getCurrentWeek();
    return (
      <Table striped hover>
        <tbody>
          { 
            this.props.user.personalGoals.map(goal => 
              <PersonalGoalItem key={goal._id} user={this.props.user} goal={goal} activities={activities} />
            ) 
          }
        </tbody>
      </Table>
    );
  }
}

PersonalGoalsList = Relay.createContainer(PersonalGoalsList, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        activities(first: 1000) {
          edges {
            ${PersonalGoalItem.getFragment("activities")}
            node {
              week
              year
            }
          }
        }
        personalGoals {
          _id
          ${PersonalGoalItem.getFragment("goal")}
        }
      }
    `
  }
});

export default PersonalGoalsList;