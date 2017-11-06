import React from "react";
import { createFragmentContainer, graphql } from "react-relay/compat";

import PersonalGoalsList from "./PersonalGoalsList";

class PersonalGoals extends React.Component {
  render() {
    const goals = this.props.user && this.props.user.personalGoals;
    if (!(goals && goals.length > 0)) { return null; }
    return (
      <div>
        <h3>Personal Goals</h3>
        <PersonalGoalsList user={this.props.user} />
      </div>
    );
  }
}

PersonalGoals = createFragmentContainer(PersonalGoals, {
  user: graphql`
    fragment PersonalGoals_user on User {
      personalGoals {
        _id
      }
      ...PersonalGoalsList_user
    }
  `,
});

export default PersonalGoals;