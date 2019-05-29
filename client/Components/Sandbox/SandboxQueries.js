import gql from "graphql-tag";

export default {
  store: () => Relay.QL`
        query Store {
            store    
        }
    `,
  user: () => Relay.QL`
        query User {
            user (username: "david")
        }
    `
};