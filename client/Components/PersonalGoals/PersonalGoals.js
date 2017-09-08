import React from "react";
import Relay from "react-relay";

import PersonalGoalsList from "./PersonalGoalsList";

class PersonalGoals extends React.Component {
  render() {
    return (
      <div>
        <h3>Personal Goals</h3>
        <PersonalGoalsList activeUser={this.props.activeUser} />
      </div>
    );
  }
}

PersonalGoals = Relay.createContainer(PersonalGoals, {
  fragments: {
    activeUser: () =>Relay.QL`
      fragment on User {
        ${PersonalGoalsList.getFragment("activeUser")}
      }
    `,
  }
});

export default PersonalGoals;