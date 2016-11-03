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
const disciplines = [
    { id: "1", name: "run", unit: "km", score: 5}, 
    { id: "2", name: "bike", unit: "km", score: 1}, 
    { id: "3", name: "swim", unit: "km", score: 25},
    { id: "4", name: "caloric", unit: "cal", score: 0.06},
    { id: "5", name: "misc", unit: "hours", score: 25}
];

class ActivityForm extends React.Component {

    state = {
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
        const item = _.find(disciplines, { id: discipline });
        if (item) {
            this.setState({
                discipline: item.name,
                unit: item.unit,
                score: item.score
            });
        }
    }

    handleChangeDistance = (distance) => {
        this.setState({ distance });        
    }

    handleChangeDate = (date) => {
        this.setState({ date });
    }

    isValid = () => {
        return this.refs.discipline.isValid() &&
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
                    store: this.props.store
                }), {
                    onFailure: (resp) => console.log("fail", resp),
                    onSuccess: (resp) => console.log("success", resp)
                }
            )
            this.clearState();
        }
    }

    getActivity() {
        const item = _.find(disciplines, { name: this.state.discipline }) || {};

        const activity = {
            userId: this.props.user.id,
            discipline: item.name,
            distance: parseFloat(this.state.distance),
            unit: item.unit,
            score: item.score * this.state.distance,
            date: this.state.date
        }

        return activity;
    }

    render() {
        const act = this.getActivity();
        return (
            <form onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm={3}>
                        <ControlDiscipline ref="discipline" value={this.state.discipline} onChange={this.handleChangeDiscipline} disciplines={disciplines} />
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
        user: () => Relay.QL`
            fragment on User {
                id
            }
        `,
        // disciplines: () => Relay.QL`
        //     fragment on Discipline {
        //         ${ControlDiscipline.getFragment('disciplines')}
        //     }
        // `
    }
})

export default ActivityForm
