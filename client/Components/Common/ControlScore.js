import React from "react";
import { ControlLabel, Form, FormGroup, FormControl, InputGroup } from "react-bootstrap"

export default class ControlScore extends React.Component {

    onChange = (event) => {
        const score = event.target.value;
        if (this.props.onChange) {
            this.props.onChange(distance);
        }
    }

    round(){
        return Math.round(this.props.value * 100) / 100 || 0;
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel>Score</ControlLabel>
                <FormControl
                type="text"
                value={this.round()}
                disabled={this.props.readonly}
                onChange={this.onChange} />
        </FormGroup>
        );
    }
}