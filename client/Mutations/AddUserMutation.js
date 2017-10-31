import { commitMutation, graphql } from 'react-relay/compat';

const mutation = graphql`
  mutation AddUserMutation(
    $input: AddUserInput!
  ) {
    addUser(input: $input) {
      user {
        id
      }
      store {
        users {
          id
        }
      }
    }
  }
`;

function getConfigs() {
  return [];
}

function commit(environment, user, config = {}) {
  return commitMutation(
    environment,
    {
      ...config,
      mutation,
      variables: { input: user },
      configs: getConfigs(),
    }
  );
}

export default { commit };
