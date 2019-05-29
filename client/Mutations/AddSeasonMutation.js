import gql from "graphql-tag";

class AddSeasonMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`
      mutation { addSeason }
    `;
  }

  getVariables() {
    return this.props;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddSeasonPayload {
        season
      }
    `;
  }

  getConfigs() {
    return [];
  }
}

export default AddSeasonMutation;
