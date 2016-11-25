import React from "react"
import Relay from "react-relay"
import { Link, Navigation } from "react-router";
import CSSModules from "react-css-modules"

import Pos from "../Common/Pos";
import styles from "./LeaderboardItem.scss"

class LeaderboardItem extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    onClick = () => {
        this.context.router.push(`/${this.props.summary.username}`);
    }

    getScore() {
        return this.props.summary ? this.props.summary.score : 0;
    }

    render() {
        return (
            <tr styleName="row" onClick={this.onClick}>
                <td><Pos value={this.props.index + 1} /></td>
                <td>{this.props.summary.userName}</td>
                <td>{this.getScore()} points</td>
            </tr>
        );
    }
}

LeaderboardItem = CSSModules(LeaderboardItem, styles)

LeaderboardItem = Relay.createContainer(LeaderboardItem, {
    fragments: {
        summary: () => Relay.QL`
            fragment on Summary {
                userName
                score
            }
        `
    }
});

export default LeaderboardItem;