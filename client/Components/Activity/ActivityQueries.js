import Relay from 'react-relay'

export default {
    user: () => Relay.QL`
        query SandboxQuery {
            user(id: "5810e4e99425c73cdc9beb0b")
        }
    `,
    // disciplines: () => Relay.QL`
    //     query {
    //         disciplines
    //     }
    // `
}