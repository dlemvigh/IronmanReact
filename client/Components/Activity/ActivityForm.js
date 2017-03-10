import React from "react";
import Relay from "react-relay";
import { Button, Col, Row } from "react-bootstrap";
import CSSModules from "react-css-modules";
import moment from "moment";
import toastr from "toastr";

import styles from "./ActivityForm.scss";
import ControlDate from "../Common/ControlDate";
import ControlDiscipline from "../Common/ControlDiscipline";
import ControlDistance from "../Common/ControlDistance";
import ControlScore from "../Common/ControlScore";
import AddActivityMutation from "../../Mutations/AddActivityMutation";
import EditActivityMutation from "../../Mutations/EditActivityMutation";

class ActivityForm extends React.Component {

  constructor(props) {
    super(props);
    if (props.activity) {
      this.state = this.onReceiveActivity(props.activity);
    }
  }

  state = {
    disciplineId: "" || this.props.store.disciplines[0]._id,
    disciplineName: "" || this.props.store.disciplines[0].name,
    distance: "",
    unit: "km",
    score: "" || 5,
    date: moment.utc().startOf("date").format("D/M-YYYY"),
    ensureValidation: false
  }

  componentWillReceiveProps(newProps) {
    if (newProps.activity != null) {
      const newState = this.onReceiveActivity(newProps.activity);
      this.setState(newState);
    }
  }

  onReceiveActivity(activity){
    return {
      disciplineId: activity.disciplineId,
      disciplineName: activity.disciplineName,
      distance: activity.distance,
      unit: activity.unit,
      score: activity.score / activity.distance,
      date: moment.utc(activity.date).format("D/M-YYYY"),
    };    
  }

  isEditing() {
    return this.props.activity != null;
  }

  clearState() {
    this.setState({
      distance: "" || "",
      date: moment.utc().startOf("date").format("D/M-YYYY"),
      ensureValidation: false
    });
  }

  getUserIds() {
    return this.props.store.users.map(user => user.id);
  }

  handleChangeDiscipline = (discipline) => {
    this.setState({
      disciplineId: discipline.id,
      disciplineName: discipline.name,
      unit: discipline.unit,
      score: discipline.score
    });
  }

  handleChangeDistance = (distance) => {        
    this.setState({ distance });        
  }

  handleChangeDate = (date) => {
    this.setState({ date });
  }

  isValid = () => {
    return this.refs.discipline.refs.component.isValid() &&
            this.refs.distance.isValid() &&
            this.refs.date.isValid();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isValid()) {
      const activity = this.getActivity();
      if (this.isEditing()) {
        Relay.Store.commitUpdate(
          new EditActivityMutation({
            _id: this.props.activity._id,
            id: this.props.activity.id,                        
            ...activity
          }), {
            onFailure: (resp) => { console.error("fail", resp); toastr.error("Update activity failed"); },
            onSuccess: (resp) => { toastr.success("Activity updated"); }
          }
        );
        this.props.onEditDone();
      } else {
        Relay.Store.commitUpdate(
          new AddActivityMutation({
            ...activity,
          }), {
            onFailure: (resp) => { console.error("fail", resp); toastr.error("Add activity failed"); },
            onSuccess: (resp) => { toastr.success("Activity added"); }
          }
        );
        this.clearState();
      }
    } else {
      this.setState({
        ensureValidation: true
      });
    }
  }

  getActivity() {
    const activity = {
      medals: this.getMedals(),
      store: this.props.store.id,
      userId: this.props.user._id,
      nodeId: this.props.user.id,
      userIds: this.getUserIds(),
      disciplineId: this.state.disciplineId,
      distance: parseFloat(this.state.distance),
      unit: this.state.unit,
      score: this.state.score * this.state.distance,
      date: moment.utc(this.state.date, "D/M-YYYY").toISOString()
    };
    return activity;
  }

  getMedals() {
    return this.props.store.users.map(user => user.medals.id);
  }

  onCancelEdit = () => {
    this.props.onEditDone();
  }

  render() {
    if (!this.props.show) { return null; }
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <Row>
          <Col sm={3}>
            <ControlDiscipline 
              ref="discipline" 
              value={this.state.disciplineId} 
              onChange={this.handleChangeDiscipline} 
              store={this.props.store} 
              ensureValidation={this.state.ensureValidation}
            />
          </Col>
          <Col sm={3} xs={8} >
            <ControlDistance 
              ref="distance" 
              value={this.state.distance} 
              unit={this.state.unit} 
              onChange={this.handleChangeDistance} 
              ensureValidation={this.state.ensureValidation}
            />  
          </Col>
          <Col sm={2} xs={4}>
            <ControlScore value={this.state.score * this.state.distance} readonly />
          </Col>
          <Col sm={3} xs={8}>
            <ControlDate 
              ref="date" 
              value={this.state.date} 
              onChange={this.handleChangeDate} 
              ensureValidation={this.state.ensureValidation}
            />
          </Col>
          <Col sm={1} xs={4}>
            <Button 
              type="submit" 
              bsStyle="primary" 
              styleName="form-noncontrol-offset"
            >{this.isEditing() ? "Update" : "Log"}</Button>
          </Col>
        </Row>
        {this.isEditing() && <a href="javascript: void 0" onClick={this.onCancelEdit}>cancel</a>}
      </form>
    );
  }
}

ActivityForm = CSSModules(ActivityForm, styles);

ActivityForm = Relay.createContainer(ActivityForm, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id
        users {
          medals {
            id
          }
        }
        disciplines {
          _id
          name
        }
        ${ControlDiscipline.getFragment("store")}
      }
    `,
    user: () => Relay.QL`
      fragment on User {
        _id
        id
      }
    `
  }
});

export default ActivityForm;
