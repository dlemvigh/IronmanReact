import React from 'react'
import Relay from 'react-relay'

import Activity from '../Activity/Activity'
import Leaderboard from '../Leaderboard/Leaderboard'
import Medals from '../Medals/Medals'

class Sandbox extends React.Component {
    render() {
        return (
            <div>
                Sandbox
                <Leaderboard store={this.props.store} />
                <Activity store={this.props.store} user={this.props.user} />
            </div>
        );
    }
}

Sandbox = Relay.createContainer(Sandbox, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                ${Leaderboard.getFragment('store')}
                ${Activity.getFragment('store')}
            }
        `,
        user: () => Relay.QL`
            fragment on User {
                ${Activity.getFragment('user')}
            }
        `
    }
});

export default Sandbox;