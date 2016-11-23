import React from "react"
import Relay from "react-relay"
import { Table } from "react-bootstrap"

import LeaderboardItem from "./LeaderboardItem"

class LeaderboardList extends React.Component {
    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.store.users
                        .sort((a,b) => a.summary && b.summary && b.summary.score - a.summary.score)
                        .map((user, index) =>
                        <LeaderboardItem key={user._id} user={user} index={index} />
                    )}
                </tbody>
            </Table>
        );
    }
}

LeaderboardList = Relay.createContainer(LeaderboardList, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                users {
                    _id
                    summary {
                        score
                    }
                    ${LeaderboardItem.getFragment('user')}
                }
            }
        `
    }
})

export default LeaderboardList