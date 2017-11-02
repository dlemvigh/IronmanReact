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