import React from "react";
import Relay from 'react-relay/classic';
import PropTypes from "prop-types";
import CSSModules from "react-css-modules";

import styles from "./PersonalGoalsItem.scss";

class PersonalGoalItem extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }

  renderDiscipline() {
    return <strong>{this.props.goal.discipline ? this.props.goal.discipline.name : "exercise"}</strong>;
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

    return <strong>{number} {unit}</strong>;
  }

  calcProgress() {
    let progress, total;
    const goal = this.props.goal;
    const activities = goal.disciplineId ? 
      this.props.activities.filter(edge => edge.node.disciplineId == goal.disciplineId) : 
      this.props.activities;

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
    this.context.router.push(`/${this.props.user.username}/goals`);
  }

  render() {
    const [progres, total] = this.calcProgress();
    const width = 100 * progres / total;
    return (
      <tr styleName="row" onClick={this.onClick}>
        <td>
          I want to {this.renderDiscipline()} at least {this.renderAmount()} per week.
          <div className="progress" styleName="progress">
            <div className="progress-bar" styleName="progress-bar" style={{width: width + "%"}} />
          </div>
        </td>
      </tr>
    );
  }
}

PersonalGoalItem = CSSModules(PersonalGoalItem, styles);

PersonalGoalItem = Relay.createContainer(PersonalGoalItem, {
  fragments: {
    activities: () => Relay.QL`
      fragment on ActivityEdge @relay(plural: true) {
        node {
          disciplineId
          disciplineName
          distance
          score
        }
      }
    `,
    goal: () => Relay.QL`
      fragment on PersonalGoal {
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
    user: () => Relay.QL`
      fragment on User {
        username
      }
    `
  }
});

export default PersonalGoalItem;