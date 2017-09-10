import Relay from "react-relay";

class SetPersonalGoalsMutations extends Relay.Mutation {
  
  getMutation() {
    return Relay.QL`
      mutation { setPersonalGoals }
    `;
  }

  getVariables() {
    return {
      userId: this.props.user._id,
      goals: this.props.goals
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SetPersonalGoalsPayload {
        user {
          personalGoals
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: "FIELDS_CHANGE",
      fieldIDs: {
        user: this.props.user.id
      }
    }]
  }
}

export default SetPersonalGoalsMutations;