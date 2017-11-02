import { commitMutation, graphql } from 'react-relay/compat';

const mutation = graphql`
  mutation RemoveActivityMutation (
    $input: RemoveActivityInput!
  ) {
    removeActivity(input: $input) {
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

function getConfigs(nodeId) {
  return [{
    type: "NODE_DELETE",
    parentName: "user",
    parentID: nodeId,
    connectionName: "activities",
    deletedIDFieldName: "removedActivityId",
  }];
}

function commit(environment, id, nodeId, config = {}) {
  return commitMutation(
    environment,
    {
      ...config,
      mutation,
      variables: { input: { id } },
      configs: getConfigs(nodeId)
    }
  );
}

export default { commit };