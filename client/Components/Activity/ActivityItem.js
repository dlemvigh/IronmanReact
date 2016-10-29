import React from "react"
import Relay from "react-relay"
import CSSModules from "react-css-modules"

import Date from "../Common/Date"
import styles from "./ActivityItem.scss"

class ActivityItem extends React.Component {
    // static propTypes = {
    //     discipline: React.PropTypes.string.isRequired,
    //     distance: React.PropTypes.number.isRequired,
    //     unit: React.PropTypes.string.isRequired,
    //     score: React.PropTypes.number.isRequired,
    //     date: React.PropTypes.object.isRequired
    // }

    render() {
        return (
            <tr>
                <td>{this.props.activity.disciplineName}</td>
                <td>{this.props.activity.distance} {this.props.unit}</td>
                <td>{this.props.activity.score}</td>
                <td><Date value={this.props.activity.date} /></td>
            </tr>
        );
    }
}

ActivityItem = Relay.createContainer(ActivityItem, {
    fragments: {
        activity: () => Relay.QL`
            fragment on Activity {
                disciplineName, 
                distance,
                unit,
                score,
                date
            }`
    }
})

export default CSSModules(ActivityItem, styles)