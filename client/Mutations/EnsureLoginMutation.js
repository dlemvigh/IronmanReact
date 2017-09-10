import Relay from "react-relay";

class EnsureLoginMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { ensureLogin }
    `;  
  }

  getVariables() {
    return this.props;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on EnsureLoginPayload {
        user
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on EnsureLoginPayload {
            user {
              username
            }
          }
        `
      ]
    }];
  }
}

export default EnsureLoginMutation;
