import Relay from 'react-relay/classic';

export default {
  activeUser: () => Relay.QL`
    query ActiveUser {
        user(username: $activeUser) @include(if: $hasActiveUser)
    }
  `,
  store: () => Relay.QL`
        query Store {
            store    
        }
    `,
};

  // import { graphql } from 'react-relay/compat';

  // export default graphql`
  //     query AppQueriesQuery (
  //         $activeUser: String!, 
  //         $hasActiveUser: Boolean!
  //       ) {
  //         user(username: $activeUser) @include(if: $hasActiveUser) {
  //           ...App_activeUser
  //         }
  //         store {
  //           ...App_store
  //         }
  //     }
  // `;