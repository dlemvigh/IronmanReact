import React from "react"
import _ from "lodash"

const swim = { score: 25, dist: .4, part: 10/48 }
const bike = { score: 1, dist: 18, part: 18/48 }
const run = { score: 5, dist: 4, part: 20/48 }

export default class CatchupItemTriathlon extends React.Component {
    static propTypes = {
        score: React.PropTypes.number.isRequired
    }

    getDistance() {
        return `${this.getPart(swim)} - ${this.getPart(bike)} - ${this.getPart(run)} km`;
    }

    getPart(disc) {
        return Math.round(10 * this.props.score * disc.part / disc.score) / 10;
    }

    render() {
        return (
            <tr>
            <td>triathlon</td>
            <td>{this.getDistance()}</td>
        </tr>
    );
    }
}