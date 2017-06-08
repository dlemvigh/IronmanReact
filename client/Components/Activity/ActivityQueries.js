import Relay from 'react-relay/classic';

export default { 
  byUsername: {
    store: () => Relay.QL`
        query Store {
            store    
        }
    `,
    user: () => Relay.QL`
            query User {
                user (username: $username)
            }
        `
  },
  byId: {
    store: () => Relay.QL`
            query Store {
                store    
            }
        `,
    user: () => Relay.QL`
            query User {
                user (id: $id)
            }
        `
  }
};