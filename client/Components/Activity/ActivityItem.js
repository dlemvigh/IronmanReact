import React from "react";
import Relay from "react-relay";
import { Glyphicon } from "react-bootstrap";
import toastr from "toastr";

import Date from "../Common/Date";
import Day from "../Common/Day";
import Discipline from "../Common/Discipline";
import Score from "../Common/Score";
import Week from "../Common/Week";
import Year from "../Common/Year";
import RemoveActivityMutation from "../../Mutations/RemoveActivityMutation";

class ActivityItem extends React.Component {
  onEdit = () => {
    this.props.onEdit(this.props.activity);
  }

  onDelete = () => {
    const mutation = new RemoveActivityMutation({
      id: this.props.activity._id,
      nodeId: this.props.user.id,
      medals: this.getMedals(),
      store: this.props.store.id
    });    
    Relay.Store.commitUpdate(
            mutation, {
              onFailure: (resp) => { console.log("fail", resp); toastr.error("Remove activity failed"); },
              onSuccess: (resp) => { console.log("success", resp); toastr.success("Activity removed"); }
            }
        );
  }

  getMedals() {
    return this.props.store.users.map(user => user.medals.id);
  }

  render() {
    return (
      <tr className={this.props.striped && "active"}>
        <td><Discipline value={this.props.activity.disciplineName} /></td>
        <td>{this.props.activity.distance} {this.props.activity.unit}</td>
        <td><Score value={this.props.activity.score} /></td>
        <td><Date value={this.props.activity.date} /></td>
        <td className="hidden-xs"><Day value={this.props.activity.date} /></td>
        <td className="hidden-xs"><Week value={this.props.activity.date} /></td>
        <td className="hidden-xs"><Year value={this.props.activity.date} /></td>
        <td>
          <a href="javascript:void 0" onClick={this.onEdit}><Glyphicon glyph="pencil" /></a>
        </td>
        <td>
          <a href="javascript:void 0" onClick={this.onDelete}><Glyphicon glyph="trash" /></a>
        </td>
      </tr>
    );
  }
}

ActivityItem = Relay.createContainer(ActivityItem, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id  
        users {
          medals {
            id
          }
        }
      }
    `,
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
});

export default ActivityItem;