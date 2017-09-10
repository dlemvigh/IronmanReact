import Relay from "react-relay";

export default {
  activeUser: () => Relay.QL`
    query ActiveUser {
        user(username: $activeUser) @include(if: $isAuthenticated)
    }
  `,
  store: () => Relay.QL`
        query Store {
            store    
        }
    `,
};