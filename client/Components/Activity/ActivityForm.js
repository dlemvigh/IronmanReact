import React from "react";
import gql from "graphql-tag";
import { Button, Col, Row } from "react-bootstrap";
import CSSModules from "react-css-modules";
import moment from "moment";

import styles from "./ActivityForm.modules.scss";
import ControlDate from "../Common/ControlDate";
import ControlDiscipline from "../Common/ControlDiscipline";
import ControlDistance from "../Common/ControlDistance";
import ControlScore from "../Common/ControlScore";
import { withAddActivityMutation } from "../../Mutations/AddActivityMutation";
import { withEditActivityMutation } from "../../Mutations/EditActivityMutation";

function mapPropsToState({ activity }) {
  return {
    activity,
    disciplineId: activity.disciplineId,
    disciplineName: activity.disciplineName,
    distance: activity.distance,
    unit: activity.unit,
    score: activity.score / activity.distance,
    date: moment.utc(activity.date).format("D/M-YYYY")
  };
}

class ActivityForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.activity) {
      this.state = mapPropsToState(props);
    }

    this.ref = {
      distance: React.createRef(),
      discipline: React.createRef(),
      date: React.createRef()
    };

    this.state = {
      disciplineId: "" || this.props.store.disciplines[0]._id,
      disciplineName: "" || this.props.store.disciplines[0].name,
      distance: "",
      unit: "km",
      score: "" || 5,
      date: moment
        .utc()
        .startOf("date")
        .format("D/M-YYYY"),
      ensureValidation: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activity != null && props.activity !== state.activity) {
      const newState = mapPropsToState(props);
      return newState;
    }

    return state;
  }

  isEditing() {
    return this.props.activity != null;
  }

  clearState() {
    this.setState({
      distance: "" || "",
      date: moment
        .utc()
        .startOf("date")
        .format("D/M-YYYY"),
      ensureValidation: false
    });
  }

  getUserIds() {
    return this.props.store.users.map(user => user.id);
  }

  handleChangeDiscipline = discipline => {
    this.setState({
      disciplineId: discipline.id || discipline._id,
      disciplineName: discipline.name,
      unit: discipline.unit,
      score: discipline.score
    });
  };

  handleChangeDistance = distance => {
    this.setState({ distance });
  };

  handleChangeDate = date => {
    this.setState({ date });
  };

  isValid = () => {
    return (
      this.ref.distance.current.isValid() && this.ref.date.current.isValid()
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      const activity = this.getActivity();
      if (this.isEditing()) {
        this.props.editActivity({
          variables: {
            input: {
              id: this.props.activity._id,
              ...activity
            }
          }
        });
        this.props.onEditDone();
      } else {
        this.props.addActivity({
          variables: {
            input: activity
          }
        });
        this.clearState();
      }
    } else {
      this.setState({
        ensureValidation: true
      });
    }
  };

  getActivity() {
    const activity = {
      // medals: this.getMedals(),
      // store: this.props.store.id,
      userId: this.props.user._id,
      // nodeId: this.props.user.id,
      // userIds: this.getUserIds(),
      disciplineId: this.state.disciplineId,
      distance: parseFloat(this.state.distance),
      // unit: this.state.unit,
      // score: this.state.score * this.state.distance,
      date: moment.utc(this.state.date, "D/M-YYYY").toISOString()
    };
    return activity;
  }

  getMedals() {
    return this.props.store.users.map(user => user.medals.id);
  }

  onCancelEdit = () => {
    this.props.onEditDone();
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <Row>
          <Col sm={3}>
            <ControlDiscipline
              ref={this.ref.discipline}
              value={this.state.disciplineId}
              onChange={this.handleChangeDiscipline}
              store={this.props.store}
              ensureValidation={this.state.ensureValidation}
            />
          </Col>
          <Col sm={3} xs={8}>
            <ControlDistance
              ref={this.ref.distance}
              value={this.state.distance}
              unit={this.state.unit}
              onChange={this.handleChangeDistance}
              ensureValidation={this.state.ensureValidation}
            />
          </Col>
          <Col sm={2} xs={4}>
            <ControlScore
              value={this.state.score * this.state.distance}
              readonly
            />
          </Col>
          <Col sm={3} xs={8}>
            <ControlDate
              ref={this.ref.date}
              value={this.state.date}
              onChange={this.handleChangeDate}
              ensureValidation={this.state.ensureValidation}
            />
          </Col>
          <Col sm={1} xs={4}>
            <Button
              type="submit"
              variant="primary"
              styleName="form-noncontrol-offset"
            >
              {this.isEditing() ? "Update" : "Log"}
            </Button>
          </Col>
        </Row>
        {this.isEditing() && (
          <a href="javascript: void 0" onClick={this.onCancelEdit}>
            cancel
          </a>
        )}
      </form>
    );
  }
}

ActivityForm = CSSModules(ActivityForm, styles);
ActivityForm = withAddActivityMutation(ActivityForm);
ActivityForm = withEditActivityMutation(ActivityForm);

// ${/*ControlDiscipline.getFragment("store")*/}

// const ActivityFormContainer = (props) => (
//   <AddActivityMutation>
//     {({ addActivity }) => (
//       <ActivityForm {...props} addActivity={addActivity}>
//         {props.children}
//       </ActivityForm>
//     )}
//   </AddActivityMutation>

// )

ActivityForm.fragments = {
  store: gql`
    fragment ActivityForm_store on Store {
      ...ControlDiscipline_store
      users {
        id
        medals {
          id
        }
      }
      disciplines {
        id
        _id
        name
      }
    }
    ${ControlDiscipline.fragments.store}
  `,
  user: gql`
    fragment ActivityForm_user on User {
      _id
      id
    }
  `
};

export default ActivityForm;
