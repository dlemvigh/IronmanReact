import React from "react"
import Relay from "react-relay"
import { Table } from "react-bootstrap"
import _ from "lodash"

import LeaderboardItem from "./LeaderboardItem"

class LeaderboardList extends React.Component {

    getSortedUsers() {
        const sorted = _(this.props.store.users)
            .sortBy([user => user.summary ? user.summary.score : 0])
            .reverse().value();
        return sorted;
    }
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
                    {this.getSortedUsers() .map((user, index) =>
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