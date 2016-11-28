import React from "react"
import _ from "lodash"

const swim = { score: 25, dist: .4 }
const bike = { score: 1, dist: 18 }
const run = { score: 5, dist: 4 }
const total = swim.score * swim.dist + bike.score * bike.dist + run.score * run.dist;

class CatchupItemTriathlon extends React.Component {
    static propTypes = {
        score: React.PropTypes.number.isRequired
    }

    getDiff() {
        return this.props.highscore - this.props.score;
    }

    getDistance() {
        if (this.getDiff() < 12) {
            return "";
        }
        return `${this.getPart(swim)} - ${this.getPart(bike)} - ${this.getPart(run)} km`;
    }

    getPart(disc) {
        const dist = _.round(disc.dist * this.getDiff() / total, 1)
        return dist;
    }

    render() {
        return (
            <td>{this.getDistance()}</td>
        );
    }
}

export default CatchupItemTriathlon