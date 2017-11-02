import { commitMutation, graphql } from 'react-relay/compat';

const mutation = graphql`
  mutation AddActivityMutation (
    $input: AddActivityInput!
  ) {
    addActivity(input: $input) {
      activity {
        id  
        _id
        date
        disciplineId
        disciplineName
        distance
        score
        unit
        week
        year
        userId
        userName      
      }
      store {
        users {
          medals {
            id
            gold
            goldWeeks
            silver
            silverWeeks
            bronze
            bronzeWeeks
          }
        }
      }  
      user {
        summary {
          id
          score
        }
        activities(first: 1000) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

function getConfigs() {
  return [];
}

function commit(environment, activity, config = {}) {
  return commitMutation(
    environment,
    {
      ...config,
      mutation,
      variables: { input: activity },
      configs: getConfigs(),
    }
  );
}

export default { commit };
