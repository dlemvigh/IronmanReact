import React from "react"
import Relay from "react-relay"
import { Link, Navigation } from "react-router";
import CSSModules from "react-css-modules"

import styles from "./LeaderboardItem.scss"

class LeaderboardItem extends React.Component {
    // static propTypes = {
    //     pos: React.PropTypes.number.isRequired,
    //     name: React.PropTypes.string.isRequired,
    //     points: React.PropTypes.number.isRequired,
    //     id: React.PropTypes.string
    // }
    static contextTypes = {
        router: React.PropTypes.object
    }

    onClick = () => {
        this.context.router.push(`/activity/${this.props.user._id}`);
    }

    render() {
        console.log("item", this.props);
        return (
            <tr styleName="row" onClick={this.onClick}>
                <td>{this.props.index + 1}</td>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.summary.score} points</td>
            </tr>
        );
    }
}

LeaderboardItem = CSSModules(LeaderboardItem, styles)

LeaderboardItem = Relay.createContainer(LeaderboardItem, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                _id
                name
                summary {
                    score
                }
            }
        `
    }
});

export default LeaderboardItem;