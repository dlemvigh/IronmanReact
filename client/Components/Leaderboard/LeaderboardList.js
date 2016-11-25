import React from "react"
import Relay from "react-relay"
import { Table } from "react-bootstrap"
import _ from "lodash"

import LeaderboardItem from "./LeaderboardItem"

class LeaderboardList extends React.Component {

    sorted() {
        const sorted = _(this.props.summary)
            .sortBy([summary => summary.score    || 0])
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
                    {this.sorted() .map((summary, index) =>
                        <LeaderboardItem key={summary._id} summary={summary} index={index} />
                    )}
                </tbody>
            </Table>
        );
    }
}

LeaderboardList = Relay.createContainer(LeaderboardList, {
    fragments: {
        summary: () => Relay.QL`
            fragment on Summary @relay(plural: true) {
                _id
                score
                ${LeaderboardItem.getFragment('summary')}
            }
        `
    }
})

export default LeaderboardList