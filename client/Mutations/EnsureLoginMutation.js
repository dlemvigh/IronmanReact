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