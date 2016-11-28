import React from "react"
import Relay from "react-relay"
import _ from "lodash"

import CatchupItemTriathlon from "./CatchupItemTriathlon"

class CatchupItem extends React.Component {
    getScore() {
        return this.props.summary ? this.props.summary.score : 0;
    }

    getCatchupDistance(disc) {
        const dist = _.round((this.props.highscore - this.getScore()) / disc.score, 1);
        return `${dist} ${disc.unit}`;
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.name}</td>
                {
                    this.props.disciplines.map(disc => <td key={disc._id}>{this.getCatchupDistance(disc)}</td> )
                }
                <CatchupItemTriathlon score={this.getScore()} highscore={this.props.highscore} />
            </tr>
        );
    }
}

CatchupItem = Relay.createContainer(CatchupItem, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                name
            }
        `,
        disciplines: () => Relay.QL`
            fragment on Discipline @relay(plural: true) {
                _id
                score
                unit
            }
        `,
        summary: () => Relay.QL`
            fragment on Summary {
                score
            }
        `
    }
})

export default CatchupItem