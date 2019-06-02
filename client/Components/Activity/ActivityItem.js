import React from "react";
import gql from "graphql-tag";
// FIXME glyphs are missing from react-bootstrap
// import { Glyphicon } from "react-bootstrap";
import toastr from "toastr";

import Date from "../Common/Date";
import Day from "../Common/Day";
import Discipline from "../Common/Discipline";
import Score from "../Common/Score";
import Week from "../Common/Week";
import Year from "../Common/Year";
import { withRemoveActivityMutation } from "../../Mutations/RemoveActivityMutation";

class ActivityItem extends React.Component {
  onEdit = () => {
    this.props.onEdit(this.props.activity);
  };

  onDelete = () => {
    this.props.removeActivity({
      variables: {
        input: {
          id: this.props.activity._id
        }
      }
    }).then(
      () => toastr.success("Activity removed"), 
      () => toastr.error("Remove activity failed")
    );
  };

  getMedals() {
    return this.props.store.users.map(user => user.medals.id);
  }

  render() {
    const hiddenXs = "d-none d-md-table-cell";
    return (
      <tr data-test="activity-list-item" className={this.props.striped ? "active" : null}>
        <td>
          <Discipline value={this.props.activity.disciplineName} />
        </td>
        <td>
          {this.props.activity.distance} {this.props.activity.unit}
        </td>
        <td>
          <Score value={this.props.activity.score} />
        </td>
        <td>
          <Date value={this.props.activity.date} />
        </td>
        <td className={hiddenXs}>
          <Day value={this.props.activity.date} />
        </td>
        <td className={hiddenXs}>
          <Week value={this.props.activity.date} />
        </td>
        <td className={hiddenXs}>
          <Year value={this.props.activity.date} />
        </td>
        <td>
          <a href="javascript:void 0" onClick={this.onEdit}>
            edit
          </a>
        </td>
        <td>
          <a href="javascript:void 0" onClick={this.onDelete}>
            delete
          </a>
        </td>
      </tr>
    );
  }
}

ActivityItem = withRemoveActivityMutation(ActivityItem);

ActivityItem.fragments = {
  store: gql`
    fragment ActivityItem_store on Store {
      id  
      users {
        id
        medals {
          id
        }
      }
    }
  `,
  user: gql`
    fragment ActivityItem_user on User {
      id
    }
  `,
  activity: gql`
    fragment ActivityItem_activity on Activity {
      _id
      id
      disciplineId, 
      disciplineName, 
      distance,
      unit,
      score,
      date
    }`
};

export default ActivityItem;
