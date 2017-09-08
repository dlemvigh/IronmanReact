import React from "react";
import Relay from "react-relay";
import CSSModules from "react-css-modules";

import styles from "./PersonalGoalsItem.scss";

class PersonalGoalItem extends React.Component {
  renderDiscipline() {
    return <strong>{this.props.goal.disciplineName || "exercise"}</strong>;
  }

  renderAmount() {
    let number, unit;

    if (this.props.goal.count) {
      number = this.props.goal.count;
      unit = this.props.goal.count != 1 ? "times" : "time";
    }

    if (this.props.goal.dist) {
      number = this.props.goal.dist;
      unit = "todo";
    }

    if (this.props.goal.score) {
      number = this.props.goal.score;
      unit = this.props.goal.score != 1 ? "points" : "point";
    }

    return <strong>{number} {unit}</strong>;
  }

  render() {
    return (
      <tr>
        <td>
          I want to {this.renderDiscipline()} at least {this.renderAmount()} per week.
          <div className="progress" styleName="progress">
            <div className="progress-bar" styleName="progress-bar" style={{width: 100 * Math.random() + "%"}} />
          </div>
        </td>
      </tr>
    );
  }
}

PersonalGoalItem = CSSModules(PersonalGoalItem, styles);

PersonalGoalItem = Relay.createContainer(PersonalGoalItem, {
  fragments: {
    goal: () => Relay.QL`
      fragment on PersonalGoal {
        disciplineName
        count
        dist
        score
      }
    `
  }
})

export default PersonalGoalItem;