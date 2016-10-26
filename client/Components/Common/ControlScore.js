import React from "react";
import { ControlLabel, Form, FormGroup, FormControl, InputGroup } from "react-bootstrap"

export default class ControlDistance extends React.Component {
    static propTypes = {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        readonly: React.PropTypes.bool
    }

    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const score = event.target.value;
        if (this.props.onChange) {
            this.props.onChange(distance);
        }
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel>Score</ControlLabel>
                <FormControl
                type="text"
                value={this.props.value}
                disabled={this.props.readonly}
                onChange={this.onChange} />
        </FormGroup>
        );
    }
}