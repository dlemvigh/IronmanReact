import React from "react"

export default class LeaderboardItem extends React.Component {
    static propTypes = {
        pos: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        points: React.PropTypes.number.isRequired
    }

    render() {
        return (
            <tr>
                <td>{this.props.pos}</td>
                <td>{this.props.name}</td>
                <td>{this.props.points} points</td>
            </tr>
        );
    }
}