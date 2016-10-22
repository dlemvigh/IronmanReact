import React from "react"
import CSSModules from "react-css-modules"

import Date from "../Common/Date"
import styles from "./ActivityItem.scss"

class ActivityItem extends React.Component {
    static propTypes = {
        discipline: React.PropTypes.string.isRequired,
        distance: React.PropTypes.number.isRequired,
        unit: React.PropTypes.string.isRequired,
        score: React.PropTypes.number.isRequired,
        date: React.PropTypes.object.isRequired
    }

    render() {
        return (
            <tr>
                <td styleName="bordered">{this.props.discipline}</td>
                <td styleName="bordered">{this.props.distance} {this.props.unit}</td>
                <td styleName="bordered">{this.props.score}</td>
                <td styleName="bordered"><Date value={this.props.date} /></td>
            </tr>
        );
    }
}

export default CSSModules(ActivityItem, styles)