import React from "react";
import Relay from "react-relay";

import PersonalGoalsList from "./PersonalGoalsList";

class PersonalGoals extends React.Component {
  render() {
    const goals = this.props.user.personalGoals;
    if (!(goals && goals.length > 0)) { return null; }
    return (
      <div>
        <h3>Personal Goals</h3>
        <PersonalGoalsList user={this.props.user} />
      </div>
    );
  }
}

PersonalGoals = Relay.createContainer(PersonalGoals, {
  fragments: {
    user: () =>Relay.QL`
      fragment on User {
        personalGoals {
          _id
        }
        ${PersonalGoalsList.getFragment("user")}
      }
    `,
  }
});

export default PersonalGoals;