import React from "react";
import Relay from "react-relay";
import { Button, Row, Col } from "react-bootstrap";
import toastr from "toastr";
import PersonalGoalsFormItem from "./PersonalGoalsFormItem";
import SetPersonalGoalsMutations from "../../Mutations/SetPersonalGoalsMutations";

class PersonalGoalsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: props.user.personalGoals.length > 0 ? 
        props.user.personalGoals.map(this.fromGoal) :
        [ this.defaultGoal() ]
    };
  }

  fromGoal(goal) {
    let type, value;
    if (goal.count) {
      type = "count";
      value = goal.count;
    } else if (goal.dist) {
      type = "dist";
      value = goal.dist;
    } else if (goal.score) {
      type = "score";
      value = goal.score;
    }

    return {
      disc: goal.disciplineId,
      type,
      value
    };
  }

  toGoal(goal) {
    return {
      disciplineId: goal.disc,      
      [goal.type]: goal.value
    };
  }

  defaultGoal() {
    return {
      disc: null,
      type: "count",
      value: 1
    }
  }

  updateGoal = (goal, index) => {
    const goals = [...this.state.goals];
    goals[index] = goal;
    this.setState({ goals });
  }
  
  swapGoals = (oldIndex, newIndex) => {
    const goals = [...this.state.goals];
    [goals[oldIndex], goals[newIndex]] = [goals[newIndex], goals[oldIndex]];
    this.setState({ goals });
  }

  removeGoal = (index) => {
    const goals = this.state.goals.filter((goal, idx) => idx != index);
    this.setState({ goals });
  }

  addGoal = () => {
    const goals = [
      ...this.state.goals,
      this.defaultGoal()
    ];
    this.setState({ goals });
  }

  isValid = () => {
    return true;
  }

  save = (event) => {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
    const goals = this.state.goals.map(this.toGoal);

    Relay.Store.commitUpdate(
      new SetPersonalGoalsMutations({
        user: this.props.user,
        goals
      }), {
        onFailure: (resp) => { console.error("fail", resp); toastr.error("Update activity failed"); },
        onSuccess: () => { toastr.success("Personal Goals updated"); }
  }
    );
  }

  render() {
    return (
      <div>
        <h3>Personal Goals</h3>
        {
          this.state.goals.map((goal, index) => (
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
          ))
        }
        <Row>
          <Col xs={12}>
            <Button bsStyle="primary" onClick={this.save}>Save</Button>
            <Button bsStyle="link" onClick={this.addGoal}>Add goal</Button>
          </Col>
        </Row>
      </div>
    );
  }
}

PersonalGoalsForm = Relay.createContainer(PersonalGoalsForm, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        ${PersonalGoalsFormItem.getFragment("store")}
      }
    `,
    user: () =>Relay.QL`
      fragment on User {
        id
        _id
        personalGoals {
          _id          
          disciplineId
          disciplineName
          dist
          count
          score      
        }
      }
    `,
  }
});

export default PersonalGoalsForm;
