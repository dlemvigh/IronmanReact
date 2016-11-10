import React from "react"
import Relay from "react-relay"
import { Table } from "react-bootstrap"

import LeaderboardItem from "./LeaderboardItem"

// const data = [
//     {pos: 1, name: "Alice", points: 250, id: "5810e4e99425c73cdc9beb0b"},
//     {pos: 2, name: "Charlie", points: 225},
//     {pos: 3, name: "Eve", points: 212},
//     {pos: 4, name: "Bob", points: 179},
//     {pos: 5, name: "Oscar", points: 37},
// ]

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