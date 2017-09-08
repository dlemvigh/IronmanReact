import React from "react";
import Relay from "react-relay";
import { Table } from "react-bootstrap";

import PersonalGoalItem from "./PersonalGoalsItem";

class PersonalGoalsList extends React.Component {
  render() {
    return (
      <Table striped hover>
        <tbody>
          { 
            this.props.activeUser.personalGoals.map(goal => 
              <PersonalGoalItem key={goal._id} goal={goal} />
            ) 
          }
        </tbody>
      </Table>
    );
  }
}

PersonalGoalsList = Relay.createContainer(PersonalGoalsList, {
  fragments: {
    activeUser: () => Relay.QL`
      fragment on User {
        personalGoals {
          _id
          ${PersonalGoalItem.getFragment("goal")}
        }
      }
    `
  }
});

export default PersonalGoalsList;