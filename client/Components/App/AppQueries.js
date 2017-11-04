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
