import React from "react";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import CSSModules from "react-css-modules";

import styles from "./PersonalGoalsItem.modules.scss";

class PersonalGoalItem extends React.Component {
  renderDiscipline() {
    return (
      <strong>
        {this.props.goal.discipline
          ? this.props.goal.discipline.name
          : "exercise"}
      </strong>
    );
  }

  renderAmount() {
    let number, unit;

    if (this.props.goal.count) {
      number = this.props.goal.count;
      unit = this.props.goal.count != 1 ? "times" : "time";
    }

    if (this.props.goal.dist) {
      number = this.props.goal.dist;
      unit = this.props.goal.discipline.unit;
    }

    if (this.props.goal.score) {
      number = this.props.goal.score;
      unit = this.props.goal.score != 1 ? "points" : "point";
    }

    return (
      <strong>
        {number} {unit}
      </strong>
    );
  }

  calcProgress() {
    let progress, total;
    const goal = this.props.goal;
    const activities = goal.disciplineId
      ? this.props.activities.filter(
        edge => edge.node.disciplineId == goal.disciplineId
      )
      : this.props.activities;

    if (goal.count) {
      progress = activities.length;
      total = goal.count;
    }

    if (goal.dist) {
      progress = activities.reduce((sum, edge) => sum + edge.node.distance, 0);
      total = goal.dist;
    }

    if (goal.score) {
      progress = activities.reduce((sum, edge) => sum + edge.node.score, 0);
      total = goal.score;
    }

    return [progress, total];
  }

  onClick = () => {
    this.props.history.push(`/${this.props.user.username}/goals`);
  };

  render() {
    const [progres, total] = this.calcProgress();
    const width = (100 * progres) / total;
    return (
      <tr styleName="row" onClick={this.onClick}>
        <td>
          I want to {this.renderDiscipline()} at least {this.renderAmount()} per
          week.
          <div className="progress" styleName="progress">
            <div
              className="progress-bar"
              styleName="progress-bar"
              style={{ width: width + "%" }}
            />
          </div>
        </td>
      </tr>
    );
  }
}

PersonalGoalItem = CSSModules(PersonalGoalItem, styles);

PersonalGoalItem = withRouter(PersonalGoalItem);

PersonalGoalItem.fragments = {
  activities: gql`
    fragment PersonalGoalItem_activities on ActivityEdge {
      node {
        disciplineId
        disciplineName
        distance
        score
      }
    }
  `,
  goal: gql`
    fragment PersonalGoalItem_goal on PersonalGoal {
      disciplineId
      discipline {
        name
        unit
      }
      count
      dist
      score
    }
  `,
  user: gql`
    fragment PersonalGoalItem_user on User {
      username
    }
  `
};

export default PersonalGoalItem;
