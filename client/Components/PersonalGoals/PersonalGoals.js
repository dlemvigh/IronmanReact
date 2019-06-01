import React from "react";
import gql from "graphql-tag";

import PersonalGoalsList from "./PersonalGoalsList";

class PersonalGoals extends React.Component {
  render() {
    const goals = this.props.user && this.props.user.personalGoals;
    if (!(goals && goals.length > 0)) {
      return null;
    }
    return (
      <div>
        <h3>Personal Goals</h3>
        <PersonalGoalsList user={this.props.user} />
      </div>
    );
  }
}

// ${PersonalGoalsList.getFragment("user")}

PersonalGoals.fragments = {
  user: gql`
    fragment PersonalGoals_user on User {
      personalGoals {
        _id
      }
    }
  `
};

export default PersonalGoals;
