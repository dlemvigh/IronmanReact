// import Relay from 'react-relay/classic';

// class AddSeasonMutation extends Relay.Mutation {
//   getMutation() {
//     return Relay.QL`
//       mutation { addSeason }
//     `;  
//   }

//   getVariables() {
//     return this.props;
//   }

//   getFatQuery() {
//     return Relay.QL`
//       fragment on AddSeasonPayload {
//         season
//       }
//     `;
//   }

//   getConfigs() {
//     return [];
//   }
// }

// export default AddSeasonMutation;

import { commitMutation, graphql } from 'react-relay/compat';

const mutation = graphql`
  mutation AddSeasonMutation (
    $input: AddSeasonInput!
  ) {
    addSeason(input: $input) {
      season {
        id
      }    
    }
  }
`;

function getConfigs() {
  return [];
}

function commit(environment, season, config = {}) {
  return commitMutation(
    environment,
    {
      ...config,
      mutation,
      variables: { input: season },
      configs: getConfigs()
    }
  );
}

export default { commit };
