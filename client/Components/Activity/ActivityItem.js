import React from "react"
import ReactDom from "react-dom"
import Relay from "react-relay"
import CSSModules from "react-css-modules"
import { Glyphicon } from "react-bootstrap"

import Date from "../Common/Date"
import Week from "../Common/Week"
import Year from "../Common/Year"
import styles from "./ActivityItem.scss"
import RemoveActivityMutation from "../../Mutations/RemoveActivityMutation"

class ActivityItem extends React.Component {
    onEdit = () => {
        this.props.onEdit(this.props.activity)
    }

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
                <td>{this.props.activity.distance} {this.props.activity.unit}</td>
                <td>{this.props.activity.score}</td>
                <td><Date value={this.props.activity.date} /></td>
                <td className="hidden-xs"><Week value={this.props.activity.date} /></td>
                <td className="hidden-xs"><Year value={this.props.activity.date} /></td>
                <td>
                    <a href="javascript:void 0" onClick={this.onEdit}><Glyphicon glyph="pencil"/></a>
                    {" "}
                    <a href="javascript:void 0" onClick={this.onDelete}><Glyphicon glyph="trash"/></a>
                </td>
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
                id
                disciplineId, 
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