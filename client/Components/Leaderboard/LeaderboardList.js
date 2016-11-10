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
                    {this.props.store.users.edges
                        .sort((a,b) => b.node.summary.score - a.node.summary.score)
                        .map((edge, index) =>
                        <LeaderboardItem key={edge.node._id} user={edge.node} index={index} />
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
                users(first: 10) {
                    edges {
                        node {
                            _id
                            summary {
                                score
                            }
                            ${LeaderboardItem.getFragment('user')}
                        }
                    }
                }
            }
        `
    }
})

export default LeaderboardList