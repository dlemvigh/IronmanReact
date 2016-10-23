import React from "react"

export default class CatchupItem extends React.Component {
    static propTypes = {
        discipline: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            score: React.PropTypes.number.isRequired,
            unit: React.PropTypes.string.isRequired
        }).isRequired,
        score: React.PropTypes.number.isRequired
    }

    getDistance() {
        return Math.round(100 * this.props.score / this.props.discipline.score) / 100;
    }

    render() {
        return (
            <tr>
                <td>{this.props.discipline.name}</td>
                <td>{this.getDistance()} {this.props.discipline.unit}</td>
            </tr>
        );
    }
}