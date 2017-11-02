// import Relay from 'react-relay/classic';

// class EnsureLoginMutation extends Relay.Mutation {
//   getMutation() {
//     return Relay.QL`
//       mutation { ensureLogin }
//     `;  
//   }

//   getVariables() {
//     return this.props;
//   }

//   getFatQuery() {
//     return Relay.QL`
//       fragment on EnsureLoginPayload {
//         user
//       }
//     `;
//   }

//   getConfigs() {
//     return [{
//       type: 'REQUIRED_CHILDREN',
//       children: [
//         Relay.QL`
//           fragment on EnsureLoginPayload {
//             user {
//               username
//             }
//           }
//         `
//       ]
//     }];
//   }
// }

// export default EnsureLoginMutation;

import { commitMutation, graphql } from 'react-relay/compat';

const mutation = graphql`
  mutation EnsureLoginMutation (
    $input: EnsureLoginInput!
  ) {
    ensureLogin(input: $input) {    
      user {
        id
        username      
      }
    }
  }
`;

function getConfigs() {
  return [];
}

function commit(environment, login, config = {}) {
  return commitMutation(
    environment,
    {
      ...config,
      mutation,
      variables: { input: login },
      configs: getConfigs()
    }
  )
}

export default { commit };