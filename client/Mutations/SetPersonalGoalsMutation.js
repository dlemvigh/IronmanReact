// import Relay from 'react-relay/classic';

// class SetPersonalGoalsMutations extends Relay.Mutation {
  
//   getMutation() {
//     return Relay.QL`
//       mutation { setPersonalGoals }
//     `;
//   }

//   getVariables() {
//     return {
//       userId: this.props.user._id,
//       goals: this.props.goals
//     };
//   }

//   getFatQuery() {
//     return Relay.QL`
//       fragment on SetPersonalGoalsPayload {
//         user {
//           personalGoals
//         }
//       }
//     `;
//   }

//   getConfigs() {
//     return [{
//       type: "FIELDS_CHANGE",
//       fieldIDs: {
//         user: this.props.user.id
//       }
//     }];
//   }
// }

// export default SetPersonalGoalsMutations;

import { commitMutation, graphql } from 'react-relay/compat';

const mutation = graphql`
  mutation SetPersonalGoalsMutation (
    $input: SetPersonalGoalsInput!
  ) {
    setPersonalGoals(input: $input) {
      user {
        id
        personalGoals {
          _id
          id
          userId
          userName
          disciplineId
          disciplineName
          count
          dist
          score
          priority
        }
      }
    }
  }
`;

function getConfigs(userId) {
  return [{
    type: "FIELDS_CHANGE",
    fieldIDs: {
      user: userId
    }
  }];
}

function commit(envirionment, { userId, goals }, config = {}) {
  return commitMutation(
    envirionment,
    {
      ...config,
      mutation,
      variables: { input: { userId, goals } },
      configs: getConfigs(userId)
    }
  )
}

export default { commit };