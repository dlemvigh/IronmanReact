import React from 'react'
import Relay from 'react-relay'

import LeaderboardList from "./LeaderboardList"
import Catchup from "../Catchup/Catchup"
import Medals from "../Medals/Medals"

class Leaderboard extends React.Component {
    render() {
        return (
            <div>
                <h2>Leaderboard</h2>
                <LeaderboardList store={this.props.store} />
                {/*<Catchup score={225} target={250} />*/}
                {/*<Medals store={this.props.store} />*/}
            </div>
        );
    }
}

Leaderboard = Relay.createContainer(Leaderboard, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                id
                ${LeaderboardList.getFragment('store')}
                ${Medals.getFragment('store')}
            }
        `
    }
})

export default Leaderboard;