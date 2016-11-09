import React from "react"
import Relay from "react-relay"
import CSSModules from "react-css-modules"

import Date from "../Common/Date"
import styles from "./ActivityItem.scss"
import RemoveActivityMutation from "../../Mutations/RemoveActivityMutation"

class ActivityItem extends React.Component {
    // static propTypes = {
    //     discipline: React.PropTypes.string.isRequired,
    //     distance: React.PropTypes.number.isRequired,
    //     unit: React.PropTypes.string.isRequired,
    //     score: React.PropTypes.number.isRequired,
    //     date: React.PropTypes.object.isRequired
    // }
    onDelete = () => {
        const mutation = new RemoveActivityMutation({
            id: this.props.activity._id,
            nodeId: this.props.user.id
        })
        Relay.Store.commitUpdate(
            mutation, {
                onFailure: (resp) => console.log("fail", resp),
                onSuccess: (resp) => console.log("success", resp)
            }
        )
    }

    render() {
        return (
            <tr>
                <td>{this.props.activity.disciplineName}</td>
                <td>{this.props.activity.distance} {this.props.unit}</td>
                <td>{this.props.activity.score}</td>
                <td><Date value={this.props.activity.date} /></td>
                <td><a href="javascript:void 0" onClick={this.onDelete}>delete</a></td>
            </tr>
        );
    }
}

ActivityItem = Relay.createContainer(ActivityItem, {
    fragments: {
        user: () => Relay.QL`
            fragment on User {
                id
            }
        `,
        activity: () => Relay.QL`
            fragment on Activity {
                _id
                disciplineName, 
                distance,
                unit,
                score,
                date
            }`
    }
})

// export default CSSModules(ActivityItem, styles)
export default ActivityItem;