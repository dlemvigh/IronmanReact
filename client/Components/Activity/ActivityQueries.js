import gql from "graphql-tag";

import Activity from "./Activity";
import { withApollo } from "../Common/ApolloLoader";

export default withApollo(Activity, {
  query: gql`
    query ActivityQuery($username: String!) {
      store {
        ...Activity_store
      }
      user (username: $username) {
        ...Activity_user  
      }      
      ${Activity.fragments.store}
      ${Activity.fragments.user}
    }
  `
});

// export default {
//   byUsername: {
//     store: () => Relay.QL`
//         query Store {
//             store
//         }
//     `,
//     user: () => Relay.QL`
//             query User {
//                 user (username: $username)
//             }
//         `
//   },
//   byId: {
//     store: () => Relay.QL`
//             query Store {
//                 store
//             }
//         `,
//     user: () => Relay.QL`
//             query User {
//                 user (id: $id)
//             }
//         `
//   }
// };
