import gql from "graphql-tag";

export default {
  store: () => Relay.QL`
        query Store {
            store    
        }
    `,
  season: () => Relay.QL`
        query Season {
            season (id: $id)
        }
    `
};
