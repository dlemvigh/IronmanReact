import React from 'react'
import { Button, Col, Form, Row } from "react-bootstrap"
import _ from "lodash"
import Moment from "moment"

import ControlDate from "../Common/ControlDate";
import ControlDiscipline from "../Common/ControlDiscipline";
import ControlDistance from "../Common/ControlDistance";

const disciplines = [
    { id: "1", name: "run", unit: "km", score: 5}, 
    { id: "2", name: "bike", unit: "km", score: 1}, 
    { id: "3", name: "swim", unit: "km", score: 25},
    { id: "4", name: "caloric", unit: "cal", score: 0.06},
    { id: "5", name: "misc", unit: "hours", score: 25}
]

export default class ActivityForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleChangeDiscipline = this.handleChangeDiscipline.bind(this); 
        this.handleChangeDistance = this.handleChangeDistance.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
    }

    state = {
        discipline: "",
        distance: "",
        unit: 'km',
        date: Moment().startOf("date")
    }

    clearState() {
        this.setState({
            distance: "",
            date: Moment().startOf("date")
        });
    }

    handleChangeDiscipline(discipline) {
        const item = _.find(disciplines, { id: discipline });
        if (item) {
            this.setState({
                discipline: item.name,
                unit: item.unit
            });
        }
    }

    handleChangeDistance(distance) {
        this.setState({ distance });        
    }

    handleChangeDate(date) {
        this.setState({ date });
    }

    isValid() {
        return this.refs.discipline.isValid() &&
            this.refs.distance.isValid() &&
            this.refs.date.isValid();
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.isValid()) {
            const activity = this.getActivity();
            this.props.commitActivity(activity);
            this.clearState();
        }
    }

    getActivity() {
        const item = _.find(disciplines, { name: this.state.discipline }) || {};

        const activity = {
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
                    <Col sm={4}>
                        <ControlDiscipline ref="discipline" value={this.state.discipline} onChange={this.handleChangeDiscipline} disciplines={disciplines} />
                    </Col>
                    <Col sm={4}>
                        <ControlDistance ref="distance" value={this.state.distance} unit={this.state.unit} onChange={this.handleChangeDistance} />
                    </Col>
                    <Col sm={4}>
                        <ControlDate ref="date" value={this.state.date} onChange={this.handleChangeDate} />
                    </Col>
                </Row>
                <Button type="submit" bsStyle="primary">Log</Button>
            </form>
        );
    }
}   