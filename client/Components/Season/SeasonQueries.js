import Relay from "react-relay";

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