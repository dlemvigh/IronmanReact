import React from "react";
import gql from "graphql-tag";
import { Button, Row, Col } from "react-bootstrap";
import PersonalGoals from "./PersonalGoals";
import PersonalGoalsFormItem from "./PersonalGoalsFormItem";
import { withSetPersonalGoals } from "../../Mutations/SetPersonalGoalsMutations";

class PersonalGoalsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals:
        props.user.personalGoals.length > 0
          ? props.user.personalGoals.map(this.fromGoal)
          : [this.defaultGoal()]
    };
  }

  fromGoal(goal) {
    let type, value;
    if (goal.count) {
      type = "count";
      value = Number(goal.count);
    } else if (goal.dist) {
      type = "dist";
      value = Number(goal.dist);
    } else if (goal.score) {
      type = "score";
      value = Number(goal.score);
    }

    return {
      disc: goal.disciplineId,
      type,
      value
    };
  }

  toGoal(goal) {
    return {
      disciplineId: goal.disc || undefined,
      [goal.type]: Number(goal.value)
    };
  }

  defaultGoal() {
    return {
      disc: null,
      type: "count",
      value: 1
    };
  }

  updateGoal = (goal, index) => {
    const goals = [...this.state.goals];
    goals[index] = goal;
    this.setState({ goals });
  };

  swapGoals = (oldIndex, newIndex) => {
    const goals = [...this.state.goals];
    [goals[oldIndex], goals[newIndex]] = [goals[newIndex], goals[oldIndex]];
    this.setState({ goals });
  };

  removeGoal = index => {
    const goals = this.state.goals.filter((goal, idx) => idx != index);
    this.setState({ goals });
  };

  addGoal = () => {
    const goals = [...this.state.goals, this.defaultGoal()];
    this.setState({ goals });
  };

  isValid = () => {
    return true;
  };

  save = event => {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    const goals = this.state.goals.map(this.toGoal);
    this.props.setPersonalGoals({
      variables: {
        input: {
          userId: this.props.user._id,
          goals
        }
      }
    });

  };

  render() {
    return (
      <div>
        <h3>Personal Goals</h3>
        {this.state.goals.map((goal, index) => (
          <PersonalGoalsFormItem
            key={index}
            index={index}
            goal={goal}
            numGoals={this.state.goals.length}
            update={this.updateGoal}
            swap={this.swapGoals}
            remove={this.removeGoal}
            store={this.props.store}
            save={this.save}
          />
        ))}
        <Row>
          <Col xs={12}>
            <Button variant="primary" onClick={this.save}>
              Save
            </Button>
            <Button variant="link" onClick={this.addGoal}>
              Add goal
            </Button>
          </Col>
        </Row>
        <PersonalGoals user={this.props.user} />
      </div>
    );
  }
}

PersonalGoalsForm = withSetPersonalGoals(PersonalGoalsForm);

PersonalGoalsForm.fragments = {
  store: gql`
    fragment PersonalGoalsForm_store on Store {
      ...PersonalGoalsFormItem_store
    }
    ${PersonalGoalsFormItem.fragments.store}
  `,
  user: gql`
    fragment PersonalGoalsForm_user on User {
      ...PersonalGoals_user
      id
      _id
      personalGoals {
        id
        _id
        disciplineId
        disciplineName
        dist
        count
        score      
      }
    }
    ${PersonalGoals.fragments.user}
  `
};

export default PersonalGoalsForm;
