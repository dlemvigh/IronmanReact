import gql from "graphql-tag";

class AddUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { addUser }
    `;
  }

  getVariables() {
    return this.props;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddUserPayload {
        user
      }
    `;
  }

  getConfigs() {
    return [];
  }
}

export default AddUserMutation;
