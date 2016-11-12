import React from 'react'
import Relay from 'react-relay'
import { Button, Col, ControlLabel, Form, FormGroup, Row } from "react-bootstrap"
import CSSModules from "react-css-modules";
import Moment from "moment"
import _ from "lodash";

import styles from "./ActivityForm.scss";
import ControlDate from "../Common/ControlDate";
import ControlDiscipline from "../Common/ControlDiscipline";
import ControlDistance from "../Common/ControlDistance";
import ControlScore from "../Common/ControlScore";
import AddActivityMutation from "../../Mutations/AddActivityMutation"

class ActivityForm extends React.Component {

    state = {
        disciplineId: "",
        discipline: "",
        distance: "",
        unit: 'km',
        score: "",
        date: Moment().startOf("date")
    }

    clearState() {
        this.setState({
            distance: "",
            date: Moment().startOf("date")
        });
    }

    handleChangeDiscipline = (discipline) => {
        this.setState({
            disciplineId: discipline.id,
            discipline: discipline.name,
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

            Relay.Store.commitUpdate(
                new AddActivityMutation({
                    ...activity,
                }), {
                    onFailure: (resp) => console.log("fail", resp),
                    onSuccess: (resp) => console.log("success", resp)
                }
            )
            this.clearState();
        }
    }

    getActivity() {

        const activity = {
            userId: this.props.user._id,
            nodeId: this.props.user.id,
            disciplineId: this.state.disciplineId,
            distance: parseFloat(this.state.distance),
            unit: this.state.unit,
            score: this.state.score * this.state.distance,
            date: this.state.date.toISOString()
        }
        return activity;
    }

    render() {
        const act = this.getActivity();
        return (
            <form onSubmit={this.handleSubmit} noValidate>
                <Row>
                    <Col sm={3}>
                        <ControlDiscipline ref="discipline" value={this.state.disciplineId} onChange={this.handleChangeDiscipline} store={this.props.store} />
                    </Col>
                    <Col sm={3} xs={8} >
                        <ControlDistance ref="distance" value={this.state.distance} unit={this.state.unit} onChange={this.handleChangeDistance} />
                    </Col>
                    <Col sm={2} xs={4}>
                        <ControlScore value={this.state.score * this.state.distance} readonly />
                    </Col>
                    <Col sm={3} xs={8}>
                        <ControlDate ref="date" value={this.state.date} onChange={this.handleChangeDate} />
                    </Col>
                    <Col sm={1} xs={4}>
                        <Button type="submit" bsStyle="primary" styleName="form-noncontrol-offset">Log</Button>
                    </Col>
                </Row>
            </form>
        );
    }
}

ActivityForm = CSSModules(ActivityForm, styles)

ActivityForm = Relay.createContainer(ActivityForm, {
    fragments: {
        store: () => Relay.QL`
            fragment on Store {
                id
                ${ControlDiscipline.getFragment('store')}
            }
        `,
        user: () => Relay.QL`
            fragment on User {
                _id
                id
            }
        `
    }
})

export default ActivityForm
