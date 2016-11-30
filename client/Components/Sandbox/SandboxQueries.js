import Relay from "react-relay";

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