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
