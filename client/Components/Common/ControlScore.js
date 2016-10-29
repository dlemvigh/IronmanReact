import React from "react";
import { ControlLabel, Form, FormGroup, FormControl, InputGroup } from "react-bootstrap"

export default class ControlScore extends React.Component {
    static propTypes = {
        value: React.PropTypes.number,
        onChange: React.PropTypes.func,
        readonly: React.PropTypes.bool
    }

    onChange = (event) => {
        const score = event.target.value;
        if (this.props.onChange) {
            this.props.onChange(distance);
        }
    }

    round(){
        return Math.round(this.props.value * 100) / 100;
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